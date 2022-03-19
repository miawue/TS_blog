class LocalStorage {
  setItem = (key: string, value: string) => {
    return localStorage.setItem(key, value);
  };

  getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  clearStorage = () => {
    localStorage.clear();
  };
}

const storage = new LocalStorage();

export default storage;
