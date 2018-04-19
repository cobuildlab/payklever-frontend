const API_URL = process.env.REACT_APP_API_URL;

export function postData(url, data) {
  return fetch(`${API_URL}${url}`, {
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
    })
    .then(checkStatus);
}

/*
reject or resolve based on status then Parses the response to json
 */
function checkStatus(response) {
  // TODO: logout on err 401/403

  if (response.status === 200) {
    return response.json().then((res) => {
      return Promise.resolve(res);
    })
  } else {
    return response.json().then((err) => {
      return Promise.reject(err);
    })
  }
}
