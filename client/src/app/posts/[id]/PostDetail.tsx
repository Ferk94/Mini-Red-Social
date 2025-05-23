"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
  id: string;
  name: string;
  date: string;
  message: string;
  likes: number;
};

type Props = {
  postDetail: Post;
};

export default function PostDetail({ postDetail }: Props) {
  const router = useRouter();

  if (!postDetail) {
    router.push("/404");
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontSize: "1.2rem",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {postDetail.name}
      </h1>
      {/* <p><strong>ID:</strong> {postDetail.id}</p> */}
      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(postDetail.date).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p>
        <strong>Mensaje:</strong>
      </p>
      <p style={{ marginBottom: "1rem" }}>{postDetail.message}</p>
      <p>
        <strong>Likes:</strong> 👍 {postDetail.likes}
      </p>
      <Link href="/" className="text-blue-500 underline">
        Regresar
      </Link>
    </div>
  );
}
