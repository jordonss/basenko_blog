import prisma from "../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      <main className="flex justify-center px-30 bg-foreground">
        <h1 className="bg-background max-w-3xl text-4xl font-bold mb-5 p-10 font-unbounded text-[#F5EBEB]">
          {post.title}
        </h1>
        <div className="w-full mx-auto">
          {post.imageUrl && (
            <div className="relative h-100 overflow-hidden text-right">
              <Image
                src={post.imageUrl}
                alt={`Обложка для поста "${post.title}"`}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
        </div>
      </main>
      {post.content && (
        <div className="prose lg:prose-xl dark:prose-invert bg-background mt-5">
          <p className="font-unbounded">{post.content}</p>
          <p className="w-50 text-right bg-background text-[#F5EBEB] font-unbounded mb-5">
            Опубликовано: {new Date(post.createdAt).toLocaleDateString("ru-RU")}
          </p>
        </div>
      )}
    </>
  );
}
