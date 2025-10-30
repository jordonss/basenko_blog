import prisma from '../lib/prisma';
import PostList from '../../components/post-list';
import { POSTS_PER_PAGE } from '../api/posts/route';

async function getInitialData() {
  const [posts, totalPosts] = await prisma.$transaction([
    prisma.post.findMany({
      take: POSTS_PER_PAGE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count(),
  ]);
  const hasMore = posts.length < totalPosts;
  return { posts, hasMore };
}

export default async function PostsGridPage() {
  const { posts, hasMore } = await getInitialData();

  return (
    <main className="flex flex-col mx-auto p-4 bg-(--foreground)">
      <h1 className="text-5xl font-black text-[#344532] font-unbounded mb-1 pl-20 text-left">БЛОГ</h1>
			<div className="border-b-4 border-[#4A5C43] w-100 mb-10 ml-20"></div>
      <PostList initialPosts={posts} initialHasMore={hasMore} />
    </main>
  );
}