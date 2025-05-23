import { getPosts } from "./lib/api";
import Home from "./Home";

export default async function Page() {
  try {
    const posts = await getPosts();
    return <Home initialPosts={posts} />;
  } catch (error) {
    console.error("Error cargando posts:", error);
    return <p>Error cargando publicaciones.</p>;
  }
}
