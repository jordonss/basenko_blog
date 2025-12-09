"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/sever";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
		const errorMessage = encodeURIComponent('Неверный логин или пароль')
    return redirect(`/login?message=${errorMessage}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
		const errorMessage = encodeURIComponent('Ошибка регистрации')
    return redirect(`/login?message=${errorMessage}`);
  }

  revalidatePath("/", "layout");
	const message = encodeURIComponent('Регистрация успешна! Проверьте почту для подтверждения.')
  redirect(`/login?message=${message}`);
}

export async function signout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
