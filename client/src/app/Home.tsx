'use client';

import { useState } from 'react';
import { createPost, deletePost, likePost } from './lib/api';

type Post = {
  id: string;
  name: string;
  date: string;
  message: string;
  likes: number;
};

type Props = {
  initialPosts: Post[];
};

export default function Home({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  // Refetch posts después de mutaciones
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field: 'name' | 'message', value: string) => {
    if (field === 'name') setName(value);
    else setMessage(value);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (field === 'name') {
        !value.trim()
          ? (newErrors.name = 'El nombre es obligatorio.')
          : delete newErrors.name;
      }
      if (field === 'message') {
        value.trim().length < 5
          ? (newErrors.message = 'El mensaje debe tener al menos 5 caracteres.')
          : delete newErrors.message;
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || message.trim().length < 5) {
      const newErrors: typeof errors = {};
      if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
      if (message.trim().length < 5)
        newErrors.message = 'El mensaje debe tener al menos 5 caracteres.';
      setErrors(newErrors);
      return;
    }

    try {
      await createPost(name, message);
      setName('');
      setMessage('');
      setErrors({});
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await likePost(id);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Mini Red Social</h1>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <textarea
              placeholder="Tu mensaje"
              value={message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              errors.name || errors.message || !name.trim() || message.trim().length < 5
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            }`}
            disabled={Boolean(errors.name || errors.message || !name.trim() || message.trim().length < 5)}
          >
            Publicar
          </button>
        </form>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">No hay publicaciones aún.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">{post.name}</h2>
                    <p className="text-sm text-gray-500">
                      Publicado el{' '}
                      {new Date(post.date).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setPostToDelete(post)}
                    className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>

                <p className="mt-3 text-gray-700 text-base">{post.message}</p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 transition cursor-pointer"
                  >
                    👍
                  </button>
                  <span className="text-sm text-gray-600">{post.likes} me gusta</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {postToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">¿Eliminar publicación?</h2>
              <p className="mb-4 text-sm text-gray-700">
                Estás por eliminar el mensaje de <strong>{postToDelete.name}</strong>. ¿Estás seguro?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setPostToDelete(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    await handleDelete(postToDelete.id);
                    setPostToDelete(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
