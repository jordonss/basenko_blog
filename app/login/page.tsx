import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {

	const { message } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <form className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-8 shadow-lg bg-white">
        <h1 className="text-2xl text-background font-bold font-unbounded text-center mb-4">
          Вход в систему
        </h1>

        <label
          className="text-md text-background font-unbounded"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="rounded-md border px-4 py-2 bg-inherit border-gray-300"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label
          className="text-md text-background font-unbounded"
          htmlFor="password"
        >
          Пароль
        </label>
        <input
          className="rounded-md border px-4 py-2 bg-inherit border-gray-300"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <button
          formAction={login}
          className="bg-background text-white font-unbounded rounded-md px-4 py-2 mb-2 hover:bg-[#115e04] transition"
        >
          Войти
        </button>

        <button
          formAction={signup}
          className="border bg-foreground border-gray-300 font-unbounded text-background rounded-md px-4 py-2 hover:bg-gray-100 transition"
        >
          Регистрация
        </button>

        {message && (
          <p className="mt-4 bg-red-100 text-red-600 p-3 text-center rounded-md">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
