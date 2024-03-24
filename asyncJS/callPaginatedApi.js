/*

Have you ever met some APIs with pagination, and needed to recursively fetch them based on 
response of previous request ?

Suppose we have a `/list` API, which returns an array items.

```javascript
// fetchList is provided for you
const fetchList = (since?: number) => 
  Promise<{items: Array<{id: number}>}>
```

1. for initial request, we just fetch fetchList. and get the last item id from response.
2. for next page, we need to call fetchList(lastItemId).
3. repeat above process.

The `/list` API only gives us 5 items at a time, with server-side filtering, it might be less than 5. 
But if none returned, it means nothing to fetch any more and we should stop.

You are asked to create a function that could return arbitrary amount of items.

```javascript
const fetchListWithAmount = (amount: number = 5) { }
```

note:
You can achieve this by regular loop, even fancier solutions with async iterators or async generators. 
You should try them all.

*****************************************************Solution*************************************************/

// fetchList is provided for you
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

// you can change this to generator function if you want
const fetchListWithAmount = async (amount = 5) => {
  const result = [];

  async function util(id) {
    const { items } = await fetchList(id);

    if (items.length) {
      result.push(...items);
      await util(items[items.length - 1].id);
    }
  }

  await util();
  return result.slice(0, amount);
};
