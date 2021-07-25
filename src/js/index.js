(() => {
  const $doc = document;
  $addNewsButton = $doc.querySelector("#jsAddNewsButton");
  $addNewsInput = $doc.querySelector("#jsAddNewsInput");
  $nameInput = $doc.querySelector("#jsNameInput");
  $newsList = $doc.querySelector("#jsNewsList");

  // popupページが読み込まれたら取得して表示 ページのDOMではないので注意
  window.onload = () => {
    // 今日のニュースを表示する処理
    // 子要素が消えるまで削除
    while ($newsList.firstChild) {
      $newsList.removeChild($newsList.firstChild);
    }

    // ニュースのデータを取得
    fetch("https://news-share-backend.herokuapp.com/graphql/", {
      // fetch("http://localhost:8000/graphql/", {
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
                    summary
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
        // ニュースのカウントを表示
        newListElement.innerHTML = htmlString;
        $newsList.appendChild(newListElement);
        const newsCount = $newsList.querySelectorAll("li").length.toString();
        // backgroundへニュースの数を送信
        chrome.runtime.sendMessage({ newsCount: newsCount }, (response) => {
          // 受け取ったレスポンスをcontentへ送信
          console.log(response);
          //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          //     chrome.tabs.sendMessage(
          //       tabs[0].id,
          //       JSON.stringify({ contents: response.newsCount }),
          //       (response) => {}
          //     );
          //   });
        });

        // ニュースがまだない場合
        if (json.data.todayNews.edges.length === 0) {
          const newListElement = $doc.createElement("div");
          const htmlString = `
            今日のニュースはまだありません。
                    `;
          return;
        }
        json.data.todayNews.edges.forEach((news) => {
          // 要素自体の生成
          const newListElement = $doc.createElement("li");
          const htmlString = `
            <a href="${news.node.url}" rel="noopener noreferrer" target="_blank">
              <span>
                ${news.node.title}
              </span>
              <br />
              <span style="color: gray;">
                ${news.node.summary}
              </span>
            </a>
          `;
          newListElement.innerHTML = htmlString;
          $newsList.appendChild(newListElement);
        });
      });
  };

  // newsの追加
  $addNewsButton.addEventListener("click", () => {
    try {
      const newsUrl = $addNewsInput.value;
      // URLのチェック
      if (
        newsUrl === "" ||
        !newsUrl.includes("http") ||
        !newsUrl.includes("https")
      ) {
        return;
      }
      const now = new Date().getTime();
      fetch("https://news-share-backend.herokuapp.com/graphql/", {
        // fetch("http://localhost:8000/graphql/", {
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
                  summary
                }
              }
            }
          `,
          variables: {
            url: newsUrl,
            createdAt: Math.floor(now / 1000),
            contributorName: $nameInput.value,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          // 要素自体の生成
          console.log(json);
          const news = json.data.createNews.news;
          // 要素自体の生成
          const newListElement = $doc.createElement("li");
          const htmlString = `,
            <a href="${news.url}" rel="noopener noreferrer" target="_blank">
              <span>
                ${news.title}
              </span>
              <span style="color: gray;">
                ${news.summary}
              </span>
            </a>
          `;
          newLitEslement.innerHTML = htmlString;
          $newsList.appendChild(newListElement);
          $addNewsInput.value = "";
        });
    } catch (error) {
      alert(error);
    }
  });
})();
