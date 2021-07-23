(() => {

  const $doc = document;
  $doc.querySelector("#button").addEventListener('click', () => {
    fetch('http://localhost:8000/graphql/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query:
          `
            query GetTodayNews {
              todayNews {
                edges {
                  node {
                    title
                    url
                  }
                }
              }
            }
          `
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      json.data.todayNews.edges.map((news) => {
        console.log(news);
      })
    })
  })
})()