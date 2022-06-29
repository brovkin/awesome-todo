export const getLocalStorage = (storageName: string) => {
  const json: string | null = localStorage.getItem(storageName);
  return json ? JSON.parse(json) : [];
};

export const updateLocalStorage = (storageName: string, value: any): void => {
  const json = JSON.stringify(value);
  localStorage.setItem(storageName, json);
};

export const clearLocalStorage = (storageName: string): void => {
  localStorage.removeItem(storageName);
};
