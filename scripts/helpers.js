// local-storage'a eleman ekler
export const setLocal = (key, data) => {
  const strData = JSON.stringify(data);

  localStorage.setItem(key, strData);
};

// local'den eleman alır
export const getLocal = (key) => {
  const strData = localStorage.getItem(key);

  const data = JSON.parse(strData);

  return data;
};
