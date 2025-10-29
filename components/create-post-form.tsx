'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostForm() {
  const [error, setError] = useState('');
	const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    // const result = await response.json();

    if (response.ok) {
      setMessage('Пост успешно создан!');
      event.currentTarget.reset();
      // Обновляем страницу, чтобы увидеть новый пост
      router.refresh(); 
    } else {
      const result = await response.json();
      setMessage(`Ошибка: ${result.error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Заголовок</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div>
        <label htmlFor="content">Содержание</label>
        <textarea id="content" name="content" />
      </div>
      <div>
        <label htmlFor="image">Картинка 🖼️</label>
        <input type="file" id="image" name="image" accept="image/*" />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Создать пост</button>
			{message && <p>{message}</p>}
    </form>
  );
}