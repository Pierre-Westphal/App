export async function apiRequest(url, method, body = '') {
  try {
    const response = await fetch(`http://localhost:8000/${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json(); // Parse the response
    console.log(data.detail === "Validation Error")
    if (data.detail === "Validation Error") {
      return {"errors": data.error}; // Return the error in case of validation error
    }

    return data; // Return the parsed response

  } catch (error) {
    throw {"error": error}; // Propagate the error if needed
  }
}

export function validationError(error) {
  return "ok"
}