/*

Aggregate the data from a paginated API(https://interview-api.jazeee.com/data/articles/page-1.json) and 
return the top articles based on the likes and number of comments.

*/

const fetchData = async () => {
  let allData = [],
    apiUrl = "https://interview-api.jazeee.com/data/articles/page-1.json",
    loadMoreData = true;

  while (loadMoreData) {
    const response = await fetch(apiUrl);
    const { metadata, articles } = await response.json();

    if (metadata.nextPage) {
      apiUrl = metadata.nextPage;
    } else {
      loadMoreData = false;
    }

    allData = allData.concat(articles);
  }

  return allData;
};

const aggregateData = async (k = 3) => {
  const articles = await fetchData();

  const sortedArticles = articles.sort((a, b) => {
    const aCount = (a?.likes ?? 0) + (a?.comments?.length ?? 0);
    const bCount = (b?.likes ?? 0) + (b?.comments?.length ?? 0);

    return bCount - aCount;
  });

  console.log(sortedArticles.slice(0, k));
};

aggregateData(2);
