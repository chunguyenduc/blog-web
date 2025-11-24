import Link from "next/link";
import { use } from "react";
import axios from "@/lib/axios";
import SanitizedHtml from "@/components/SanitizedHtml";

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
}

interface PaginatedPosts {
  data: Post[];
}

async function getPosts(page: number, limit: number): Promise<Post[]> {
  try {
    const res = await axios.get<PaginatedPosts>("/posts", {
      params: { page, limit },
    });
    return res.data.data.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(use(searchParams).page) || 1;
  const limit = 10;
  const posts = use(getPosts(page, limit));

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </h2>
              <SanitizedHtml
                html={post.content.substring(0, 150) + "..."}
                className="text-gray-600"
              />
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <Link
          href={`/?page=${page > 1 ? page - 1 : 1}`}
          className={`px-4 py-2 rounded-lg ${
            page <= 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </Link>
        <Link
          href={`/?page=${page + 1}`}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
