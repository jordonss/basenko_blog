import prisma from "../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) return null;

  return (
    <>
      {/* Header — единый стиль для всех страниц */}
      <header className="flex justify-between w-full bg-foreground px-6 md:px-12 lg:px-20 xl:px-30 py-7 items-center">
        <nav className="flex w-full max-w-[1600px] mx-auto">
          <ul className="flex items-center w-full text-lg sm:text-xl lg:text-2xl text-[#344532] font-black font-unbounded">
            <li>
              <Link href="/" className="hover:opacity-70 transition-opacity">Домой</Link>
            </li>
            <li className="ml-auto">
              <Link href="/login" className="hover:opacity-70 transition-opacity">Войти</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main: Сетка 2 колонки на десктопе, 1 колонка на мобилках */}
      <main className="px-6 md:px-12 lg:px-20 xl:px-30 py-10 bg-foreground">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Левая колонка: Заголовок БЛОГ и Название поста */}
          <div className="w-full lg:basis-1/2 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#344532] font-unbounded mb-2">
              БЛОГ
            </h2>
            <div className="border-b-4 border-[#4A5C43] w-24 sm:w-32 md:w-40 mb-6 lg:mb-10"></div>
            
            <h1 className="bg-background w-full sm:w-[85%] font-unbounded text-[#F5EBEB] text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold p-5 sm:p-8 lg:p-8 mt-4 leading-tight shadow-xl">
              {post.title}
            </h1>
          </div>

          {/* Правая колонка: Картинка */}
          <div className="w-full lg:basis-3/4 mt-6 lg:mt-0">
            {post.imageUrl && (
              <div className="relative w-full aspect-video lg:aspect-square xl:aspect-video overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={`Обложка для поста "${post.title}"`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                  quality={95}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Контентная часть */}
      {post.content && (
        <article className="w-full px-6 md:px-12 lg:px-20 xl:px-30 py-12 sm:py-20 bg-background flex flex-col min-h-[300px]">
          <div className="max-w-4xl mx-auto w-full">
            <p className="font-unbounded text-[#F5EBEB] text-base sm:text-lg lg:text-xl text-justify leading-relaxed mb-12">
              {post.content}
            </p>
            
            <div className="w-full text-right pt-8 border-t border-[#F5EBEB]/10">
              <span className="inline-block text-[#F5EBEB]/50 font-unbounded text-xs sm:text-sm tracking-wider uppercase">
                Опубликовано:{" "}
                {new Date(post.createdAt).toLocaleDateString("ru-RU")}
              </span>
            </div>
          </div>
        </article>
      )}
      <Footer />
    </>
  );
}
