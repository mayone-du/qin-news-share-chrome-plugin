(() => {
  const $doc = document;
  $messageButton = $doc.querySelector("#jsMessageButton");
  $messageInput = $doc.querySelector("#jsMessageInput");
  $addNewsButton = $doc.querySelector("#jsAddNewsButton");
  $addNewsInput = $doc.querySelector("#jsAddNewsInput");
  $newsList = $doc.querySelector("#jsNewsList");

  // データ取得の処理
  onload = () => {
    // 子要素が消えるまで削除
    while ($newsList.firstChild) {
      $newsList.removeChild($newsList.firstChild);
    }

    // ニュースのデータを取得
    fetch("http://localhost:8000/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
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
          `,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.data.todayNews.edges.forEach((news) => {
          // 要素自体の生成
          const newElement = $doc.createElement("li");
          newElement.textContent = news.node.title;
          $newsList.appendChild(newElement);
        });
      });
  };

  // newsの追加
  $addNewsButton.addEventListener("click", () => {
    try {
      const newsUrl = $addNewsInput.value;
      const now = new Date().getTime();
      fetch("http://localhost:8000/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreateNews(
              $url: String!
              $createdAt: Int!
              $contributorName: String
              $selectCategoryId: ID
              $tagIds: [ID]
            ) {
              createNews(
                input: {
                  url: $url
                  createdAt: $createdAt
                  contributorName: $contributorName
                  selectCategoryId: $selectCategoryId
                  tagIds: $tagIds
                }
              ) {
                news {
                  title
                  url
                }
              }
            }
          `,
          variables: {
            url: newsUrl,
            createdAt: Math.floor(now / 1000),
            contributorName: $doc.querySelector("#jsNameInput").value,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          title = json.data.createNews.news.title;
          alert(title);
        });
    } catch (error) {
      alert(error);
    }
  });

  // チャット
  $messageButton.addEventListener("click", () => {
    const newMessage = $doc.createElement("p");
    newMessage.textContent = $messageInput.value;
    $newsList.appendChild(newMessage);
  });
})();
