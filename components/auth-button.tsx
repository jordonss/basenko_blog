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
    <div className="flex flex-col lg:flex-row items-end lg:items-center gap-3 lg:gap-4 w-full lg:w-auto">
      
      <span className="text-[10px] sm:text-xs lg:text-sm opacity-70 font-medium">
        {user.email}
      </span>

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        {isAdmin && (
          <>
            <Link
              href="/new-post"
              className="w-full sm:w-auto text-center whitespace-nowrap bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background py-2 px-4 rounded text-xs lg:text-sm transition-all shadow-sm"
            >
              Создать пост
            </Link>
            <Link
              href="/admin"
              className="w-full sm:w-auto text-center whitespace-nowrap bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background py-2 px-4 rounded text-xs lg:text-sm transition-all shadow-sm"
            >
              Админка
            </Link>
          </>
        )}
        
        <form action={signout} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-xs lg:text-sm transition-all shadow-sm">
            Выйти
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-foreground hover:bg-[#4a5c43] hover:text-[#F5EBEB] text-background py-2 px-6 text-sm rounded transition-all font-bold"
    >
      Войти
    </Link>
  );
}