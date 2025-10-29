import prisma from '../../lib/prisma'; // Убедитесь, что путь к вашему prisma клиенту верный
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Используем Image компонент Next.js для оптимизации

// Эта функция будет загружать данные для конкретного поста
async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  // Если пост с таким id не найден, покажем страницу 404
  if (!post) {
    notFound();
  }

  return post;
}

// Params — это объект, содержащий динамические сегменты маршрута.
// В нашем случае это { id: '...' }
export default async function PostPage({ params }: { params: { id: string } }) {
  // Вызываем функцию для получения данных поста
	const { id } = await params;
  const post = await getPost(id);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        {/* 1. Отображаем картинку, если она есть */}
        {post.imageUrl && (
          <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={`Обложка для поста "${post.title}"`}
              fill // Растягивает изображение на весь контейнер
              style={{ objectFit: 'cover' }} // Сохраняет пропорции и обрезает лишнее
              priority // Говорит Next.js загрузить это изображение в первую очередь
            />
          </div>
        )}

        {/* 2. Заголовок и дата создания */}
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          Опубликовано: {new Date(post.createdAt).toLocaleDateString('ru-RU')}
        </p>

        {/* 3. Содержание поста */}
        {post.content && (
          <div className="prose lg:prose-xl dark:prose-invert">
            {/* Если вы используете Markdown, здесь можно подключить парсер */}
            <p>{post.content}</p>
          </div>
        )}
      </article>
    </main>
  );
}