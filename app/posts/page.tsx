import prisma from '../lib/prisma';
import PostList from '../../components/post-list';
import { POSTS_PER_PAGE } from '../api/posts/route';

async function getInitialData() {
  const [posts, totalPosts] = await prisma.$transaction([
    prisma.post.findMany({
      take: POSTS_PER_PAGE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count(),
  ]);
  const hasMore = posts.length < totalPosts;
  return { posts, hasMore };
}

export default async function PostsGridPage() {
  const { posts, hasMore } = await getInitialData();

  return (
    // Добавили max-w и px для симметрии. bg-(--foreground) оставляем как у вас.
    <main className="flex flex-col mx-auto px-4 md:px-12 lg:px-20 py-8 bg-(--foreground)">
      
      {/* Заголовок: убрали pl-20, сделали центрирование на мобилках */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#344532] font-unbounded px-30 mb-2 text-center md:text-left">
        БЛОГ
      </h2>
      
      {/* Линия: заменили w-100 на адаптивную ширину, центрируем на мобилках через mx-auto */}
      <div className="border-b-4 border-[#4A5C43] w-24 sm:w-32 md:w-40 mb-10 px-30 mx-auto md:mx-30"></div>
      
      {/* Список постов теперь будет подстраиваться под контейнер */}
      <PostList initialPosts={posts} initialHasMore={hasMore} />
    </main>
  );
}