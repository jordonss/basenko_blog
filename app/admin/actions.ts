"use server";

import { createClient } from "../utils/supabase/sever";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

const ADMIN_EMAIL = "nemezg@gmail.com";

/**
 * Удаляет пост по его ID, только если вызывается администратором.
 */
export async function deletePost(postId: string) {
  // 1. ПРОВЕРКА АВТОРИЗАЦИИ (Безопасность)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    // В случае ошибки прав, выбрасываем ошибку или редиректим
    redirect("/?message=" + encodeURIComponent("Доступ запрещен"));
  }

  // 2. УДАЛЕНИЕ ЧЕРЕЗ PRISMA
  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    // 3. ОБНОВЛЕНИЕ КЭША (Чтобы список обновился сразу)
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Ошибка удаления поста:", error);
    redirect("/admin?error=" + encodeURIComponent("Ошибка удаления"));
  }
}

export async function updatePost(postId: string, formData: FormData) {
  // 1. ПРОВЕРКА АВТОРИЗАЦИИ (Безопасность)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/?message=" + encodeURIComponent("Доступ запрещен"));
  }

  // 2. СБОР ДАННЫХ ИЗ ФОРМЫ
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  // Чекбокс возвращает 'on' при true и null при false.
  const published = formData.get("published") === "on";

  if (!title || !content) {
    redirect(
      `/admin/posts/${postId}?error=${encodeURIComponent(
        "Заголовок и контент обязательны"
      )}`
    );
  }

  // 3. ОБНОВЛЕНИЕ ЧЕРЕЗ PRISMA
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

    // 4. ОБНОВЛЕНИЕ КЭША И РЕДИРЕКТ
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath(`/posts/${postId}`);

    // Редирект обратно на админ-панель после успеха
    redirect("/admin?message=" + encodeURIComponent("Пост успешно обновлен!"));
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      // Если это команда перенаправления, мы ее перебрасываем,
      // чтобы фреймворк выполнил навигацию
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
