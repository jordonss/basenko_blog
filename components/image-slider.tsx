"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { SliderImage as SliderImageProps } from "@prisma/client";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import "swiper/css";

interface ImageSliderProps {
  images: SliderImageProps[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Заголовок: убрали pl-20, добавили симметричные px и центрирование для мобайла */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F5EBEB] font-unbounded mb-1 mt-10 px-6 md:px-12 lg:px-50 text-center md:text-left">
        ГАЛЕРЕЯ
      </h2>
      
      {/* Линия: центрируем на мобилках через mx-auto */}
      <div className="border-b-4 border-[#F5EBEB] w-24 sm:w-32 md:w-80 mb-10 mx-auto md:mx-12 lg:mx-50"></div>

      {/* Контейнер: уменьшили p-20 до p-4 на мобилках, чтобы слайды были крупнее */}
      <div className="relative w-full max-w-[1600px] mx-auto rounded-lg overflow-hidden shadow-lg p-4 sm:p-10 md:p-16 lg:p-20 pt-5 group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10} // Меньше расстояние на мобилках
          // Адаптивное количество слайдов: 1 на мобилках, 2 на десктопе
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
          }}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={{
            nextEl: ".my-next-btn",
            prevEl: ".my-prev-btn",
          }}
          className="mySwiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              {/* aspect-video хорош, но на мобилках можно сделать чуть выше */}
              <div className="relative w-full aspect-video sm:aspect-video bg-gray-200 rounded-md overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.altText || "Слайд"}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Кнопка "Назад" */}
        <button className="cursor-pointer my-prev-btn absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-20 p-1 md:p-2 bg-white/80 rounded-full shadow-lg transition-all hover:bg-white active:scale-90">
          {/* Размер иконки: h-8 на мобильных, h-12 на планшетах, h-16/20 на десктопе */}
          <ChevronLeftIcon className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-gray-800" />
        </button>

        {/* Кнопка "Вперед" */}
        <button className="cursor-pointer my-next-btn absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-20 p-1 md:p-2 bg-white/80 rounded-full shadow-lg transition-all hover:bg-white active:scale-90">
          <ChevronRightIcon className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-gray-800" />
        </button>
      </div>
    </>
  );
}
