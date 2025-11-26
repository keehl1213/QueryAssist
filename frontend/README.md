# 專案教學文件：QueryAssist 前端專案說明

QueryAssist 是專為解決 物料管理問題 而設計的智能問答助理。前端是使用了 ReactJS 框架進行構建，並使用 Webpack 作為開發與構建工具。前端與後端合作，為用戶提供直覺且高效的查詢互動界面。

前端的開發基於最新的 Node.js 22.8.0，此文件旨在幫助新成員快速了解專案架構以及開發流程。

---

## 目錄架構總覽

我們的專案檔案架構根據功能模組整理，整潔且邏輯清晰，方便維護和擴展：

```
D:\Project\queryassist\frontend
├── dist        # 構建輸出資料夾 (建置後的檔案，會自動生成，請勿手動修改)
│  └── assets   # 靜態資源
├── public      # 公共靜態檔案 (不會經過構建，直接被提供給用戶端)
└── src         # 程式碼的主資料夾
   ├── assets   # 圖片、字型等靜態資源
   │  ├── fonts # 字型檔案
   │  ├── gifs  # 動態圖片（GIFs）
   │  ├── icons # 各種圖示檔案
   │  └── images # 圖片資源
   ├── components # 前端元件 (UI組件)
   │  ├── atoms   # 最基本的單一元件 (Button、Input等)
   │  └── compose # 複合元件，由 atoms 或其他元件構成的較複雜組件
   ├── constants # 專案的常數定義 (如 API 路徑、屬性等)
   ├── hooks     # 自定義 React hooks
   ├── locales   # 多語系相關設定與檔案 (i18n)
   ├── pages     # 頁面模組 (路由對應的程式碼邏輯與視圖)
   │  ├── App      # 主頁面容器
   │  ├── ChatRoom # 聊天室頁面
   │  └── Login    # 登入頁面
   ├── requests  # 對 API 的請求邏輯
   ├── router    # 路由設定檔案
   ├── store     # 儲存應用狀態 (Redux 等管理工具)
   ├── styles    # 全域樣式與樣式設定檔
   ├── types     # TypeScript 型別定義
   └── utils     # 實用工具函式 (Utility functions)
```

---

### 核心資料夾解析

#### 1. **`src/assets`**
放置靜態資源，如字型、圖示、GIF 動圖以及各種圖片。這些資源會在 UI 元件或其他地方被使用。

#### 2. **`src/components`**
我們使用 `Atomic Design` 的理念來組織元件：
- **atoms**：原子級別的元件，負責完成基本的功能，例如按鈕、標籤、輸入框等。
- **compose**：組合元件，可以將原子級元件或其他元件組合成複雜結構，例如導航列、彈跳視窗等。

#### 3. **`src/constants`**
用於管理專案中的共享常數，例如 API URLs、顏色設定或其他常用變數。

#### 4. **`src/hooks`**
存放自定義的 React hooks，這些 hooks 是在專案中可以重複使用的邏輯。

#### 5. **`src/locales`**
存放多語系相關檔案，專案使用 `i18next` 來支援多國語言。在這裡你可以新增語系檔案，用以翻譯 UI。

#### 6. **`src/pages`**
用於組織所有頁面視圖，這邊的每一個資料夾對應一個路由（如首頁、登入頁面等）。

#### 7. **`src/requests`**
專案裡所有的 API 請求的集中化邏輯處理，使用 `axios` 管理 HTTP 請求。

#### 8. **`src/router`**
用來定義前端路由邏輯，例如頁面跳轉、權限驗證、路由懶加載等，使用的是 `react-router-dom`。

#### 9. **`src/store`**
用於集中管理全域應用狀態，根據專案需求你可以選擇 Redux、Context API 或其他狀態管理工具。

#### 10. **`src/styles`**
存放所有全域樣式設定與 CSS 檔案，專案使用 `tailwindcss` 進行樣式管理，並搭配 `styled-components` 用於某些元件的樣式自定義邏輯。

#### 11. **`src/utils`**
存放實用工具函式，例如資料轉換（格式化日期、UUID 生成等）或其他可重用的小工具邏輯。

---

## 編碼規範

我們專案的編碼規範遵從 [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) 的最佳實踐，並進一步調整以符合團隊需求。

1. **基本風格：**
   - 使用 4 個空格進行排版縮排。
   - 使用單引號 `'` 作為字串的包覆符號。
   - 確保每個檔案結尾加入空白換行。

2. **重要規則：**
   - React 開發時須遵守 `eslint-plugin-react-hooks` 的規則以避免 hooks 的誤用。
   - 無需擔心 `eslint` 對於 `@typescript-eslint/no-explicit-any` 的限制，我們已將該規則關閉。
   - 僅在必要時允許使用半形分號 (`semi`)。

3. **Prettier 整合：**
   - 所有的格式化將由 Prettier 接管，涵蓋樣式（如空格、括號等）。
   - 自動處理由 Prettier 接管的換行樣式，適應不同的作業系統。

4. **不要修改建置目錄：**
   - `dist` 資料夾是由構建工具自動生成，開發過程中請勿手動對其進行修改！

---

## 開發工具與版本管理

### 1. **Node.js**
本專案使用 `Node.js 22.8.0` 版本作為運行基礎，請務必在你本機安裝相同或更高版本的 Node.js。

### 2. **依賴管理工具：npm**
我們使用 `npm` 作為包管理工具，執行以下指令即可安裝所有依賴：
```bash
npm install
```

---

## 使用的工具與框架

### 1. **主要技術棧：**
- **React 18.3.1**：作為應用的主要前端框架。
- **TypeScript**：提供型別安全的開發環境。
- **Tailwind CSS**：作為快速開發 CSS 的工具，支援集成式樣式。
- **Ant Design**：用於提供 UI 框架元件。
- **i18next**：負責管理專案的多語系功能。
- **React Router DOM**：負責前端路由管理。

### 2. **常用插件與工具**
- **Axios**：負責 API 請求。
- **Styled-components**：用於針對性地定義元件樣式和邏輯。

---

## 開發命令

專案中可以執行的 `npm scripts` 包含以下幾個：

1. **開發模式**
   ```bash
   npm run dev
   ```
   啟動本地開發伺服器（使用 Vite）。

2. **建置專案**
   ```bash
   npm run build
   ```
   根據 TypeScript 設定轉譯程式碼，並輸出到 `dist` 資料夾。

3. **程式碼檢查與格式化**
   ```bash
   npm run lint
   ```
   使用 ESLint 檢查程式碼並報告任何潛在的問題。

4. **構建完成後預覽**
   ```bash
   npm run preview
   ```
   用於預覽構建後的版本。

---

## 小建議：開發流程

1. 克隆專案
2. 安裝nodejs 22.8.0版本，(如果使用nvm控管，使用`nvm install 22.8.0`後`nvm use 22.8.0`)
3. 執行 `npm install` 安裝依賴。
4. 執行 `npm run dev` 啟動開發環境。
5. 瀏覽 http://localhost:8080 確認是否成功啟動。
