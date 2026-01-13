import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/sever";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import prisma from "../../lib/prisma";

const ADMIN_EMAIL = "nemezg@gmail.com";

// Инициализируем Supabase клиент
const supabaseAdmin = createSupabaseAdmin(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // 1. Инициализируем клиент и получаем пользователя
    const supabase = await createClient(); // <-- await, так как функция async
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 2. Проверяем, авторизован ли пользователь
    if (authError || !user) {
      return NextResponse.json(
        { error: "Вы не авторизованы" },
        { status: 401 }
      );
    }

    // 3. 👮‍♂️ ПРОВЕРКА НА АДМИНА
    // Если email пользователя не совпадает с email админа — до свидания
    if (user.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "У вас нет прав администратора" },
        { status: 403 }
      );
    }

    // --- Дальше ваш старый код загрузки ---
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | undefined = undefined;

    if (imageFile && imageFile.size > 0) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      // Используем supabaseAdmin для загрузки, чтобы точно не было проблем с правами
      const { data, error: uploadError } = await supabaseAdmin.storage
        .from("posts")
        .upload(fileName, imageFile);

      if (uploadError) throw new Error(uploadError.message);

      const { data: urlData } = supabaseAdmin.storage
        .from("posts")
        .getPublicUrl(data.path);
      imageUrl = urlData.publicUrl;
    }

    const newPost = await prisma.post.create({
      data: { title, content, imageUrl, authorId: user.id, published: true },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ошибка сервера";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const POSTS_PER_PAGE = 3;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || "1");
  const skip = (page - 1) * POSTS_PER_PAGE;

  try {
    const [posts, totalPosts] = await prisma.$transaction([
      prisma.post.findMany({
        take: POSTS_PER_PAGE,
        skip: skip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count(),
    ]);
    const hasMore = skip + posts.length < totalPosts;
    return NextResponse.json({ posts, hasMore });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Произошла неизвестная ошибка";
    return NextResponse.json(
      { error: `Ошибка загрузки постов: ${errorMessage}` },
      { status: 500 }
    );
  }
}
