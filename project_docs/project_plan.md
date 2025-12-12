# Personal Finance App Project Plan

## 專案目標
建立一個簡單且功能完善的個人理財追蹤應用程式，幫助使用者記錄日常收支並查看財務狀況。

## 目前進度
- [x] **後端 (Backend)**
    - 使用 Python FastAPI 建立 REST APIs
    - 實作 CRUD (新增、讀取、刪除) 交易記錄
    - 計算每週財務報告 (總收入、總支出、淨餘額)
    - 使用 SQLite 資料庫儲存資料
- [x] **前端 (Frontend)**
    - 使用 React + Vite 建立現代化介面
    - 使用 Tailwind CSS 進行樣式設計 (響應式設計)
    - 交易列表顯示與刪除功能
    - 交易表單 (新增收入/支出)
    - 每週財務報告摘要卡片
- [x] **近期新增功能**
    - [x] 多語系支援 (英文 / 繁體中文)
    - [x] 深色/淺色主題支援 (Dark/Light Mode)

## 待辦事項 (To-Do List)

### 階段一：功能優化
- [ ] **資料視覺化**: 新增圖表 (如圓餅圖、長條圖) 顯示收支分佈
- [ ] **編輯功能**: 允許使用者編輯已新增的交易
- [ ] **分類管理**: 允許使用者自訂交易類別 (目前為手動輸入)
- [ ] **搜尋與篩選**: 依日期、類別或金額篩選交易

### 階段二：進階功能
- [ ] **使用者認證**: 登入/註冊功能 (JWT Authentication)
- [ ] **多帳戶支援**: 支援不同帳戶 (現金、信用卡、銀行帳戶)
- [ ] **預算設定**: 設定每月預算並在超支時提醒

### 階段三：部署與維運
- [ ] **Docker 化**: 建立 Dockerfile 與 docker-compose.yml
- [ ] **部署**: 部署至雲端平台 (如 Render, Railway, AWS)

## 技術堆疊
- **Frontend**: React, Vite, Tailwind CSS, i18next, Axios
- **Backend**: Python, FastAPI, SQLAlchemy, Pydantic
- **Database**: SQLite
