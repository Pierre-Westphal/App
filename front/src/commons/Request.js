export async function apiRequest(url, method) {
  const response = await fetch(`http://localhost:8000/${url}`, {
    method: method,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
  return response.json();
}
