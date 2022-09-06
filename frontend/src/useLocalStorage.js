import { useState, useEffect } from "react";

const getStorageValue = (key, defaultValue) => {
  // getting stored value
  const saved = window.localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
