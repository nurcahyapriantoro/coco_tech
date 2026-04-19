const BASE = '/api';

// All requests include credentials (httpOnly cookie sent automatically by browser)
const fetchOpts = { credentials: 'include' };

async function handleResponse(r) {
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error || `HTTP ${r.status}`);
  return data;
}

export const api = {
  get: (path) =>
    fetch(BASE + path, { ...fetchOpts }).then(handleResponse),
  post: (path, body) =>
    fetch(BASE + path, {
      ...fetchOpts,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleResponse),
  put: (path, body) =>
    fetch(BASE + path, {
      ...fetchOpts,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleResponse),
  del: (path) =>
    fetch(BASE + path, { ...fetchOpts, method: 'DELETE' }).then(handleResponse),
};

// Login — server sets httpOnly cookie; we just call the endpoint
export const login = (username, password) =>
  fetch(BASE + '/auth/login', {
    ...fetchOpts,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);

// Logout — server clears the httpOnly cookie
export const logout = () =>
  fetch(BASE + '/auth/logout', { ...fetchOpts, method: 'POST' }).then(handleResponse);

// Check session validity (called on app mount)
export const checkAuth = () =>
  fetch(BASE + '/auth/me', { ...fetchOpts }).then((r) => {
    if (r.status === 401) return null;
    return r.json();
  });
