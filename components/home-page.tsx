import Image from "next/image";

import Military from "@/images/uniform.png";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center w-full">
				<nav className="">
					<Link href="/">Домой</Link>
				</nav>
        <h1 className="justify-start w-5xl text-8xl flex flex-wrap font-unbounded text-main font-bold">
          ПОГРАНИЧНИК<span className="text-sub leading-50">В ВОЙНЕ</span>
          <span className="pt-5 text-4xl flex flex-wrap">
            истории, мысли и{" "}
            <span className="text-4xl leading-10">
              воспоминания с окраин мира
            </span>
          </span>
        </h1>
        <Image className="w-2xl" src={Military} alt="Пограничник в войне" />
      </div>
    </>
  );
}
