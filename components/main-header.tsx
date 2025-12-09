import Link from "next/link";
import AuthButton from "./auth-button";

export default function MainHeader() {
  return (
    <header className="flex justify-between w-full p-7 pl-30 items-center">
      <nav className="flex w-full">
        <ul
          className="flex w-full text-2xl font-black font-unbounded"
        >
          <li className="mr-5">
            <Link href="/blog">Блог</Link>
          </li>
          <li className="ml-15">
            <Link href="/gallery">Галерея</Link>
          </li>
          <li className="ml-auto mr-21">
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
