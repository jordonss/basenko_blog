'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@prisma/client';

interface PostListProps {
  initialPosts: Post[];
  initialHasMore: boolean;
}

export default function PostList({ initialPosts, initialHasMore }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/posts?page=${page}`);
    const { posts: newPosts, hasMore: newHasMore } = await response.json();
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    setHasMore(newHasMore);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            {post.imageUrl && (
              <Image src={post.imageUrl} alt={post.title} width={400} height={192} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        {hasMore && (
          <button onClick={loadMorePosts} disabled={isLoading} className="bg-gray-800 text-white font-bold py-2 px-6 rounded disabled:bg-gray-400">
            {isLoading ? 'Загрузка...' : 'Читать далее'}
          </button>
        )}
      </div>
    </div>
  );
}