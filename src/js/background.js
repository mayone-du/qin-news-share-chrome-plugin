// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   sendResponse({ text: request.text });
// });

// 拡張機能のアイコンをクリックしたときに実行される
chrome.browserAction.onClicked.addListener((tab) => {
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ["js/content.js"],
  // });
  return alert("hgoeeeeeeeeee");
});
// chrome.browserAction.setBadgeText({ text: "1" });
// chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 100] });
