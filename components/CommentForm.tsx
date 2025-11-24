"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const CommentForm = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const author = session?.user?.name || "Anonymous";
    const authorId = session?.user?.id; // Assuming you have user id in session

    try {
      await axios.post(`/posts/${postId}/comments`, {
        content,
        author,
        authorId,
      });

      alert("Comment submitted!");
      setContent("");
      router.refresh(); // Refresh the page to show the new comment
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An error occurred while submitting the comment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg self-start"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
