# 專案教學文件：QueryAssist 後端專案說明

QueryAssist 是一個專為處理物料管理情境而設計的問答輔助系統，旨在簡化物料相關問題的查詢流程。
系統的回答邏輯與資料處理由後端的多代理（multi-agent）模型負責，透過結合智能化的推理模組與彙整邏輯，提供高效且一致的問題解析與回應。

後端採用強大且模組化的 NestJS 框架進行開發，並基於最新的 Node.js 22.8.0。這份教學文件將幫助新入團隊的夥伴快速了解專案的架構、技術以及開發方式。

---

## 總覽：目錄架構與功能

專案的檔案架構清晰有條理，透過功能模組進行分層設計，分為 `src`（原始檔）、`public`（公共靜態資源）、`dist`（輸出）與測試相關的檔案。以下是目錄結構的簡單介紹：

```
D:\Project\queryassist\server
├── dist        # 編譯輸出目錄 (建置完成後的程式碼)
├── public      # 靜態資料或公開範本 (分享給其他服務或外部客戶端)
├── src         # 核心原始碼
├── test        # 各種測試檔案 (單元測試、端對端測試)
```

---

### 核心資料夾解析

#### `src`

`src` 是專案的核心資料夾，程式運行的所有邏輯都在這裡完成。我們針對功能模組進行劃分，採取了**按領域劃分**的方式。以下是次目錄的解釋：

```
├── src
|   ├── account       # 與帳戶相關的功能邏輯 (用戶認證、帳戶資料)
|   │   ├── dto       # 資料傳輸物件，負責處理輸入或輸出資料的格式
|   │   └── entities  # 與資料庫的資料模型映射 (ORM Entity)
|   ├── agent         # 代理相關功能，例如代理權限管理
|   │   └── dto       # 資料傳輸物件
|   ├── azure         # 與 Microsoft Azure 相關的功能 (OAuth、儲存等)
|   │   ├── dto       # 資料傳輸物件
|   │   └── entities  # Azure 功能相關的 ORM 物件
|   ├── config        # 全域設置與設定檔 (環境變數、應用配置等)
|   ├── constant      # 全域常數檔案，避免硬編碼 (API 路徑、狀態碼等)
|   ├── database      # 資料庫連線配置與初始化 (TypeORM 為核心)
|   ├── supply-source    # 特定功能模組
|   │   └── dto       # 特定功能的資料轉換規範
|   ├── filters       # 全域例外處理 (Exception 錯誤處理)
|   ├── middlewares   # 全域與路由級別的中介層 (例如驗證請求、日誌等)
|   ├── redis         # 快取相關功能 (Redis 驗證與連線邏輯)
|   └── utils         # 通用工具函式庫 (加密、格式化工具、輔助函數)
```

#### `public`

`public` 資料夾用於**存放靜態亂數產物或測試用範例檔案**，在開發環境中可能會被用於**快速共享資料**。

#### `dist`

`dist` 資料夾是產生的構建檔案，位於根目錄。不要直接觸碰或修改，因為它是 Build 指令的輸出產物。

---

## 專案技術棧與工具

本專案使用以下技術框架與工具，請確認你對應的開發環境。

### 核心框架

1. **NestJS**：
   - 使用模組化的模式管理程式邏輯，並結合 TypeScript 提供型別安全。
   - 透過引入 TypeORM 來支援基於資料庫的 ORM 設計。

2. **TypeORM**：
   - 對應資料庫的操作層，負責實現資料表的 ORM 物件映射和遷移。

3. **Redis**：
   - 用於快取數據 (Session、Token 快取操作)。

4. **Swagger**：
   - API 文件生成與測試工具，幫助我們更好地記錄和測試 API。

---

## 編碼規範

我們透過 **ESLint** 和 **Prettier** 來管理與校驗程式碼風格，並且已設置相關規範在專案中自動執行。

### 專案規範

1. 所有檔案使用 **4 個空格**縮排，字符集為 UTF-8。
2. **單引號** 用於包裹字串，避免使用雙引號。
3. 所有檔案的末尾必須有新行。
4. 沒有狀況時，不使用 `any` 型別 (但允許特定例外場景)。
5. `@typescript-eslint/no-unused-vars` 被部分啟用，警告未使用的變數。

我們已預設好 `.editorconfig` 配置，保存檔案時你的編輯器會自動對齊專案規範。

---

## 常用命令

在開發過程中，你需要使用以下指令來進行常見操作：

### 1. 運行專案

本地開發時，啟動專案使用：

```bash
npm run start:dev
```

這會啟用 **開發模式熱更新**，對程式碼所做的任何修改都會即時生效。

### 2. 編譯與建置

構建專案為產品準備：

```bash
npm run build
```

這會將程式轉譯到 `dist` 資料夾中，專案在生產環境中將執行此建置版本。

### 3. 格式化程式碼

格式化專案程式碼（由 Prettier 處理）：

```bash
npm run format
```

### 4. 檢查程式碼風格

執行 ESLint 來檢查程式碼是否符合設定好的規範：

```bash
npm run lint
```

### 5. 執行測試

測試是開發過程中必不可少的一步，我們使用 jest 進行測試，常見測試指令如下：

```bash
# 運行所有測試
npm run test

# 持續監視測試代碼變更
npm run test:watch

# 生成測試覆蓋率報告
npm run test:cov

# 執行端對端測試
npm run test:e2e
```

### 6. TypeORM 資料庫操作

如果需要對資料庫進行遷移，相關命令如下：

```bash
# 運行最新的資料庫遷移
npm run migration:up

# 回滾最近的一次資料庫遷移
npm run migration:down

# 生成資料庫遷移檔案
npm run migration:generate
```

---

## 特殊功能說明

### 1. **資料庫**

我們使用 `PostgreSQL` 作為主要的資料庫管理系統，藉助 TypeORM 來實現資料表的管理與操作。`src/database/data-source.ts` 是主要的資料庫連線配置檔案。

### 2. **資料傳輸物件 (DTO)**

資料傳輸物件 `DTO (Data Transfer Object)` 用於定義我們的 API 輸入/輸出的資料結構，放在對應的 `dto` 資料夾中。

範例如下：

```typescript
// src/account/dto/user.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
```

我們使用 `class-validator` 來驗證資料結構，並使用 `class-transformer` 進行轉換。

### 3. **快取**

為了提升性能，我們使用 Redis 快取部分重複的操作，例如 Session、Token 或資料快取操作 (`src/redis` 內處理邏輯)。

### 4. **Swagger 文件**

專案使用 Swagger 為 API 自動生成文件，你可以透過以下路徑打開：

```
http://localhost:<port>/api-docs
```

Swagger 會顯示你所有的 API 路徑及其輸入/輸出規範。
