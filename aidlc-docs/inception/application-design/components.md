# Components - 保活手帳 v1 SLC

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js (App Router) |
| 状態管理 | Zustand |
| UIライブラリ | shadcn/ui |
| スタイリング | Tailwind CSS |
| 日付入力 | ネイティブ `<input type="date">` |
| 言語 | TypeScript |

---

## ページコンポーネント（App Router）

### `app/page.tsx` - 園一覧（ホーム）
- **責務**: 園一覧の表示、空状態の表示、園追加への導線
- **Client/Server**: Client Component（Zustand store参照）
- **対応ストーリー**: US-01, US-10, US-11, US-13

### `app/add/page.tsx` - 園追加
- **責務**: 園名・見学日の入力フォーム、バリデーション、園の追加処理
- **Client/Server**: Client Component
- **対応ストーリー**: US-01, US-02

### `app/nursery/[id]/page.tsx` - 園詳細
- **責務**: 園情報の表示・インライン編集、メモの表示・編集、削除機能
- **Client/Server**: Client Component
- **対応ストーリー**: US-04, US-05, US-06, US-07, US-08, US-09, US-11, US-12

---

## UIコンポーネント

### `components/nursery/NurseryCard.tsx`
- **責務**: 園一覧のカード1枚分の表示（園名、見学日、メモプレビュー）
- **使用箇所**: 園一覧ページ
- **対応ストーリー**: US-10, US-11

### `components/nursery/NurseryList.tsx`
- **責務**: NurseryCardのリスト表示、空状態メッセージの出し分け
- **使用箇所**: 園一覧ページ
- **対応ストーリー**: US-10

### `components/nursery/NurseryForm.tsx`
- **責務**: 園追加フォーム（園名入力、見学日選択、追加ボタン）
- **使用箇所**: 園追加ページ
- **対応ストーリー**: US-01, US-02

### `components/nursery/NurseryDetail.tsx`
- **責務**: 園情報のインライン編集UI（園名、見学日、メモ）
- **使用箇所**: 園詳細ページ
- **対応ストーリー**: US-04, US-06, US-07, US-08

### `components/nursery/DeleteNurseryDialog.tsx`
- **責務**: 園削除の確認ダイアログ
- **使用箇所**: 園詳細ページ
- **shadcn/ui**: AlertDialog使用
- **対応ストーリー**: US-09

### `components/nursery/VisitTipsDialog.tsx`
- **責務**: 見学のコツの表示（初回自動表示 + リンクから再表示）
- **使用箇所**: 園詳細ページ
- **shadcn/ui**: Dialog使用
- **対応ストーリー**: US-05, US-12

### `components/onboarding/OnboardingDialog.tsx`
- **責務**: 初回オンボーディング画面（アプリ説明 + データ保存先説明）
- **使用箇所**: 園一覧ページ（初回のみ）、ヘルプから再表示
- **shadcn/ui**: Dialog使用
- **対応ストーリー**: US-03, US-13

### `components/layout/Header.tsx`
- **責務**: アプリヘッダー（タイトル、ヘルプアイコン）
- **使用箇所**: 全ページ共通（layout.tsx）
- **対応ストーリー**: US-13

### `components/layout/EmptyState.tsx`
- **責務**: 園が0件の場合の空状態メッセージ表示
- **使用箇所**: 園一覧ページ
- **対応ストーリー**: US-10

---

## shadcn/uiコンポーネント（利用予定）

| コンポーネント | 用途 |
|---------------|------|
| Button | 追加ボタン、編集ボタン等 |
| Dialog | オンボーディング、見学のコツ表示 |
| AlertDialog | 園削除確認 |
| Input | 園名入力 |
| Textarea | メモ入力 |
| Label | フォームラベル |
| Card | 園カード |

---

## ディレクトリ構成

```
app/
  layout.tsx          # 共通レイアウト（Header含む）
  page.tsx            # 園一覧（ホーム）
  add/
    page.tsx          # 園追加
  nursery/
    [id]/
      page.tsx        # 園詳細
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
  onboarding/
    OnboardingDialog.tsx
  ui/                 # shadcn/ui（自動生成）
    button.tsx
    dialog.tsx
    alert-dialog.tsx
    input.tsx
    textarea.tsx
    label.tsx
    card.tsx
```
