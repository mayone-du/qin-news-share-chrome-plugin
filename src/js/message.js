(() => {
  const $doc = document;
  $messageButton = $doc.querySelector("#jsMessageButton");
  $messageInput = $doc.querySelector("#jsMessageInput");
  $nameInput = $doc.querySelector("#jsNameInput");
  $newsList = $doc.querySelector("#jsNewsList");

  // チャット
  $messageButton.addEventListener("click", () => {
    if ($messageInput.value === "") return;
    // const newMessage = $doc.createElement("p");
    // newMessage.textContent = $messageInput.value;
    // newMessage.style.fontSize = "140px";
    // $newsList.appendChild(newMessage);

    // contentsへ送信
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     JSON.stringify({ contents: $messageInput.value }),
    //     (response) => {}
    //   );
    // });
    alert($messageInput.value);
  });
})();
