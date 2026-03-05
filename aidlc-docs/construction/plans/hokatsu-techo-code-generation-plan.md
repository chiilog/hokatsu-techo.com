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
- [ ] Next.js プロジェクト作成（`package.json`, `tsconfig.json`, `next.config.ts`）
- [ ] Tailwind CSS 設定（`tailwind.config.ts`, `postcss.config.mjs`）
- [ ] shadcn/ui 初期化（`components.json`）
- [ ] Vitest + Testing Library 設定（`vitest.config.ts`, `vitest.setup.ts`）
- [ ] ESLint 設定（`eslint.config.mjs`）
- [ ] `.gitignore` 更新
- [ ] PWA設定（`next.config.ts` にPWAプラグイン追加、`public/manifest.json`）

### Step 2: 共通レイアウト・グローバルスタイル
- [ ] `app/layout.tsx` — ルートレイアウト（メタデータ、フォント、グローバルCSS）
- [ ] `app/globals.css` — Tailwind ディレクティブ + カスタムスタイル
- [ ] `components/layout/Header.tsx` — ヘッダー（タイトル + ヘルプ[?]アイコン）
- [ ] **ストーリーカバレッジ**: US-13（ヘルプアイコン配置）

### Step 3: shadcn/ui コンポーネント導入
- [ ] Button, Dialog, AlertDialog, Input, Textarea, Label, Card コンポーネント
- [ ] `lib/utils.ts`（shadcn/ui ユーティリティ）

### Step 4: データモデル・Zustand Store
- [ ] `types/nursery.ts` — Nursery, AppState 型定義
- [ ] `stores/nurseryStore.ts` — Zustand store（CRUD + persist middleware）
- [ ] `services/storageService.ts` — スキーママイグレーション + カスタムストレージ
- [ ] **ストーリーカバレッジ**: 全ストーリーの基盤

### Step 5: データモデル・Store のテスト
- [ ] `stores/__tests__/nurseryStore.test.ts` — store操作のテスト（追加、更新、削除、フラグ管理）
- [ ] `services/__tests__/storageService.test.ts` — マイグレーション・永続化のテスト

### Step 6: オンボーディング
- [ ] `components/onboarding/OnboardingDialog.tsx` — 初回オンボーディング画面
- [ ] `components/onboarding/__tests__/OnboardingDialog.test.tsx` — テスト
- [ ] **ストーリーカバレッジ**: US-03（アプリの使い方を知る）、US-13（アプリ説明の再確認）

### Step 7: 園一覧ページ（ホーム）
- [ ] `components/nursery/NurseryCard.tsx` — 園カード
- [ ] `components/nursery/NurseryList.tsx` — カードリスト + 空状態
- [ ] `components/layout/EmptyState.tsx` — 空状態メッセージ
- [ ] `app/page.tsx` — 園一覧ページ（オンボーディング + ヘルプ統合）
- [ ] **ストーリーカバレッジ**: US-10（園一覧を見返す）、US-11（メモプレビュー）、US-03, US-13

### Step 8: 園一覧ページのテスト
- [ ] `components/nursery/__tests__/NurseryCard.test.tsx`
- [ ] `components/nursery/__tests__/NurseryList.test.tsx`
- [ ] `app/__tests__/page.test.tsx` — 園一覧ページのテスト

### Step 9: 園追加ページ
- [ ] `components/nursery/NurseryForm.tsx` — 園追加フォーム（園名 + 見学日 + バリデーション）
- [ ] `app/add/page.tsx` — 園追加ページ
- [ ] **ストーリーカバレッジ**: US-01（園を追加する）、US-02（見学日を設定する）

### Step 10: 園追加ページのテスト
- [ ] `components/nursery/__tests__/NurseryForm.test.tsx`
- [ ] `app/add/__tests__/page.test.tsx`

### Step 11: 園詳細ページ
- [ ] `components/nursery/NurseryDetail.tsx` — インライン編集UI（園名、見学日、メモ）
- [ ] `components/nursery/DeleteNurseryDialog.tsx` — 削除確認ダイアログ
- [ ] `components/nursery/VisitTipsDialog.tsx` — 見学のコツダイアログ
- [ ] `app/nursery/[id]/page.tsx` — 園詳細ページ
- [ ] **ストーリーカバレッジ**: US-04, US-05, US-06, US-07, US-08, US-09, US-11, US-12

