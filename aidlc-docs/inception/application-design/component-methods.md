# Component Methods - 保活手帳 v1 SLC

## データモデル（requirements.md より）

```typescript
interface Nursery {
  id: string;              // UUID
  name: string;            // 園名（必須）
  visitDate: string | null; // 見学日（ISO 8601形式）、未定ならnull
  memo: string;            // メモ（空文字列可）
  createdAt: string;       // 作成日時（ISO 8601形式）
  updatedAt: string;       // 更新日時（ISO 8601形式）
}

interface AppState {
  schemaVersion: number;      // データ構造バージョン（v1では1）
  nurseries: Nursery[];       // 園リスト
  hasSeenOnboarding: boolean; // オンボーディング表示済みフラグ
}
```

---

## Zustand Store

### `stores/nurseryStore.ts`

```typescript
interface NurseryStore {
  // State
  nurseries: Nursery[];
  hasSeenOnboarding: boolean;
  hasSeenVisitTips: boolean;

  // Actions
  addNursery: (name: string, visitDate: string | null) => void;
  updateNursery: (id: string, updates: Partial<Omit<Nursery, 'id' | 'createdAt'>>) => void;
  deleteNursery: (id: string) => void;
  setOnboardingSeen: () => void;
  setVisitTipsSeen: () => void;
}
```

**永続化**: Zustand の `persist` ミドルウェアでlocalStorageに自動保存。ストレージキーは `hokatsu-techo`。

---

## ページコンポーネント

### `app/page.tsx` - 園一覧
```typescript
// Props: なし（Zustand storeから直接取得）
// 内部状態:
//   showOnboarding: boolean（初回オンボーディング表示制御）
//   showHelp: boolean（ヘルプ再表示制御）
```

### `app/add/page.tsx` - 園追加
```typescript
// Props: なし
// 内部状態:
//   name: string（園名入力値）
//   visitDate: string | null（見学日入力値）
//   isValid: boolean（バリデーション結果）
```

### `app/nursery/[id]/page.tsx` - 園詳細
```typescript
// Props: params.id（URLパラメータ）
// 内部状態:
//   showVisitTips: boolean（見学のコツ表示制御）
//   editingField: 'name' | 'visitDate' | 'memo' | null（編集中フィールド）
```

---

## UIコンポーネント

### `NurseryCard`
```typescript
interface NurseryCardProps {
  nursery: Nursery;
}
// メモプレビューは先頭50文字程度を表示
// カードタップで /nursery/[id] に遷移
```

### `NurseryList`
```typescript
interface NurseryListProps {
  nurseries: Nursery[];
}
// nurseries.length === 0 の場合は EmptyState を表示
```

### `NurseryForm`
```typescript
interface NurseryFormProps {
  onSubmit: (name: string, visitDate: string | null) => void;
}
// バリデーション: name.trim().length > 0
// 見学日はネイティブ <input type="date"> + 「未定」チェックボックス
```

### `NurseryDetail`
```typescript
interface NurseryDetailProps {
  nursery: Nursery;
  editingField: 'name' | 'visitDate' | 'memo' | null;
  onStartEdit: (field: 'name' | 'visitDate' | 'memo') => void;
  onSave: (field: string, value: string | null) => void;
  onCancelEdit: () => void;
}
// 各フィールドの表示/編集モード切り替え
// 園名編集時の空チェックバリデーション
```

### `DeleteNurseryDialog`
```typescript
interface DeleteNurseryDialogProps {
  nurseryName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}
// shadcn/ui AlertDialog使用
```

### `VisitTipsDialog`
```typescript
interface VisitTipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// 見学のコツ3つを表示
// 1. 先生の様子を見る
// 2. 違和感を大事にする
// 3. 気づいたことは何でもメモ
```

### `OnboardingDialog`
```typescript
interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}
// アプリの説明、データ保存先の説明
// 「はじめる」ボタンで閉じる
```

### `Header`
```typescript
interface HeaderProps {
  onHelpClick: () => void;
}
// アプリタイトル + ヘルプ[?]アイコン
```

### `EmptyState`
```typescript
// Props: なし
// 園が0件時のメッセージと園追加への導線
```

---

## カスタムフック

### `hooks/useNurseryStore.ts`
```typescript
// Zustand storeのセレクタ付きアクセス
// 例: const nurseries = useNurseryStore(state => state.nurseries);
```

注: 詳細なビジネスルール（バリデーション詳細、エラーハンドリング等）はCONSTRUCTION PHASEのコード生成時に定義
