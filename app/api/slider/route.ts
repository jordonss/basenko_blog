import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export default async function GET() {
  try {
    const images = await prisma.sliderImage.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("Ошибка загрузки картинок для слайдера:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
