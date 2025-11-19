import CreatePostForm from "@/components/create-post-form";

export default function NewPostPage() {
	return (
		<div className="max-w-7xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4 font-unbounded text-center">Создать новый пост</h1>
			{/* Импортируем и используем форму создания поста */}
			<CreatePostForm />
		</div>
	)
}