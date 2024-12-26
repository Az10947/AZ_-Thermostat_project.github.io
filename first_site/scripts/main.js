// script.js

// 全局變量
let currentDevice = 1; // 設定當前選擇的裝置

// 初始化頁面數據
document.addEventListener('DOMContentLoaded', () => {
  fetchDeviceData(); // 頁面加載時自動獲取數據
});

// 切換裝置邏輯
function selectDevice(device) {
  currentDevice = device; // 更新當前裝置
  document.getElementById('device-name').innerText = device; // 更新顯示的裝置名稱
  fetchDeviceData(); // 獲取新裝置的數據
}

// 從 ESP32 獲取數據
function fetchDeviceData() {
  // ESP32 的 API 接口 (將 IP 換成實際 ESP32 地址)
  const apiUrl = `http://192.168.4.1/data?device=${currentDevice}`;

  fetch(apiUrl)
    .then(response => {
      // 檢查回應是否成功
      if (!response.ok) {
        throw new Error('網路回應錯誤: ' + response.statusText);
      }
      return response.json(); // 解析 JSON 格式
    })
    .then(data => {
      // 更新頁面上的數據
      updatePageData(data);
    })
    .catch(error => {
      console.error('獲取數據失敗:', error);
      alert('無法獲取數據，請檢查 ESP32 是否運行並連接網絡。');
    });
}

// 更新頁面上的溫濕度數據
function updatePageData(data) {
  document.getElementById('current-temp').innerText = data.temperature || '--';
  document.getElementById('set-temp').innerText = data.setTemperature || '--';
  document.getElementById('current-humid').innerText = data.humidity || '--';
  document.getElementById('set-humid').innerText = data.setHumidity || '--';
}

// 自動刷新數據 (每 10 秒自動更新)
setInterval(fetchDeviceData, 10000);
