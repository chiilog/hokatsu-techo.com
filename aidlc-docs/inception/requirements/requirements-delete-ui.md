# Requirements: 園詳細ページ削除UIの改善

## Intent Analysis

- **User Request**: 園詳細ページの右上ゴミ箱アイコンを廃止し、ページ下部に「この園を削除する」ボタンを配置
- **Request Type**: Enhancement（既存機能のUI改善）
- **Scope**: Single Component（園詳細ページ `app/nursery/[id]/page.tsx`）
- **Complexity**: Trivial（UIレイアウト変更のみ）
- **Depth**: Minimal

## Background

現在の削除UIはヘッダー右上にゴミ箱アイコン（Trash2）として配置されており、気軽にタップできてしまうため、誤操作のリスクがある。削除は不可逆な操作であるため、意図的なアクションとしてページ下部に明示的なボタンを配置する。

## Functional Requirements

### FR-01: ヘッダーからゴミ箱アイコンを削除
- 現在の `app/nursery/[id]/page.tsx` のヘッダー内にあるTrash2アイコンボタンを削除する
- ヘッダーは戻るボタンとタイトル「園の詳細」のみとなる

### FR-02: ページ下部に削除ボタンを配置
- `NurseryDetail` コンポーネントの最下部（「見学のコツを見る」リンクの下）に「この園を削除する」ボタンを配置する
- ボタンは `variant="destructive"` スタイルとする
- ボタンクリックで既存の `DeleteNurseryDialog`（確認ダイアログ）を表示する
- 既存の確認ダイアログの動作は変更しない

### FR-03: 既存のテストの更新
- `DeleteNurseryDialog.test.tsx` は変更不要（ダイアログ自体は変更なし）
- 園詳細ページのテストがあれば、ボタンの位置変更に合わせて更新

## Non-Functional Requirements

- **Accessibility**: `aria-label` と `data-testid` を適切に維持
- **Responsive**: 既存のモバイルファーストデザイン（max-w-lg）を維持

## Affected Files

| File | Change Type |
|------|------------|
| `app/nursery/[id]/page.tsx` | ヘッダーからTrash2ボタン削除、main内に削除ボタン追加 |
| 関連テストファイル | ボタン位置変更に合わせたテスト修正（該当する場合） |
