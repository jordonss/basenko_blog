'use client';

import { useFormStatus as useFormStatus } from 'react-dom'; 
import { deletePost } from '../actions';

interface DeleteButtonProps {
  postId: string;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const { pending } = useFormStatus();

  const deleteActionWithId = deletePost.bind(null, postId);

  return (
    <form action={deleteActionWithId}>
      <button
        type="submit"
        disabled={pending}
        className={`px-3 py-1 text-sm rounded transition font-unbounded mt-2
          ${pending 
            ? 'bg-red-300 text-white cursor-not-allowed' 
            : 'bg-red-500 hover:bg-red-600 text-white'}`}
      >
        {pending ? 'Удаляем...' : 'Удалить'}
      </button>
    </form>
  );
}