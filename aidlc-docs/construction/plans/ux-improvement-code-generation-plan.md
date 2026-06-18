# Code Generation Plan - UX改善（iOS風UI・自動保存）

## ユニットコンテキスト

### 実装するストーリー
- **US-01〜US-09**: 編集フロー変更に伴うUI刷新（既存ストーリーの実装方法変更）
- **新規要件**: FR-UX-01〜06（iOS風編集フロー、ハイブリッド保存モデル、トースト、見学日改善）

### 変更方針
- **データモデル（types/nursery.ts）**: 変更なし
- **ストア（stores/nurseryStore.ts）**: 変更なし
- **ルーティング**: 編集サブページ追加（`/nursery/[id]/edit/name`, `/edit/visit-date`, `/edit/memo`）
- **NurseryDetail.tsx**: インライン編集を廃止 → chevron付き表示行に変更
- **NurseryForm.tsx**: 見学日入力を「今日」/「あとで設定する」に変更
- **新規コンポーネント**: Toast, CalendarPicker, 破棄確認ダイアログ, 各編集ページ

### 保存モデル（ハイブリッド）
- **テキスト入力（園名・メモ）**: 右上「完了」ボタンで保存 → 園詳細に自動復帰。変更ありで「戻る」→ 破棄確認ダイアログ
- **見学日選択**: 日付選択 = 即保存。「戻る」で園詳細に復帰

### 画面遷移フロー（変更後）
```
園一覧(/) → 園追加(/add) → 園一覧(/)
園一覧(/) → 園詳細(/nursery/[id])
  → 園名編集(/nursery/[id]/edit/name) → 「完了」で保存&自動復帰
  → 見学日編集(/nursery/[id]/edit/visit-date) → 日付選択で即保存、「戻る」で復帰
  → メモ編集(/nursery/[id]/edit/memo) → 「完了」で保存&自動復帰
  → 削除 → 園一覧(/)
```

---

## 実装ステップ

### Step 1: Toastコンポーネントの作成
- [ ] `components/ui/toast.tsx` を新規作成
  - iOS風の控えめなデザイン（画面下部、角丸、半透明背景）
  - チェックマーク（✓）アイコン付き
  - 1.5〜2秒で自動消去（フェードイン/アウト）
  - `prefers-reduced-motion` 対応
  - `role="status"` / `aria-live="polite"` 設定
  - `data-testid="toast-message"` 付与
- [ ] `hooks/useToast.ts` を新規作成
  - `showToast(message: string)` 関数を提供
  - エラートースト対応（`showToast(message, { type: 'error' })`）
  - 複数トースト管理（タイマーリセット）
- [ ] `components/ui/toast.test.tsx` を新規作成

### Step 2: CSS画面遷移アニメーション
- [ ] `app/globals.css` にiOS風スライドアニメーションのCSS追加
  - 右からスライドイン（進む） / 右へスライドアウト（戻る）
  - `prefers-reduced-motion` でアニメーション無効化
- [ ] 遷移アニメーション用ラッパーコンポーネントの作成（必要に応じて）
  - Next.js App Routerのクライアントナビゲーションと連携
  - ブラウザのスワイプバックとは競合しない実装

### Step 3: 破棄確認ダイアログの作成
- [ ] `components/nursery/DiscardChangesDialog.tsx` を新規作成
  - 「変更を破棄しますか？」メッセージ
  - 「破棄」ボタン（破棄して戻る）
  - 「編集を続ける」ボタン（ダイアログを閉じる）
  - 既存の AlertDialog コンポーネントを活用
  - `data-testid` 付与
- [ ] `components/nursery/DiscardChangesDialog.test.tsx` を新規作成

### Step 4: NurseryDetail.tsx のリファクタリング
- [ ] インライン編集機能を全て削除（editingField, editName, editDate, editMemo state等）
- [ ] 各フィールドをchevron right（ChevronRight アイコン）付きの表示行に変更:
  - 園名行: 園名表示 + `>` → `/nursery/[id]/edit/name` へリンク
  - 見学日行: 見学日表示 + `>` → `/nursery/[id]/edit/visit-date` へリンク
  - メモ行: メモプレビュー表示 + `>` → `/nursery/[id]/edit/memo` へリンク
- [ ] chevronアイコンに `aria-hidden="true"` 付与
- [ ] iOS設定アプリ風のセクション表示スタイル（角丸グループ）
- [ ] `data-testid` 属性を適切に更新
- [ ] 既存の `NurseryDetail.test.tsx` を更新

### Step 5: 園名編集ページの作成
- [ ] `app/nursery/[id]/edit/name/page.tsx` を新規作成
  - ヘッダー: 左に「< 戻る」ボタン、右に「完了」ボタン
  - 園名テキスト入力フィールド（1つのみ、遷移時に自動フォーカス）
  - バリデーション: 空文字不可（「完了」ボタンを非活性に）
  - 「完了」タップ → `updateNursery()` で保存 + トースト表示 + 園詳細に自動復帰
  - 変更ありで「戻る」→ DiscardChangesDialog 表示
  - 変更なしで「戻る」→ そのまま園詳細に戻る
  - 保存失敗時: エラートースト表示 + 編集画面に留まる
  - 適切な見出し構造（`<h1>園名を編集</h1>` 等）
  - `data-testid` 付与
- [ ] テストファイル作成

