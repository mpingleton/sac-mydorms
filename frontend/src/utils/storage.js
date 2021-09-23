const storagePrefix = 'sac_mydorms_';

const storage = {
  getToken: () => {
    const tokenString = window.localStorage.getItem(`${storagePrefix}token`);

    if (tokenString !== 'undefined') {
      return JSON.parse(tokenString);
    }

    return null;
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
