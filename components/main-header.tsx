import Link from "next/link";
import AuthButton from "./auth-button";

export default function MainHeader() {
  return (
    <header className="flex justify-between w-full p-4 sm:p-6 lg:p-7 lg:px-20 xl:px-30 items-center">
      <nav className="flex w-full max-w-[1600px] mx-auto">
        <ul
          className="flex flex-wrap items-center w-full text-lg sm:text-xl lg:text-2xl font-black font-unbounded gap-y-4"
        >
          <li className="mr-5 sm:mr-8 lg:mr-10">
            <Link href="/#blog" className="transition-colors">
              Блог
            </Link>
          </li>

          <li className="ml-0 md:ml-6 lg:ml-10 xl:ml-15">
            <Link href="/#gallery" className="transition-colors">
              Галерея
            </Link>
          </li>

          <li className="ml-auto">
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
