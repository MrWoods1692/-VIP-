// 安全控制模块
const SecurityManager = {
    currentValidURL: '',
    baseURL: 'https://api.svip10.top/',
    currentAPI: { id: 2, name: '极速路线' },
  
    setAPI: (id, name) => {
      SecurityManager.currentAPI = { id, name };
      document.querySelector('.api-name').textContent = name;
      document.querySelector('.api-id').textContent = `ID:${id}`;
    },
  
    sanitize: (url) => {
      try {
        const apiId = SecurityManager.currentAPI.id;
        const encodedUrl = encodeURIComponent(url)
          .replace(/[!'()*]/g, escape)
          .replace(/%20/g, '+');
        
        return `${SecurityManager.baseURL}?id=${apiId}&url=${encodedUrl}`;
      } catch {
        return null;
      }
    }
  };
  
  // 获取当前标签页URL
  function getCurrentTabUrl() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const url = tabs[0]?.url || '';
      document.getElementById('video-url').value = url;
    });
  }
  
  // 显示消息
  function showMessage(message, type = 'success') {
    const messageEl = document.getElementById('success-message');
    const textEl = document.getElementById('message-text');
    
    textEl.textContent = message;
    messageEl.className = `status status-${type}`;
    messageEl.style.display = 'flex';
    
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3000);
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    // 获取当前标签页URL
    getCurrentTabUrl();
    
    // API选择器事件
    document.getElementById('api-selector').addEventListener('click', () => {
      document.getElementById('api-modal').classList.add('active');
    });
    
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('api-modal').classList.remove('active');
    });
    
    document.getElementById('confirm-api').addEventListener('click', () => {
      const selectedOption = document.querySelector('.api-option.selected');
      if (selectedOption) {
        const apiId = selectedOption.dataset.apiId;
        const apiName = selectedOption.dataset.apiName;
        SecurityManager.setAPI(apiId, apiName);
        document.getElementById('api-modal').classList.remove('active');
        showMessage(`已切换到: ${apiName} (ID:${apiId})`);
      }
    });
    
    // API选项点击事件
    document.querySelectorAll('.api-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.api-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        option.classList.add('selected');
      });
    });
    
    // 按钮事件
    document.getElementById('parse-btn').addEventListener('click', () => {
      const input = document.getElementById('video-url').value.trim();
      if (!input) {
        showMessage('未获取到有效链接', 'info');
        return;
      }
      
      const safeURL = SecurityManager.sanitize(input);
      if (!safeURL) {
        showMessage('链接包含非法字符', 'info');
        return;
      }
      
      // 发送消息到后台进行解析
      chrome.runtime.sendMessage({
        action: 'parseVideo',
        url: input,
        apiId: SecurityManager.currentAPI.id
      }, (response) => {
        if (response && response.success) {
          showMessage('正在新窗口打开解析内容...');
        } else {
          showMessage('解析失败，请重试', 'info');
        }
      });
    });
    
    document.getElementById('refresh-btn').addEventListener('click', () => {
      getCurrentTabUrl();
      showMessage('已刷新当前页面URL');
    });
    
    document.getElementById('copy-btn').addEventListener('click', () => {
      const input = document.getElementById('video-url');
      input.select();
      document.execCommand('copy');
      showMessage('已复制URL到剪贴板');
    });
    
    document.getElementById('settings-btn').addEventListener('click', () => {
      showMessage('设置功能开发中...', 'info');
    });
  });