const BASE = 'http://127.0.0.1:8000';

export async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const users = {
  list: () => request('/users/'),
  get: (id) => request(`/users/${id}/`),
  create: (data) => request('/users/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/users/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/users/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/users/${id}/`, { method: 'DELETE' }),
};

export const posts = {
  list: () => request('/posts/'),
  get: (id) => request(`/posts/${id}/`),
  create: (data) => request('/posts/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/posts/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/posts/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/posts/${id}/`, { method: 'DELETE' }),
};

export const comments = {
  list: () => request('/comments/'),
  get: (id) => request(`/comments/${id}/`),
  create: (data) => request('/comments/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/comments/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/comments/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/comments/${id}/`, { method: 'DELETE' }),
};

export const todos = {
  list: () => request('/todos/'),
  get: (id) => request(`/todos/${id}/`),
  create: (data) => request('/todos/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/todos/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/todos/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/todos/${id}/`, { method: 'DELETE' }),
};

export const albums = {
  list: () => request('/albums/'),
  get: (id) => request(`/albums/${id}/`),
  create: (data) => request('/albums/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/albums/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/albums/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/albums/${id}/`, { method: 'DELETE' }),
};

export const photos = {
  list: () => request('/photos/'),
  get: (id) => request(`/photos/${id}/`),
  create: (data) => request('/photos/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/photos/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (id, data) => request(`/photos/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/photos/${id}/`, { method: 'DELETE' }),
};
