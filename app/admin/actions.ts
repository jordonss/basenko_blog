"use server";

import { createClient } from "../utils/supabase/sever";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

const ADMIN_EMAIL = "nemezg@gmail.com";

export async function deletePost(postId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/?message=" + encodeURIComponent("Доступ запрещен"));
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Ошибка удаления поста:", error);
    redirect("/admin?error=" + encodeURIComponent("Ошибка удаления"));
  }
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/?message=" + encodeURIComponent("Доступ запрещен"));
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const published = formData.get("published") === "on";

  if (!title || !content) {
    redirect(
      `/admin/posts/${postId}?error=${encodeURIComponent(
        "Заголовок и контент обязательны"
      )}`
    );
  }

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        title: title,
        content: content,
        imageUrl: imageUrl,
        published: published,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath(`/posts/${postId}`);

    redirect("/admin?message=" + encodeURIComponent("Пост успешно обновлен!"));
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error(
      `Критическая ошибка при обновлении поста ID ${postId}:`,
      error
    );
    redirect(
      `/admin/posts/${postId}?error=${encodeURIComponent(
        "Ошибка обновления базы данных"
      )}`
    );
  }
}
