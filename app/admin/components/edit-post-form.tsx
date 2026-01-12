"use client";

import { useFormStatus as useFormStatus } from "react-dom";
import { updatePost } from "../actions";
import { Post } from "@prisma/client";

interface EditPostFormProps {
  post: Post;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-2 rounded font-unbounded transition mt-4 
        ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-background hover:bg-blue-700 text-white"
        }`}
    >
      {pending ? "Сохраняем..." : "Сохранить изменения"}
    </button>
  );
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const updateActionWithId = updatePost.bind(null, post.id);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const error = searchParams.get("error");

  return (
    <form
      action={updateActionWithId}
      className="space-y-4 bg-white p-6 shadow-lg rounded-lg"
    >
      {error && (
        <p className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Ошибка: {decodeURIComponent(error)}
        </p>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium font-unbounded text-background"
        >
          Заголовок
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-background"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium font-unbounded text-background"
        >
          Контент
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={post.content}
          rows={10}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-background"
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium font-unbounded text-background"
        >
          URL Изображения (не редактируемое)
        </label>
        <input
          readOnly
          type="text"
          id="imageUrl"
          name="imageUrl"
          defaultValue={post.imageUrl || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={post.published}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label
          htmlFor="published"
          className="ml-2 block text-sm font-unbounded text-background"
        >
          Опубликовано (Published)
        </label>
      </div>

      <SubmitButton />
    </form>
  );
}
