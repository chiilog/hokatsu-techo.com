# コード生成プラン - 園詳細ページ削除UIの改善

## 変更対象

| ファイル | 変更種別 |
|---------|---------|
| `app/nursery/[id]/page.tsx` | 修正（ヘッダーからTrash2削除、main内に削除ボタン追加） |

## 変更不要ファイル

| ファイル | 理由 |
|---------|------|
| `components/nursery/DeleteNurseryDialog.tsx` | ダイアログ自体は変更なし |
| `components/nursery/NurseryDetail.tsx` | 削除ボタンはページ側で管理 |
| `components/nursery/NurseryDetail.test.tsx` | 削除機能のテストは含まれていない |
| `components/nursery/NurseryDetail.stories.tsx` | 変更なし |
| `components/nursery/DeleteNurseryDialog.test.tsx` | 変更なし |

## ステップ

- [x] **Step 1**: `app/nursery/[id]/page.tsx` を修正
  - ヘッダーからTrash2アイコンボタンを削除
  - ヘッダーの `justify-between` を削除（戻るボタン+タイトルのみ）
  - `Trash2` のimportを削除
  - `<NurseryDetail>` の後、`</main>` の前に「この園を削除する」ボタンを追加
  - ボタン: `variant="destructive"`, `data-testid="delete-nursery-button"`, `aria-label` 維持
- [x] **Step 2**: ビルド・テスト確認
  - `npm run build` でビルド成功確認
  - `npm run test` で既存テスト全パス確認
