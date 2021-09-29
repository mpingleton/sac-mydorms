const storagePrefix = 'sac_mydorms';

const storage = {
  getToken: (type) => {
    const tokenString = window.localStorage.getItem(`${storagePrefix}_${type}_token`);

    if (tokenString !== 'undefined') {
      return JSON.parse(tokenString);
    }

    return null;
  },
  setToken: (type, token) => {
    window.localStorage.setItem(`${storagePrefix}_${type}_token`, JSON.stringify(token));
  },
  clearTokens: () => {
    window.localStorage.removeItem(`${storagePrefix}_access_token`);
    window.localStorage.removeItem(`${storagePrefix}_refresh_token`);
  },
};

export default storage;
