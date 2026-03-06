# コード生成プラン - 保活手帳 v1 SLC

## ユニット情報
- **ユニット名**: hokatsu-techo（単一ユニット）
- **プロジェクトタイプ**: Greenfield（Next.js App Router）
- **ワークスペースルート**: /Users/chiilog/Develop/hokatsu-techo.com
- **コード出力先**: ワークスペースルート直下（aidlc-docs/には配置しない）

## 対象ストーリー
US-01〜US-13（全13ストーリー）

## 生成ステップ

### Step 1: プロジェクト初期化・設定ファイル
- [x] Next.js プロジェクト作成（`package.json`, `tsconfig.json`, `next.config.ts`）
- [x] Tailwind CSS v4 設定（`postcss.config.mjs`、CSS内で `@import "tailwindcss"` を使用）
- [x] shadcn/ui 初期化（`components.json`）
- [x] Vitest + Testing Library 設定（`vitest.config.ts`, `vitest.setup.ts`）
- [x] Biome 設定（`biome.json` — Linter + Formatter）
- [x] lefthook 設定（`lefthook.yml` — pre-commit で Biome チェック実行）
- [x] `.gitignore` 更新
- [x] PWA設定（`next.config.ts` にPWAプラグイン追加、`public/manifest.json`）

### Step 2: 共通レイアウト・グローバルスタイル
- [x] `app/layout.tsx` — ルートレイアウト（メタデータ、フォント、グローバルCSS）
- [x] `app/globals.css` — Tailwind ディレクティブ + カスタムスタイル
- [x] `components/layout/Header.tsx` — ヘッダー（タイトル + ヘルプ[?]アイコン）
- [x] **ストーリーカバレッジ**: US-13（ヘルプアイコン配置）

### Step 3: shadcn/ui コンポーネント導入
- [x] Button, Dialog, AlertDialog, Input, Textarea, Label, Card コンポーネント
- [x] `lib/utils.ts`（shadcn/ui ユーティリティ）

### Step 4: データモデル・Zustand Store
- [x] `types/nursery.ts` — Nursery, AppState 型定義
- [x] `stores/nurseryStore.ts` — Zustand store（CRUD + persist middleware）
- [x] `services/storageService.ts` — スキーママイグレーション + カスタムストレージ
- [x] **ストーリーカバレッジ**: 全ストーリーの基盤

### Step 5: データモデル・Store のテスト
- [x] `stores/nurseryStore.test.ts` — store操作のテスト（追加、更新、削除、フラグ管理）
- [x] `services/storageService.test.ts` — マイグレーション・永続化のテスト

### Step 6: オンボーディング
- [x] `components/onboarding/OnboardingDialog.tsx` — 初回オンボーディング画面
- [x] `components/onboarding/OnboardingDialog.test.tsx` — テスト
- [x] **ストーリーカバレッジ**: US-03（アプリの使い方を知る）、US-13（アプリ説明の再確認）

### Step 7: 園一覧ページ（ホーム）
- [x] `components/nursery/NurseryCard.tsx` — 園カード
- [x] `components/nursery/NurseryList.tsx` — カードリスト + 空状態
- [x] `components/layout/EmptyState.tsx` — 空状態メッセージ + 園追加導線
- [x] `app/page.tsx` — 園一覧ページ（オンボーディング + ヘルプ統合）
- [x] **ストーリーカバレッジ**: US-10（園一覧を見返す）、US-11（メモプレビュー）、US-03, US-13

### Step 8: 園一覧ページのテスト
- [x] `components/nursery/NurseryCard.test.tsx`
- [x] `components/nursery/NurseryList.test.tsx`

### Step 9: 園追加ページ
- [x] `components/nursery/NurseryForm.tsx` — 園追加フォーム（園名 + 見学日 + バリデーション）
- [x] `app/add/page.tsx` — 園追加ページ
- [x] **ストーリーカバレッジ**: US-01（園を追加する）、US-02（見学日を設定する）

### Step 10: 園追加ページのテスト
- [x] `components/nursery/NurseryForm.test.tsx`

### Step 11: 園詳細ページ
- [x] `components/nursery/NurseryDetail.tsx` — インライン編集UI（園名、見学日、メモ）
- [x] `components/nursery/DeleteNurseryDialog.tsx` — 削除確認ダイアログ
- [x] `components/nursery/VisitTipsDialog.tsx` — 見学のコツダイアログ
- [x] `app/nursery/[id]/page.tsx` — 園詳細ページ
- [x] **ストーリーカバレッジ**: US-04, US-05, US-06, US-07, US-08, US-09, US-11, US-12

