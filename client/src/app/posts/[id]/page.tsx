import { getPost } from "../../lib/api";
import PostDetailClient from "./PostDetail";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: Props) {
  try {
    // resolver el params (es una promesa :o) antes de usarlo
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const post = await getPost(id);

    console.log(post, "que tenemos en el post?");

    if (!post) {
      notFound();
    }

    return <PostDetailClient postDetail={post} />;
  } catch (error) {
    console.error("No se encontró el post:", error);
  }
}
