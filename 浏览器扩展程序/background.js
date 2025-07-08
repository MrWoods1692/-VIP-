// 后台服务，用于处理长时间运行的任务
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'parseVideo') {
    const { url, apiId } = request;
    const encodedUrl = encodeURIComponent(url);
    const parsedUrl = `https://api.svip10.top/?id=${apiId}&url=${encodedUrl}`;
    
    // 在新窗口中打开解析后的链接
    chrome.windows.create({
      url: parsedUrl,
      type: 'popup',
      width: 1200,
      height: 700,
      left: 100,
      top: 100
    });
  }
});

// 图标点击事件
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getCurrentVideoUrl
  });
});

function getCurrentVideoUrl() {
  // 在实际应用中，这里可以包含检测视频URL的逻辑
  return window.location.href;
}