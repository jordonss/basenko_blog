import Image from "next/image";
import MainHeader from "@/components/main-header";
import Military from "@/images/uniform.png";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center"> {/* Центрируем всё содержимое */}
      
      {/* Карта — она абсолютная, ей всё равно */}
      <div className="absolute w-full lg:w-[65%] inset-0 bg-[url(../images/world-map.png)] bg-cover bg-center opacity-5 pointer-events-none"></div>
      
      {/* Хедер выносим в отдельный контейнер на всю ширину */}
      <div className="w-full">
        <MainHeader />
      </div>

      {/* Контентная часть */}
      <div className="w-full max-w-[1600px] px-6 md:px-12 lg:px-20 py-8 md:py-16 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Текст: на мобильных центр, на десктопе лево */}
          <div className="w-full lg:w-3/5 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h1 className="font-unbounded text-main font-bold">
              <span className="text-4xl sm:text-5xl md:text-[54px] xl:text-[80px] block leading-none">
                ПОГРАНИЧНИК
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl block mt-2 leading-tight">
                В ВОЙНЕ
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl md:text-2xl xl:text-4xl font-normal font-unbounded leading-snug max-w-2xl">
              истории, мысли и 
              <span className="block xl:inline xl:ml-3">воспоминания с окраин мира</span>
            </p>
          </div>

          {/* Картинка: всегда центрируется в своем блоке */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="w-full max-w-[320px] sm:max-w-md lg:max-w-full">
              <Image 
                className="w-full h-auto object-contain drop-shadow-2xl" 
                src={Military} 
                alt="Пограничник" 
                priority 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}