/*

localStorage is a simple and handy client-side storage, but you should avoid using it because it is synchronous.

Also Safari's ITP actually deletes client-side script-writable storage after 7 days of Safari use 
without interacting on your website, and localStorage is included.

Unlike Cookie, localStorage doesn't expire.

In this problem, please create a localStorage wrapper with expiration support

myLocalStorage.setItem('bfe', 'dev', 1000)
myLocalStorage.getItem('bfe')
// 'dev'
after 1 second:

myLocalStorage.getItem('bfe')
// null

*****************************************************Solution***************************************************/

window.myLocalStorage = {
  getItem(key) {
    return localStorage.getItem(key);
  },

  setItem(key, value, maxAge) {
    if (maxAge === 0) {
      return;
    }

    localStorage.setItem(key, value);

    if (maxAge > 0) {
      setTimeout(() => {
        localStorage.removeItem(key);
      }, maxAge);
    }
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
