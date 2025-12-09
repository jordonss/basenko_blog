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

  return (
    <>
      <header className="flex justify-between w-full bg-foreground p-7 pl-30 items-center">
        <nav className="flex w-full">
          <ul className="flex w-full text-2xl text-[#344532] font-black font-unbounded">
            <li className="mr-5">
              <Link href="/">Домой</Link>
            </li>
            <li className="ml-auto mr-21">
              <Link href="/login">Войти</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex justify-center px-30 py-10 bg-foreground">
        <div className="lg:w-3/4 sm:w-1/2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#344532] font-unbounded pl-4 sm:pl-0 mb-2 text-left">
            БЛОГ
          </h2>
          <div className="border-b-4 border-[#4A5C43] w-1/5 sm:w-1/2 mb-6 lg:mb-10"></div>
          <h1 className="bg-background max-w-[550px] font-unbounded text-[#F5EBEB] text-3xl sm:text-2xl lg:text-3xl font-bold p-4 sm:p-6 lg:p-8 mt-4 sm:mt-6 lg:mt-10">
            {post.title}
          </h1>
        </div>
        <div className="w-full mx-auto">
          {post.imageUrl && (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={`Обложка для поста "${post.title}"`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
								quality={95}
                priority
              />
            </div>
          )}
        </div>
      </main>
      {post.content && (
        <div className="w-full mx-auto px-100 py-10 bg-background flex flex-col min-h-[200px] prose lg:prose-xl dark:prose-invert max-w-none">
          <p className="font-unbounded text-[#F5EBEB] text-justify flex-grow mb-6">
            {post.content}
          </p>
          <div className="w-full text-right mt-auto">
            <span className="inline-block bg-background text-[#F5EBEB] font-unbounded text-sm sm:text-base">
              Опубликовано:{" "}
              {new Date(post.createdAt).toLocaleDateString("ru-RU")}
            </span>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
