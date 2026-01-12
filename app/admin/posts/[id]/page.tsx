// app/admin/posts/[id]/page.tsx
import { createClient } from "../../../utils/supabase/sever";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma";
import EditPostForm from "../../components/edit-post-form"; // Убедитесь, что путь верный
import Link from "next/link";

const ADMIN_EMAIL = "nemezg@gmail.com";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const postId = await params.id;

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    redirect(
      "/admin?error=" + encodeURIComponent("Пост с таким ID не найден.")
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-unbounded mb-6">
        ✏️ Редактирование поста: &quot;{post.title}&quot;
      </h1>

      <Link
        href="/admin"
        className="text-foreground font-unbounded hover:text-blue-700 mb-6 inline-block"
      >
        ← Назад к админ-панели
      </Link>

      <EditPostForm post={post} />
    </div>
  );
}
