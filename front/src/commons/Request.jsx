export async function apiRequest(url, method, body = '', params = {}, rawResponse = false) {
  try {
    let base_url = `http://localhost:8000/${url}`;
    
    if (Object.keys(params).length > 0) {
      base_url += '?' + new URLSearchParams(params).toString();
    }

    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    let current_user_id = localStorage.getItem('userId');
    
    const response = await fetch(base_url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'refresh_token': refresh_token,
        'Authorization': `Bearer ${access_token}`,
        'Current-User-Id': current_user_id
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (response.status === 401 || data.detail === "Unauthorized") {
      window.location.href = 'http://localhost:3000';
    }

    if (rawResponse) return response;

    const data = await response.json();

    if (response.status >= 400 || data.detail === "Validation Error") {
      return {"errors": data.detail}; 
    }

    return data;

  } catch (error) {
    return {"error": error};
  }
}