const API = "http://localhost:8000/"

async function get(url) {

  let tempUrl = null
  tempUrl = url === undefined ? API : API + `${url}`

  const response = await fetch(tempUrl, {
    mode: 'cors',
    credentials: "include",
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const body = await response.json()
  return body.message
}

export default get;
