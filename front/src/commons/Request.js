export async function apiRequest(url, method, body = '') {
  const response = await fetch(`http://localhost:8000/${url}`, {
    method: method,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json();
}