### Step 12: 園詳細ページのテスト
- [x] `components/nursery/NurseryDetail.test.tsx`
- [x] `components/nursery/DeleteNurseryDialog.test.tsx`
- [x] `components/nursery/VisitTipsDialog.test.tsx`

### Step 13: アナリティクス・Cookie同意
- [x] `services/analyticsService.ts` — Clarity 初期化
- [x] `services/analyticsService.test.ts` — テスト
- [x] `hooks/useCookieConsent.ts` — Cookie同意管理フック
- [x] `components/common/CookieConsent.tsx` — Cookie同意バナー
- [x] `components/common/CookieConsent.test.tsx`
- [x] **ストーリーカバレッジ**: NFR-04（アナリティクス）

### Step 14: セキュリティヘッダー・エラーハンドリング
- [x] `middleware.ts` — HTTPセキュリティヘッダー（HSTS, X-Content-Type-Options等）
- [x] `app/not-found.tsx` — 404ページ
- [x] `app/error.tsx` — グローバルエラーハンドラー（汎用エラーメッセージ表示）
- [x] **ストーリーカバレッジ**: SECURITY-04, SECURITY-09, SECURITY-15

### Step 15: PWA アセット
- [x] `public/manifest.json` — Web App Manifest
- [x] `public/icons/` — アプリアイコン（プレースホルダー .gitkeep）
- [x] `next.config.ts` — @ducanh2912/next-pwa プラグイン設定
- [x] **ストーリーカバレッジ**: NFR-03（PWA）

### Step 16: コード生成サマリー
- [x] `aidlc-docs/construction/hokatsu-techo/code/code-summary.md` — 生成ファイル一覧、ストーリーマッピング

---

## ストーリートレーサビリティ

| ストーリー | 実装ステップ | 状態 |
|-----------|-------------|------|
| US-01: 園を追加する | Step 4, 9 | [x] |
| US-02: 見学日を設定する | Step 4, 9 | [x] |
| US-03: アプリの使い方を知る | Step 6, 7 | [x] |
| US-04: メモを書く | Step 4, 11 | [x] |
| US-05: 見学のコツを知る | Step 11 | [x] |
| US-06: メモを編集する | Step 11 | [x] |
| US-07: 園名を編集する | Step 11 | [x] |
| US-08: 見学日を変更する | Step 11 | [x] |
| US-09: 園を削除する | Step 11 | [x] |
| US-10: 園一覧を見返す | Step 7 | [x] |
| US-11: メモを読んで思い出す | Step 7, 11 | [x] |
| US-12: 見学のコツを再確認する | Step 11 | [x] |
| US-13: アプリ説明を再確認する | Step 2, 6, 7 | [x] |

---

## ディレクトリ構成（生成後の想定）

```
hokatsu-techo.com/
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
    error.tsx
    add/
      page.tsx
    nursery/
      [id]/
        page.tsx
  components/
    layout/
      Header.tsx
      EmptyState.tsx
    nursery/
      NurseryCard.tsx
      NurseryCard.test.tsx
      NurseryList.tsx
      NurseryList.test.tsx
      NurseryForm.tsx
      NurseryForm.test.tsx
      NurseryDetail.tsx
      NurseryDetail.test.tsx
      DeleteNurseryDialog.tsx
      DeleteNurseryDialog.test.tsx
      VisitTipsDialog.tsx
      VisitTipsDialog.test.tsx
    onboarding/
      OnboardingDialog.tsx
      OnboardingDialog.test.tsx
    common/
      CookieConsent.tsx
      CookieConsent.test.tsx
    ui/          (shadcn/ui自動生成)
  stores/
    nurseryStore.ts
    nurseryStore.test.ts
  services/
    storageService.ts
    storageService.test.ts
    analyticsService.ts
    analyticsService.test.ts
  hooks/
    useCookieConsent.ts
  types/
    nursery.ts
  lib/
    utils.ts
    formatDate.ts
  middleware.ts
  public/
    manifest.json
    icons/
  package.json
  tsconfig.json
  next.config.ts
  postcss.config.mjs
  vitest.config.ts
  vitest.setup.ts
  biome.json
  lefthook.yml
  components.json
```
