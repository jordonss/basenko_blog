import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import prisma from '../../lib/prisma';

// Инициализируем Supabase клиент
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl: string | undefined = undefined;

    // 1. Если картинка прикреплена, загружаем её в Supabase Storage
    if (imageFile && imageFile.size > 0) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from('posts') // Название вашего bucket
        .upload(fileName, imageFile);

      if (error) {
        throw new Error(`Ошибка загрузки картинки: ${error.message}`);
      }

      // 2. Получаем публичный URL загруженного файла
      const { data: urlData } = supabase.storage
        .from('posts')
        .getPublicUrl(data.path);

      imageUrl = urlData.publicUrl;
    }

    // 3. Создаем запись в базе данных с помощью Prisma
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl: imageUrl, // Сохраняем URL картинки (или null)
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}