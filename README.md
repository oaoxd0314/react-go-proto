# Connect-RPC Fullstack Shared Schema Project

這是一個 POC，展示如何使用 Connect-RPC 實作 fullstack 共享 schema 架構。透過 Protocol Buffers 作為單一真實來源 (Single Source of Truth, SSOT)，實現最小的維護成本。

## 專案目的

- **共享 Schema**: 使用 Protocol Buffers 定義 API 介面，前後端共享相同的型別定義
- **型別安全**: 自動生成強型別的客戶端和服務端代碼
- **最小維護成本**: 當 API 變更時，只需修改 `.proto` 文件，自動生成的代碼確保前後端同步
- **現代化技術棧**: 結合 Go 後端、React + TypeScript 前端，以及 TanStack Query 進行狀態管理

## 專案結構

```
rpc-proto/
├── apps/
│   ├── backend-go/     # Go 後端服務
│   ├── frontend-ts/    # React + TypeScript 前端
│   └── proto/          # Protocol Buffers 定義
```

## 安裝需求

### 全域工具

```bash
# 1. 安裝 buf CLI (用於 Protocol Buffers 管理)
brew install bufbuild/buf/buf

# 2. 安裝 Go (後端開發)
brew install go
# 需要 Go 1.21 或更高版本

# 3. 安裝 Node.js (前端開發)
brew install node
# 需要 Node.js 18 或更高版本

# 4. 安裝 pnpm (推薦的 Node.js 套件管理器)
npm install -g pnpm

# 5. 安裝離線 protobuf 插件 (避免 CI/CD rate limiting)
# Go 插件
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest

# TypeScript 插件
pnpm add -g @bufbuild/protoc-gen-es @connectrpc/protoc-gen-connect-query

# 6. 設定 PATH (讓 Go 插件可以被找到)
echo 'export PATH=$PATH:$(go env GOPATH)/bin' >> ~/.zshrc
source ~/.zshrc
```

**檢查安裝:**
```bash
buf --version
go version
node --version
pnpm --version
which protoc-gen-go protoc-gen-connect-go protoc-gen-es protoc-gen-connect-query
```

關於細節的安裝請看各個 project 本身的 readme
- [Backend](./apps/backend-go/README.md)
- [Frontend](./apps/frontend-ts/README.md)
- [Proto](./apps/proto/README.md)

## 快速開始

1. **生成 Protocol Buffers 代碼:**
   ```bash
   cd apps/proto
   buf generate
   ```

2. **啟動後端服務:**
   ```bash
   cd apps/backend-go
   go run main.go
   ```
   服務將在 `http://localhost:8080` 啟動

3. **啟動前端開發服務器:**
   ```bash
   cd apps/frontend-ts
   pnpm dev  # 或 npm run dev
   ```
   前端將在 `http://localhost:5173` 啟動

4. **測試 API:**
   ```bash
   curl --header "Content-Type: application/json" \
        --data '{"id":"123"}' \
        http://localhost:8080/user.v1.UserService/GetUser
   ```

## 開發流程

1. **修改 API 定義**: 編輯 `apps/proto/user.proto`
2. **重新生成代碼**: 在 `apps/proto` 執行 `buf generate`
3. **更新實作**: 根據生成的代碼更新前後端實作
4. **測試**: 確保前後端都能正常運作

## 技術特色

- **Connect-RPC**: 現代化的 RPC 框架，支援 HTTP/1.1、HTTP/2 和 gRPC
- **型別安全**: 從 Protocol Buffers 自動生成強型別代碼
- **CORS 支援**: 後端已配置 CORS，支援跨域請求
- **現代化 UI**: 使用 shadcn/ui 和 Tailwind CSS 構建美觀的使用者介面
- **狀態管理**: 使用 TanStack Query 進行高效的資料獲取和快取

## 範例功能

目前實作了一個簡單的使用者查詢功能：
- 輸入使用者 ID
- 呼叫後端 API 獲取使用者資訊
- 顯示使用者姓名和電子郵件

這個範例展示了完整的資料流：前端 → Connect-RPC → 後端 → 回應 → 前端顯示。

## 離線 vs 線上插件

**目前使用離線插件** (推薦用於 production)：
- ✅ 避免 CI/CD 中的 rate limiting (429 錯誤)
- ✅ 更快的生成速度
- ✅ 不依賴網路連線

**切換到線上插件** (如果需要)：
```bash
cd apps/proto
cp buf.gen.yaml.remote buf.gen.yaml
```

**切換回離線插件：**
```bash
cd apps/proto
git checkout buf.gen.yaml
```

## Reference Document
- [proto go ](https://connectrpc.com/docs/go/getting-started)
- [proto react with tanstack query](https://connectrpc.com/docs/web/query/getting-started/)
- [check the proto tool is available](https://buf.build/explore)
   Note: 
   - 現在我們的 buf 都是依賴線上資源，在 CI 上會很容易遇到 429 (too-many-request)
   - 所以如果真的要在 production 環境下使用的話，我們需要離線版本 （ 裝在每個人的開發幾和 runner ）