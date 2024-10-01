export async function apiRequest(url, method, body = '', params = {}) {
  try {
    let base_url = `http://localhost:8000/${url}`;
    
    if (params.q) {
      base_url = base_url + '?' + new URLSearchParams(params).toString();
    }

    const response = await fetch(base_url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json(); // Parse the response

    if (data.detail === "Validation Error") {
      return {"errors": data.error}; // Return the error in case of validation error
    }

    return data; // Return the parsed response

  } catch (error) {
    return {"error": error}; // Propagate the error if needed
  }
}

export function validationError(error) {
  return "ok"
}