import { LocalStorageEnum } from 'enums/auth';

//Local Strorage
const setItem = (name: LocalStorageEnum, value: string) => {
  return localStorage.setItem(name, value);
};

const getItem = (name: LocalStorageEnum) => {
  return localStorage.getItem(name);
};

const removeItem = (name: LocalStorageEnum) => {
  return localStorage.removeItem(name);
};

//Session Strorage
const setItemSS = (name: LocalStorageEnum, value: string) => {
  return sessionStorage.setItem(name, value);
};

const getItemSS = (name: LocalStorageEnum) => {
  return sessionStorage.getItem(name);
};

const removeItemSS = (name: LocalStorageEnum) => {
  return sessionStorage.removeItem(name);
};

export default {
  setItem,
  getItem,
  removeItem,
  setItemSS,
  getItemSS,
  removeItemSS,
};
