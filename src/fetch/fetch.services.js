import i18next from '../i18n/i18n';
import { AuthStore } from '../stores';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * POST method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token
 * @return {Promise}         the data from the endpoint
 */
export function postData(url, data, isAuth) {
  return new Promise((resolve, reject) => {
    checkConnection();

    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': (isAuth) ? `Token ${AuthStore.getToken()}`: '',
        },
        method: 'POST',
      })
      .then(checkStatus)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * GET method fetch
 * @param  {string}  url    Endpoint URL
 * @param  {Boolean} isAuth true if api requires token
 * @return {Promise}         the data from the endpoint
 */
export function getData(url, isAuth) {
  return new Promise((resolve, reject) => {
    checkConnection();

    return fetch(`${API_URL}${url}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': (isAuth) ? `Token ${AuthStore.getToken()}`: '',
        },
        method: 'GET',
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

  if (response.ok) {
    return response.json().then((res) => {
      return Promise.resolve(res);
    })
  } else {
    return response.json().then((err) => {
      return Promise.reject(err);
    })
  }
}
