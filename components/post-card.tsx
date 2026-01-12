import Link from "next/link";
import Image from "next/image";
import type { Post } from "@prisma/client";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-col shadow-md overflow-hidden w-full md:w-[460px]">
      <h3 className="text-4xl font-black font-unbounded text-[#344532] mb-2 bg-transparent">
        {post.title}
      </h3>
      <p className="text-[#F5EBEB] font-unbounded leading-5 text-base p-3 flex-grow bg-(--background)">
        {post.content?.substring(0, 360) || "Нет описания..."}
        {post.content && post.content.length > 350 ? "..." : ""}
      </p>
      {post.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            width={560}
            height={320}
          />
          <Link
            href={`/posts/${post.id}`}
            className="absolute right-2 bottom-2 bg-[#4A5C43] text-[#F5EBEB] text-2xl font-bold font-unbounded py-2 px-6 hover:bg-opacity-90 transition-colors text-center"
          >
            Читать далее
          </Link>
        </div>
      )}
    </div>
  );
}
