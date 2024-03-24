/*

Suppose we have a utility function getAPI() which fetches data.

```javascript
const getAPI = (path, config) => { ... }

const list1 = await getAPI('/list', { keyword: 'bfe'})
const list2 = await getAPI('/list', { keyword: 'dev'})
```

It works great. Util the UI become so complicated that same API might be called for multiple time 
within a relatively short period of time.

You want to avoid the unnecessary API calls, based on following assumption:

GET API call response hardly changes within 1000ms.

So identical GET API calls should return the same response within 1000ms. By identical, it means path 
and config are deeply equal.

You create `createGetAPIWithMerging(getAPI)`, which works like following.

```javascript
const getAPIWithMerging = createGetAPIWithMerging(getAPI)

getAPIWithMerging('/list', { keyword: 'bfe'}).then(...)  
// 1st call,  this will call getAPI

getAPIWithMerging('/list', { keyword: 'bfe'}).then(...) 
// 2nd call is identical to 1st call, 
// so getAPI is not called, 
// it resolves when 1st call resolves

getAPIWithMerging('/list', { keyword: 'dev'}).then(...)
// 3rd call is not identical, so getAPI is called

// after 1000ms
getAPIWithMerging('/list', {keyword: 'bfe'}).then(...)
// 4th call is identical to 1st call, 
// but since after 1000ms, getAPI is called.
```

Attention for memory leak!:
Your cache system should not bloat. For this problem, you should have 5 cache entries at maximum, which means:

```javascript
getAPIWithMerging('/list1', { keyword: 'bfe'}).then(...) 
// 1st call, call callAPI(), add a cache entry
getAPIWithMerging('/list2', { keyword: 'bfe'}).then(...) 
// 2nd call, call callAPI(), add a cache entry
getAPIWithMerging('/list3', { keyword: 'bfe'}).then(...) 
// 3rd call, call callAPI(), add a cache entry
getAPIWithMerging('/list4', { keyword: 'bfe'}).then(...) 
// 4th call, call callAPI(), add a cache entry
getAPIWithMerging('/list5', { keyword: 'bfe'}).then(...) 
// 5th call, call callAPI(), add a cache entry

getAPIWithMerging('/list6', { keyword: 'bfe'}).then(...) 
// 6th call, call callAPI(), add a cache entry
// cache of 1st call is removed

getAPIWithMerging('/list1', { keyword: 'bfe'}).then(...) 
// identical with 1st call, but cache of 1st call is removed
// new cache of entry is added
```

clear():

For test purpose, please provide a clear method to clear all cache.

```javascript
getAPIWithMerging.clearCache()
```

*****************************************************Solution**************************************************/

/**
 * @param {(path: string, config: any) => Promise<any>} getAPI
 * @returns {(path: string, config: any) => Promise<any> & {clearCache: () => void}}
 */

function createGetAPIWithMerging(getAPI) {
  let cache = {};
  const MAX_CACHE_ENTRIES_ALLOWED = 5;
  const CACHE_TIME = 1000;

  function getAPIWithMerging(path, config) {
    const key = getKey(path, config);

    if (cache[key]) {
      if (cache[key].expiry > Date.now()) {
        return Promise.resolve(cache[key].promise);
      }

      delete cache[key];
    }

    const promise = getAPI(path, config);

    if (Object.keys(cache).length === MAX_CACHE_ENTRIES_ALLOWED) {
      delete cache[Object.keys(cache)[0]];
    }

    cache[key] = { promise, expiry: Date.now() + CACHE_TIME };
    return promise;
  }

  getAPIWithMerging.clearCache = function () {
    cache = {};
  };

  return getAPIWithMerging;
}

function getKey(path, config) {
  const arr = [path];

  const configKeys = Object.keys(config).sort();
  for (const configKey of configKeys) {
    arr.push([configKey, config[configKey]]);
  }

  return JSON.stringify(arr);
}

/*
  
  // another solution using Map()
  
  function createGetAPIWithMerging(getAPI) {
    const cache = new Map();
  
    function getAPIWithMerging(path, config) {
      const key = getHashKey(path, config);
      const result = cache.get(key);
      if(result) {
        if(result.expiredAt > Date.now()) {
          return Promise.resolve(result.promise);
        }
        cache.delete(key);
      }
  
      const promise = getAPI(path, config);
      cache.set(key, { promise, expiredAt: Date.now() + 1000 })
      return promise;
    }
  
    getAPIWithMerging.clearCache = () => {
      cache.clear();
    }
  
    return getAPIWithMerging
  }
  
  function getHashKey(path, config) {
    const arr = [path];
    const keys = Object.keys(config);
    keys.sort()
    for(let key of keys) {
      arr.push([key, config[key]]);
    }
    return JSON.stringify(arr);
  }
  
  */