### Step 12: 園詳細ページのテスト
- [ ] `components/nursery/__tests__/NurseryDetail.test.tsx`
- [ ] `components/nursery/__tests__/DeleteNurseryDialog.test.tsx`
- [ ] `components/nursery/__tests__/VisitTipsDialog.test.tsx`
- [ ] `app/nursery/[id]/__tests__/page.test.tsx`

### Step 13: アナリティクス・Cookie同意
- [ ] `services/analyticsService.ts` — GA4 + Clarity 初期化・イベント送信
- [ ] `hooks/useCookieConsent.ts` — Cookie同意管理フック
- [ ] `components/common/CookieConsent.tsx` — Cookie同意バナー
- [ ] `components/common/__tests__/CookieConsent.test.tsx`
- [ ] **ストーリーカバレッジ**: NFR-04（アナリティクス）

### Step 14: セキュリティヘッダー・エラーハンドリング
- [ ] `middleware.ts` — HTTPセキュリティヘッダー（CSP, HSTS, X-Content-Type-Options等）
- [ ] `app/not-found.tsx` — 404ページ
- [ ] `app/error.tsx` — グローバルエラーハンドラー（汎用エラーメッセージ表示）
- [ ] **ストーリーカバレッジ**: SECURITY-04, SECURITY-09, SECURITY-15

### Step 15: PWA アセット
- [ ] `public/manifest.json` — Web App Manifest
- [ ] `public/icons/` — アプリアイコン（プレースホルダー）
- [ ] Service Worker設定の確認
- [ ] **ストーリーカバレッジ**: NFR-03（PWA）

### Step 16: コード生成サマリー
- [ ] `aidlc-docs/construction/hokatsu-techo/code/code-summary.md` — 生成ファイル一覧、ストーリーマッピング

---

## ストーリートレーサビリティ

| ストーリー | 実装ステップ | 状態 |
|-----------|-------------|------|
| US-01: 園を追加する | Step 4, 9 | [ ] |
| US-02: 見学日を設定する | Step 4, 9 | [ ] |
| US-03: アプリの使い方を知る | Step 6, 7 | [ ] |
| US-04: メモを書く | Step 4, 11 | [ ] |
| US-05: 見学のコツを知る | Step 11 | [ ] |
| US-06: メモを編集する | Step 11 | [ ] |
| US-07: 園名を編集する | Step 11 | [ ] |
| US-08: 見学日を変更する | Step 11 | [ ] |
| US-09: 園を削除する | Step 11 | [ ] |
| US-10: 園一覧を見返す | Step 7 | [ ] |
| US-11: メモを読んで思い出す | Step 7, 11 | [ ] |
| US-12: 見学のコツを再確認する | Step 11 | [ ] |
| US-13: アプリ説明を再確認する | Step 2, 6, 7 | [ ] |

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
    __tests__/
      page.test.tsx
    add/__tests__/
      page.test.tsx
    nursery/[id]/__tests__/
      page.test.tsx
  components/
    layout/
      Header.tsx
      EmptyState.tsx
    nursery/
      NurseryCard.tsx
      NurseryList.tsx
      NurseryForm.tsx
      NurseryDetail.tsx
      DeleteNurseryDialog.tsx
      VisitTipsDialog.tsx
      __tests__/
        NurseryCard.test.tsx
        NurseryList.test.tsx
        NurseryForm.test.tsx
        NurseryDetail.test.tsx
        DeleteNurseryDialog.test.tsx
        VisitTipsDialog.test.tsx
    onboarding/
      OnboardingDialog.tsx
      __tests__/
        OnboardingDialog.test.tsx
    common/
      CookieConsent.tsx
      __tests__/
        CookieConsent.test.tsx
    ui/          (shadcn/ui自動生成)
  stores/
    nurseryStore.ts
    __tests__/
      nurseryStore.test.ts
  services/
    storageService.ts
    analyticsService.ts
    __tests__/
      storageService.test.ts
  hooks/
    useCookieConsent.ts
  types/
    nursery.ts
  lib/
    utils.ts
  middleware.ts
  public/
    manifest.json
    icons/
  package.json
  tsconfig.json
  next.config.ts
  tailwind.config.ts
  postcss.config.mjs
  vitest.config.ts
  vitest.setup.ts
  eslint.config.mjs
  components.json
```
