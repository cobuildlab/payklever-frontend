import i18next from '../i18n/i18n';

const API_URL = process.env.REACT_APP_API_URL;

export function postData(url, data) {
  return new Promise((resolve, reject) => {
    checkConnection();

    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/*
check if there's internet connection
 */
function checkConnection() {
  if (!navigator.onLine) {
    throw new Error(i18next.t('FETCH.noInternet'));
  };
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