### Step 6: メモ編集ページの作成
- [ ] `app/nursery/[id]/edit/memo/page.tsx` を新規作成
  - ヘッダー: 左に「< 戻る」ボタン、右に「完了」ボタン
  - 複数行テキストエリア（画面いっぱいに広げる、遷移時に自動フォーカス）
  - プレースホルダー: 「気づいたことを自由に書けます」
  - 「完了」タップ → 保存 + トースト表示 + 園詳細に自動復帰
  - 変更ありで「戻る」→ DiscardChangesDialog 表示
  - 変更なしで「戻る」→ そのまま園詳細に戻る
  - 保存失敗時: エラートースト表示 + 編集画面に留まる
  - 適切な見出し構造
  - `data-testid` 付与
- [ ] テストファイル作成

### Step 7: カレンダーピッカーコンポーネントの作成
- [ ] `components/ui/calendar-picker.tsx` を新規作成
  - iOSカレンダーアプリ風のカレンダー表示
  - 月送り（前月・次月）ナビゲーション
  - 日付セルのタップで選択
  - 選択中の日付をハイライト表示
  - 初期表示: 現在の見学日がある場合はその月、なければ今月
  - 過去日付も選択可能
  - 日付表示形式: 「2026年4月2日（木）」
  - 「未定にする」ボタン（日付クリア）
  - アクセシビリティ対応（aria-label, キーボード操作）
  - `data-testid` 付与
- [ ] `components/ui/calendar-picker.test.tsx` を新規作成

### Step 8: 見学日編集ページの作成
- [ ] `app/nursery/[id]/edit/visit-date/page.tsx` を新規作成
  - ヘッダー: 「< 戻る」ボタン（右上に「完了」ボタンは不要 — 即時保存のため）
  - CalendarPickerコンポーネントを配置
  - 日付選択時に即保存 + トースト表示
  - 「未定にする」タップで `null` に更新 + トースト表示
  - 「戻る」で園詳細に戻る（破棄確認不要 — 即時保存済み）
  - 保存失敗時: エラートースト表示
  - 適切な見出し構造
  - `data-testid` 付与
- [ ] テストファイル作成

### Step 9: 園詳細ページ（page.tsx）の更新
- [ ] `app/nursery/[id]/page.tsx` を更新
  - ヘッダーの「戻る」ボタンをiOS風に変更
  - NurseryDetailコンポーネントへの `onUpdate` props を削除（各編集ページで直接ストア操作）
  - 削除ボタン・ダイアログは現行維持
  - 見学のコツの初回表示・リンクは現行維持

### Step 10: 園追加フォームの見学日入力改善
- [ ] `components/nursery/NurseryForm.tsx` を更新
  - 見学日のdate inputを廃止
  - 「今日」ボタン: タップで本日日付をセット（選択状態を視覚的に表示）
  - 「あとで設定する」ボタン: タップで `null`（未定）をセット
  - デフォルトは「あとで設定する」が選択状態
  - `data-testid` 属性を更新
- [ ] `NurseryForm.test.tsx` を更新

### Step 11: ヘッダーコンポーネントのiOS風更新
- [ ] `components/layout/Header.tsx` を更新
  - 戻るボタンがある場合: iOS風 `< 戻る` テキストリンクスタイル
  - アプリタイトルの表示位置調整
- [ ] 必要に応じて `Header.test.tsx` を更新

### Step 12: 既存テストの更新・新規テスト追加
- [ ] `NurseryDetail.test.tsx` — インライン編集テストを削除、chevron表示テストに置換
- [ ] `NurseryForm.test.tsx` — 見学日入力テストを更新
- [ ] 各新規ページのテスト（Step 5, 6, 8で作成）
- [ ] Toast, CalendarPicker, DiscardChangesDialogのテスト（Step 1, 3, 7で作成）
- [ ] 全テスト実行・パス確認

### Step 13: Storybookストーリーの更新
- [ ] `NurseryDetail.stories.tsx` を更新
- [ ] `NurseryForm.stories.tsx` を更新
- [ ] 新規コンポーネントのストーリー追加（Toast, CalendarPicker, DiscardChangesDialog）

### Step 14: ビルド確認・コードサマリー
- [ ] `next build` でビルド成功確認
- [ ] `vitest run` で全テストパス確認
- [ ] `aidlc-docs/construction/ux-improvement/code/code-summary.md` にサマリー作成

---

## ストーリートレーサビリティ

| ストーリー / 要件 | 影響するStep |
|---|---|
| US-01: 園を追加する | Step 10（見学日入力改善） |
| US-02: 見学日を設定する | Step 8, 10（カレンダーピッカー、追加時の簡易選択） |
| US-04: メモを書く | Step 6（メモ編集ページ） |
| US-06: メモを編集する | Step 6（メモ編集ページ） |
| US-07: 園名を編集する | Step 5（園名編集ページ） |
| US-08: 見学日を変更する | Step 8（見学日編集ページ） |
| US-09: 園を削除する | Step 9（現行維持） |
| FR-UX-01: iOS風編集フロー（ハイブリッド） | Step 3, 4, 5, 6, 8, 9 |
| FR-UX-02: 控えめな保存フィードバック | Step 1 |
| FR-UX-03: ナビゲーションスタイル変更 | Step 2, 11 |
| FR-UX-04: 園追加時の見学日改善 | Step 10 |
| FR-UX-05: 園詳細の見学日編集 | Step 7, 8 |
| FR-UX-06: フォーム入力スタイル | Step 5, 6, 8 |
| NFR-UX-04: アクセシビリティ | Step 1, 4, 5, 6, 7, 8 |
| NFR-UX-05: エラーハンドリング | Step 1, 5, 6, 8 |
