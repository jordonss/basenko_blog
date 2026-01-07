import Link from "next/link";
import AuthButton from "./auth-button";

export default function MainHeader() {
  return (
    // Изменено: Используем симметричный padding, который уменьшается на iPad (lg) и мобильных
    <header className="flex justify-between w-full p-4 sm:p-6 lg:p-7 lg:px-20 xl:px-30 items-center">
      <nav className="flex w-full max-w-[1600px] mx-auto">
        <ul
          // Изменено: flex-wrap позволяет элементам не вылезать за экран, если они совсем не влезают
          className="flex flex-wrap items-center w-full text-lg sm:text-xl lg:text-2xl font-black font-unbounded gap-y-4"
        >
          {/* Блог */}
          <li className="mr-5 sm:mr-8 lg:mr-10">
            <Link href="/blog" className="hover:text-sub transition-colors">
              Блог
            </Link>
          </li>
          
          {/* Галерея: убран жесткий ml-15, теперь отступ адаптивный */}
          <li className="ml-0 md:ml-6 lg:ml-10 xl:ml-15">
            <Link href="/gallery" className="hover:text-sub transition-colors">
              Галерея
            </Link>
          </li>
          
          {/* AuthButton: ml-auto всегда прижимает его вправо */}
          <li className="ml-auto">
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
