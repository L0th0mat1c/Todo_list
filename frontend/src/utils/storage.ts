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
    storageKey &&
      JSON?.parse(sessionStorage.getItem(storageKey || "test") || defaultValue)
  );

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
};

export const useStateWithLocalStorage = ({
  storageKey = "test",
  defaultValue = "{}",
}: IlocalStorage) => {
  const [value, setValue] = useState(
    storageKey &&
      JSON.parse(
        JSON.stringify(
          localStorage.getItem(storageKey || "test") || defaultValue
        )
      )
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
};
