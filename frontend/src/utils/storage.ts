import { useState, useEffect } from "react";

interface IlocalStorage {
  storageKey: string;
  defaultValue: string;
}

export const useStateWithSessionStorage = ({
  storageKey,
  defaultValue = "{}",
}: IlocalStorage) => {
  const [value, setValue] = useState<string>(
    JSON.parse(sessionStorage.getItem(storageKey) || defaultValue)
  );

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
};

export const useStateWithLocalStorage = ({
  storageKey,
  defaultValue = "{}",
}: IlocalStorage) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey) || defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
};
