import CreatePostForm from "@/components/create-post-form";

export default function NewPostPage() {
	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Создать новый пост</h1>
			{/* Импортируем и используем форму создания поста */}
			<CreatePostForm />
		</div>
	)
}