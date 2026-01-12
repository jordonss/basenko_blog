"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormErrors {
  [key: string]: string | null;
}

export default function CreatePostForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    const newErrors: FormErrors = {};

    if (!title || title.trim().length < 3) {
      newErrors.title = "Заголовок должен быть не короче 3 символов";
    }

    if (!content || content.trim().length < 10) {
      newErrors.content = "Напишите хотя бы 10 символов в содержании";
    }

    if (image && image.size > 0 && image.size > 5 * 1024 * 1024) {
      newErrors.image = "Размер картинки не должен превышать 5МБ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Пост успешно создан!");
        (event.target as HTMLFormElement).reset();

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      } else {
        try {
          const result = await response.json();
          setServerError(result.error || "Ошибка сервера");
        } catch {
          setServerError("Ошибка сервера");
        }
      }
    } catch {
      setServerError("Произошла ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  const handleInput = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-4 md:space-y-6 transition-all hover:shadow-2xl"
    >
      <h2 className="text-xl md:text-2xl font-bold text-background font-unbounded text-center mb-2 md:mb-4">
        Новый пост
      </h2>

      <div className="font-unbounded group">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-background mb-1 md:mb-2 transition-colors group-focus-within:text-background"
        >
          Заголовок <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          onInput={() => handleInput("title")}
          placeholder="Введите название..."
          className={`w-full px-4 py-2.5 md:py-3 rounded-xl bg-gray-50 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
            ${
              errors.title
                ? "border-red-500 focus:ring-red-200 bg-red-50"
                : "border-gray-200 focus:ring-background focus:bg-white"
            }`}
        />
        {errors.title && (
          <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.title}</p>
        )}
      </div>

      <div className="font-unbounded group">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-background mb-1 md:mb-2 transition-colors group-focus-within:text-background"
        >
          Содержание <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          onInput={() => handleInput("content")}
          placeholder="О чем вы хотите рассказать?"
          className={`w-full px-4 py-2.5 md:py-3 rounded-xl bg-gray-50 border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-y min-h-[160px] md:min-h-[220px]
            ${
              errors.content
                ? "border-red-500 focus:ring-red-200 bg-red-50"
                : "border-gray-200 focus:ring-background focus:bg-white"
            }`}
        />
        {errors.content && (
          <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.content}</p>
        )}
      </div>

      <div className="font-unbounded">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-background mb-1 md:mb-2"
        >
          Картинка 🖼️
        </label>
        <div className="relative">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onInput={() => handleInput("image")}
            className={`block w-full text-xs md:text-sm text-gray-500
              file:mr-2 md:file:mr-4 file:py-2 file:md:py-2.5 file:px-3 md:file:px-4
              file:rounded-xl file:border-0
              file:text-xs md:file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-background
              hover:file:bg-indigo-100
              cursor-pointer file:cursor-pointer
              border rounded-xl
              bg-gray-50
              ${errors.image ? "border-red-500" : "border-gray-200"}`}
          />
        </div>
        {errors.image && (
          <p className="text-red-500 text-[10px] md:text-xs mt-1 ml-1">{errors.image}</p>
        )}
      </div>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 animate-pulse">
          <p className="text-xs md:text-sm text-red-600 text-center font-medium">
            ⚠️ {serverError}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 md:py-3.5 px-6 font-unbounded font-bold text-white rounded-xl shadow-lg transition-all duration-200 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-background hover:bg-[#115e04] hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:scale-95"
          }`}
      >
        {loading ? "Публикация..." : "Создать пост"}
      </button>

      {message && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 mt-2 md:mt-4">
          <p className="text-xs md:text-sm text-green-600 text-center font-medium">
            ✅ {message}
          </p>
        </div>
      )}
    </form>
  );
}
