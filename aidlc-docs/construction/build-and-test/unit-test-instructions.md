# ユニットテスト実行手順

## テスト実行

### 全テスト実行

```bash
npm test
```

### ウォッチモード（開発時）

```bash
npm run test:watch
```

### カバレッジレポート付き

```bash
npx vitest run --coverage
```

## テスト結果の期待値

- **テストファイル**: 21件すべてパス（unit 11 + storybook 10）
- **テスト数**: 74件すべてパス
- **カバレッジ**: Statements 94%, Lines 96%

## テストファイル一覧

### Store / Service

| ファイル | テスト数 | 内容 |
|---------|---------|------|
| `stores/nurseryStore.test.ts` | 12 | CRUD操作、フラグ管理 |
| `services/storageService.test.ts` | 6 | localStorage読み書き、マイグレーション |
| `services/analyticsService.test.ts` | 4 | Clarity初期化、バリデーション、重複防止 |

### コンポーネント

| ファイル | テスト数 | 内容 |
|---------|---------|------|
| `components/onboarding/OnboardingDialog.test.tsx` | 5 | 表示/非表示、はじめるボタン |
| `components/nursery/NurseryCard.test.tsx` | 4 | 園カード表示 |
| `components/nursery/NurseryList.test.tsx` | 2 | リスト表示、空状態 |
| `components/nursery/NurseryForm.test.tsx` | 5 | フォーム入力、バリデーション |
| `components/nursery/NurseryDetail.test.tsx` | 7 | インライン編集、保存、キャンセル |
| `components/nursery/DeleteNurseryDialog.test.tsx` | 3 | 削除確認ダイアログ |
| `components/nursery/VisitTipsDialog.test.tsx` | 3 | 見学のコツ表示 |
| `components/common/CookieConsent.test.tsx` | 4 | Cookie同意バナー |

### Storybook ビジュアルテスト

10ファイル / 16ストーリーがPlaywright経由で自動テストされる。

## テスト失敗時の対応

1. テスト出力のエラーメッセージを確認
2. 対象コンポーネント/ストアのコードを確認
3. 修正後、再テスト
4. 全テストパスを確認してからコミット
