import { createClient } from "../app/utils/supabase/sever";
import Link from "next/link";
import { signout } from "@/app/login/actions";

const ADMIN_EMAIL = "nemezg@gmail.com";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.email === ADMIN_EMAIL;

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm">Привет, {user.email}!</span>
      {isAdmin && (
        <>
          <Link
            href="/new-post"
            className="bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background py-2 px-4 rounded"
          >
            Создать пост
          </Link>
          <Link
            href="/admin"
            className="bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background py-2 px-4 rounded"
          >
            Админ панель
          </Link>
        </>
      )}
      <form action={signout}>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
          Выйти
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background py-2 px-4 rounded"
    >
      Войти
    </Link>
  );
}
