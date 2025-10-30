"use client";

import { useState } from "react";
import type { Post } from "@prisma/client";
import PostCard from "../components/post-card";

interface PostListProps {
  initialPosts: Post[];
  initialHasMore: boolean;
}

export default function PostList({
  initialPosts,
  initialHasMore,
}: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts?page=${page}`);
      const { posts: newPosts, hasMore: newHasMore } = await response.json();
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      setHasMore(newHasMore);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-1 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Кнопка "Больше историй" */}
        <div className="text-center">
          {hasMore && (
            <button
              onClick={loadMorePosts}
              disabled={isLoading}
              className="bg-[#4A5C43] text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? "Загрузка..." : "Больше историй"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
