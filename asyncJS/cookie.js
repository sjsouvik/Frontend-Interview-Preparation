/*

We can get and set cookie by document.cookie.

```javascript
document.cookie = 'bfe=dev'
// "bfe=dev"

document.cookie = 'bfe1=dev1'
// "bfe1=dev1"

document.cookie
// "bfe=dev; bfe1=dev1"
```

Please create your own myCookie.

1. it should support get and set.

```javascript
document.myCookie = 'bfe=dev'
// "bfe=dev"

document.myCookie = 'bfe1=dev1'
// "bfe1=dev1"

document.myCookie
// "bfe=dev; bfe1=dev1"
```

2. there a few options to cookie, but in this problem, you only need to support max-age which means the 
cookie should be deleted after certain time(in seconds).

```javascript
document.myCookie = 'bfe=dev; max-age=1'
// "bfe=dev; max-age=1"

document.myCookie
// "bfe=dev"
after 1 second

document.myCookie
// ""
```

3. in your code, please enable myCookie in `install()` and remove the logic in `uninstall()`, 
these are used in judging.

*******************************************************Solution***********************************************/

// enable myCookie
function install() {
  let cookies = {};

  Object.defineProperty(document, "myCookie", {
    get() {
      const cookieData = [];

      for (const key of Object.keys(cookies)) {
        const { value, cookieExpiry } = cookies[key];

        if (!cookieExpiry || cookieExpiry > Date.now()) {
          cookieData.push(`${key}=${value}`);
        }
      }

      return cookieData.join("; ");
    },

    set(cookieValue) {
      const [cookieData, ...attributes] = cookieValue
        .replaceAll(" ", "")
        .split(";");
      const [key, value] = cookieData.split("=");

      let cookieExpiry;
      attributes.forEach((attribute) => {
        const [attributeKey, attributeValue] = attribute.split("=");

        if (attributeKey === "max-age") {
          cookieExpiry = Number(attributeValue) * 1000 + Date.now();
        }
      });

      cookies[key] = { value, cookieExpiry };
    },

    configurable: true,
  });
}

// disable myCookie
function uninstall() {
  delete document.myCookie;
}
