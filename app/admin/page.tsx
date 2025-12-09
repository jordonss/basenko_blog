// app/admin/page.tsx
import { createClient } from "../utils/supabase/sever";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import DeleteButton from "./components/delete-button";
import Link from "next/link";

const ADMIN_EMAIL = "nemezg@gmail.com";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. ПРОВЕРКА АВТОРИЗАЦИИ
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/"); // Перенаправляем не-админов на главную
  }

  // 2. ПОЛУЧЕНИЕ ДАННЫХ
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-unbounded font-bold mb-6">Кабинет Администратора</h1>
      <Link
        href="/"
        className="bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background font-unbounded py-2 px-4 rounded"
      >
        Главная
      </Link>
      <p className="text-lg mb-6 mt-6 font-unbounded">Добро пожаловать, {user.email}!</p>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 sm:p-6 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-xl text-background font-unbounded font-semibold hover:text-blue-600 transition"
                >
                  {post.title}
                </Link>
                <span className="text-sm text-background">
                  {new Date(post.createdAt).toLocaleDateString()}
                  {post.published ? " (ОПУБЛИКОВАНО)" : " (ЧЕРНОВИК)"}
                </span>
              </div>

              {/* Кнопка удаления */}
              <DeleteButton postId={post.id} />
            </li>
          ))}
        </ul>
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Постов пока нет.</p>
      )}
    </div>
  );
}
