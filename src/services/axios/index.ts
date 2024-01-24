/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import localStorageUtils from 'utils/LocalStorage';
import { LocalStorageEnum } from 'enums/auth';
import { apiRoutesEnum } from 'enums/routes';
import EventEmitter from 'utils/eventEmitter';

let isRefreshing = false;

export const getIsRefreshing = () => isRefreshing;

export const setIsRefreshing = (val: boolean) => {
  isRefreshing = val;
};

const eventChannel = new EventEmitter();
const accessToken =
  localStorageUtils.getItem(LocalStorageEnum.ACCESS_TOKEN) || '';

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

AXIOS.interceptors.request.use((config) => {
  // Use latest 'accessToken' in auth header when reference is expired
  const latestAccessToken = localStorageUtils.getItem(
    LocalStorageEnum.ACCESS_TOKEN,
  );

  // renew accessToken
  if (latestAccessToken !== accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!.Authorization = `Bearer ${latestAccessToken}`;
  }

  return config;
});

AXIOS.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    return response;
  },
  (interceptorError) => {
    const originalRequest = interceptorError.config;
    if (
      interceptorError.response &&
      interceptorError.response.status === 401 &&
      originalRequest.url !== apiRoutesEnum.AUTH_RENEW
    ) {
      // only make renew token when there are no renew request being processed
      if (!isRefreshing) {
        isRefreshing = true;
        AXIOS.post(apiRoutesEnum.AUTH_RENEW, {
          refreshToken: localStorageUtils.getItem(
            LocalStorageEnum.REFRESH_TOKEN,
          ),
        })
          .then((res: any) => {
            if (res?.accessToken) {
              localStorageUtils.setItem(
                LocalStorageEnum.ACCESS_TOKEN,
                res.accessToken,
              );
              // Emit event to channel for other know about it
              eventChannel.emit('refresh', res.accessToken);
              // Remove all listener since all the receivers has received event
              eventChannel.removeAllListener();
            } else {
              throw new Error(`Refresh failed with status ${res.status}`);
            }
          })
          .catch((error) => {
            eventChannel.emit('refresh', error);
            // Remove all listener since all the receivers has received error
            eventChannel.removeAllListener();
            // logout user anyway
            localStorageUtils.removeItem(LocalStorageEnum.ACCESS_TOKEN);
            localStorageUtils.removeItem(LocalStorageEnum.REFRESH_TOKEN);
            localStorageUtils.removeItem(LocalStorageEnum.ACCOUNT);
            localStorageUtils.removeItem(LocalStorageEnum.CONNECTOR);
            localStorageUtils.removeItem(LocalStorageEnum.USER_ID);
            window.location.href = '/';
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      // Wait for renew token process
      return new Promise((resolve, reject) => {
        eventChannel.addListener('refresh', (payload: string | Error) => {
          if (typeof payload === 'string') {
            originalRequest.headers.Authorization = `Bearer ${payload}`;
            resolve(AXIOS(originalRequest));
          } else if (payload instanceof Error) {
            reject(payload);
          } else {
            resolve('');
          }
        });
      });
    }
    return Promise.reject(interceptorError);
  },
);

export default AXIOS;
