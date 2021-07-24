// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   document.body.innerHTML = request.text;
//   document.body.style.backgroundColor = "blue";
//   sendResponse({ text: request.text });
// });

window.onload = () => {
  alert("hoge");

  document.body.style.backgroundColor = "blue";
};
