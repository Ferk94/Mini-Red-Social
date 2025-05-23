const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  // console.log(res, 'que tenemos en res del backend?')
  if (!res.ok) throw new Error('Error al traer los posts');
  return res.json();
}

export async function createPost(name: string, message: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message }),
  });
  if (!res.ok) throw new Error('Error al crear el post');
  return res.json();
}

export async function likePost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}/like`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Error al darle like');
  return res.json();
}

export async function deletePost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar el post');
  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'GET',
  });

  const data = res.json()
  if (!res.ok) throw new Error('Error al traer el post');
  return data;
}
