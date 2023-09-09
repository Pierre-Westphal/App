const API = "http://localhost:8000/"

async function post(url, credentials) {

    let tempUrl = null;
    tempUrl = url === undefined ? API : API + `${url}`;

    return fetch(tempUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:8000'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default post;