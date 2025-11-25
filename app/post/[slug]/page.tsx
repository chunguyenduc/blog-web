import CommentForm from "@/components/CommentForm";
import { notFound } from "next/navigation";
import axios from "@/lib/axios";
import { use } from "react";

interface Comment {
  id: string;
  author: string;
  description: string;
  content: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content_html: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await axios.get(`/posts/${slug}`);
    return res.data.data.post;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error("Error fetching post:", error);
    return null;
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = use(params);
  const post = use(getPost(resolvedParams.slug));

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content_html }}
      />

      <h2 className="text-2xl font-bold mb-4 mt-8">Comments</h2>
      <div className="grid gap-4">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-lg">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <CommentForm postId={post.id} />
    </div>
  );
}
