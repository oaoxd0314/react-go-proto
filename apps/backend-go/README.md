# Setup
進入 `apps/backend-go` 目錄：

```bash
cd apps/backend-go
```

**需求:**
- Go 1.21 或更高版本
- 自動安裝的依賴包括：
  - `connectrpc.com/connect` - Connect-RPC 核心庫
  - `golang.org/x/net/http2` - HTTP/2 支援
  - 自動生成的 protobuf 代碼

**安裝:**
```bash
go mod download
```