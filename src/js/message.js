(() => {
  const $doc = document;
  $messageButton = $doc.querySelector("#jsMessageButton");
  $messageInput = $doc.querySelector("#jsMessageInput");
  $nameInput = $doc.querySelector("#jsNameInput");
  $newsList = $doc.querySelector("#jsNewsList");

  // チャット
  $messageButton.addEventListener("click", () => {
    if ($messageInput.value === "") return;
    const newMessage = $doc.createElement("p");
    newMessage.textContent = $messageInput.value;
    // newMessage.style.fontSize = "140px";
    // newMessage.style.position = "absolute";
    // newMessage.style.top = "300px";
    $newsList.appendChild(newMessage);

    // backgroundへメッセージを送信
    // chrome.runtime.sendMessage({ text: $messageInput.value }, (response) => {
    //   console.log(response.text);
    // });
    // chrome.tabs.sendMessage(1, { text: "hoddddddddge" }, {}, (response) => {
    //   console.log(response);
    // });
  });
})();
