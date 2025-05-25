# setup
進入 `apps/proto` 目錄：

```bash
cd apps/proto
```

**需求:**
- buf CLI (已在全域工具中安裝)

**離線插件安裝 (推薦用於 CI/CD):**
```bash
# Go 插件
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install connectrpc.com/connect/cmd/protoc-gen-connect-go@latest

# TypeScript 插件
pnpm add -g @bufbuild/protoc-gen-es @connectrpc/protoc-gen-connect-query
```

**生成代碼:**
```bash
# 生成 Go 和 TypeScript 代碼
buf generate
```

**注意:**
- 目前使用離線版本避免 CI/CD 中的 rate limiting 問題
- 如需使用線上版本，可參考 `buf.gen.yaml.remote` 範例