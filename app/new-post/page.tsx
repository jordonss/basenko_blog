import { createClient } from "../utils/supabase/sever";
import CreatePostForm from "@/components/create-post-form";

const ADMIN_EMAIL = "nemezg@gmail.com";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 font-unbounded text-center">
        Создать новый пост
      </h1>
      {/* Импортируем и используем форму создания поста */}
      {isAdmin ? (
        <CreatePostForm />
      ) : (
        <p className="text-center text-red-600 font-unbounded">
          У вас нет прав для создания постов.
        </p>
      )}
    </div>
  );
}
