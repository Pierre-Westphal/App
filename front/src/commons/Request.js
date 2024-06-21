const request = (url, method) => {
  fetch(`http://localhost:8080/${url}`, {
    method: method,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};

export default request;
