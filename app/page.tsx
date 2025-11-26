import Link from "next/link";
import { use } from "react";
import axios from "@/lib/axios";
import "./page.css";
import SanitizedHtml from "@/components/SanitizedHtml";

interface Post {
  id: string;
  slug: string;
  title: string;
  content_html: string;
  created_at: string;
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
      <div className="post-grid">
      <div className="">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="post">
              <h3 className="text-2xl font-bold mb-2">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h3>
              <p
                className="text-sm text-gray-500 mb-4"
              >{`Posted on ${new Date(
                post.created_at
              ).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`}</p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      <div className="pagination-container mt-8">
        <Link
          href={`/?page=${page > 1 ? page - 1 : 1}`}
          className={`px-4 py-2 rounded-lg ${page <= 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous Page
        </Link>
        <Link
          href={`/?page=${page + 1}`}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Next Page
        </Link>
      </div>
      </div>
    </div>
  );
}
