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
      <h2 className="text-5xl font-black text-[#F5EBEB] font-unbounded mb-1 mt-5 pl-20 text-left">
        ГАЛЕРЕЯ
      </h2>
      <div className="border-b-4 border-[#F5EBEB] w-100 ml-20"></div>
      <div className="relative w-full mx-auto rounded-lg overflow-hidden shadow-lg p-20 pt-10 group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
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
              <div className="relative w-full aspect-video bg-gray-200" >
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
        <button className="cursor-pointer my-prev-btn absolute top-1/2 -translate-y-1/2 left-4 z-20 p-2 bg-white/80 rounded-full shadow-lg transition-all hover:bg-white ">
          <ChevronLeftIcon className="h-20 w-20 text-gray-800" />
        </button>
        <button className="cursor-pointer my-next-btn absolute top-1/2 -translate-y-1/2 right-4 z-20 p-2 bg-white/80 rounded-full shadow-lg transition-all hover:bg-white">
          <ChevronRightIcon className="h-20 w-20 text-gray-800" />
        </button>
      </div>
    </>
  );
}
