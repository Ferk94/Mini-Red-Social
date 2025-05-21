
import { getPost } from '../../lib/api';
import PostDetailClient from './PostDetail';

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params: { id } }: Props) {
    try {
    const post = await getPost(id);
    return <PostDetailClient postDetail={post} />;
    } catch (error) {
        console.error('No se encontró el post:', error);
    }
}
