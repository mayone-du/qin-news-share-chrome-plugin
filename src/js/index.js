(() => {
  const $doc = document;
  $messageButton = $doc.querySelector("#jsMessageButton");
  $messageInput = $doc.querySelector("#jsMessageInput");
  $addNewsButton = $doc.querySelector("#jsAddNewsButton");
  $addNewsInput = $doc.querySelector("#jsAddNewsInput");
  $nameInput = $doc.querySelector("#jsNameInput");
  $newsList = $doc.querySelector("#jsNewsList");

  // ページが読み込まれたら取得して表示
  window.onload = () => {
    // 今日のニュースを表示する処理
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
          const newListElement = $doc.createElement("li");
          const newLinkElement = $doc.createElement("a");
          newLinkElement.textContent = news.node.title;
          newLinkElement.setAttribute("href", news.node.url);
          newLinkElement.setAttribute("target", "_blank");
          newLinkElement.setAttribute("rel", "noopener noreferrer");
          newListElement.appendChild(newLinkElement);
          $newsList.appendChild(newListElement);
        });
      });
  };

  // newsの追加
  $addNewsButton.addEventListener("click", () => {
    try {
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
            url: $addNewsInput.value,
            createdAt: Math.floor(now / 1000),
            contributorName: $nameInput.value,
          },
        }),
      })
        .then((response) => {
          $addNewsInput.value = "";
          return response.json();
        })
        .then((json) => {
          // 要素自体の生成
          console.log(json);
          const news = json.data.createNews.news;
          const newListElement = $doc.createElement("li");
          const newLinkElement = $doc.createElement("a");
          newLinkElement.textContent = news.title;
          newLinkElement.setAttribute("href", news.url);
          newLinkElement.setAttribute("target", "_blank");
          newLinkElement.setAttribute("rel", "noopener noreferrer");
          newListElement.appendChild(newLinkElement);
          $newsList.appendChild(newListElement);
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
