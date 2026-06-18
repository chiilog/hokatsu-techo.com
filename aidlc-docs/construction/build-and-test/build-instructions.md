# ビルド手順書

## 前提条件
- **Node.js**: v20以上
- **パッケージマネージャ**: npm
- **OS**: macOS / Linux / Windows (WSL推奨)

## 環境変数

`.env.local` を作成し、以下を設定（任意）:

```bash
# Google Analytics（未設定の場合はGA無効）
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity（未設定の場合はClarity無効）
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
```

## ビルド手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Linter/Formatter チェック

```bash
npm run check
```

### 3. プロダクションビルド

```bash
npm run build
```

### 4. ビルド成功の確認

以下のルートが出力されていれば成功:

```
Route (app)
├ ○ /
├ ○ /_not-found
├ ○ /add
├ ○ /manifest.webmanifest
└ ƒ /nursery/[id]
```

### 5. ローカルでの動作確認

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス。

## ビルド成果物

| 成果物 | 場所 |
|--------|------|
| プロダクションビルド | `.next/` |
| マニフェスト | `/manifest.webmanifest`（自動生成） |

## トラブルシューティング

### 依存関係エラー

```bash
rm -rf node_modules package-lock.json && npm install
```

### TypeScript型エラー

```bash
npx tsc --noEmit
```
で型チェックを実行し、エラー箇所を特定。
