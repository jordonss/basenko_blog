import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex w-full flex-col bg-(--foreground) text-1xl font-black text-[#344532] font-unbounded pl-20 p-20 text-left">
        <Link
          href={"https://www.instagram.com/nichogo_sviatogo/"}
          target="_blank"
          rel="noopener noreferrer"
          className="m-2"
        >
          Instagram
        </Link>
        <Link
          href={"https://t.me/nichogo_sviatogo"}
          target="_blank"
          rel="noopener noreferrer"
          className="m-2"
        >
          Telegram
        </Link>
        <Link
          href={""}
          target="_blank"
          rel="noopener noreferrer"
          className="m-2"
        >
          Email
        </Link>
        <p className="text-center mt-2 text-1xl font-black text-[#344532] font-unbounded">
          All rights reserved 2025
        </p>
      </div>
    </footer>
  );
}
