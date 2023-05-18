/*

Write a function that accepts an array of URLs and downloads the contents of each URL in parallel, using Promises. 
The function should return an array of strings, where each string is the content of the corresponding URL. 
Use the fetch() API to download the contents of each URL.

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2', 'https://jsonplaceholder.typicode.com/posts/3']; 

downloadURLs(urls).then(contents => console.log(contents)).catch(error => console.error(`Failed to download URLs: ${error}`));

*/

// asked in Rakuten
function downloadURLs(urls) {
  /*
  // the solution that I gave in interview
  return new Promise((resolve, reject) => {
  	const result = [];
  	let tasksCompleted = 0;

  	urls.forEach((url, index) => {
  		fetch(url).then(response => response.json()).then(data => {
  			result[index] = data;
  			tasksCompleted++;

  			if(tasksCompleted === urls.length){
  				resolve(result);
  			}
  		}).catch(reject)
  	})
  })
  */

  // alternate & best solution using Promise.all()
  const asyncFetch = urls.map((url) => fetch(url).then((res) => res.json()));
  return Promise.all(asyncFetch);
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

downloadURLs(urls)
  .then((contents) => console.log(contents))
  .catch((error) => console.error(`Failed to download URLs: ${error}`));
