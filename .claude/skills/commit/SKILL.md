---
name: commit
description: Conventional Commits 仕様に沿ったコミットメッセージを生成してコミットする。コード変更後のコミット時に使用する。
allowed-tools: Bash, Read, Grep, Glob
---

# Conventional Commit スキル

ステージされた変更を分析し、Conventional Commits 仕様に沿ったコミットメッセージを生成してコミットする。

## 手順

1. `git diff --cached` でステージされた変更を確認する
2. ステージされた変更がない場合は `git diff` と `git status` を確認し、変更をステージするようユーザーに促す
3. 変更内容を分析し、適切な type, scope, description を決定する
4. コミットメッセージをユーザーに提示して確認を取る
5. 承認後、コミットを実行する

## Conventional Commits フォーマット

```
<type>(<scope>): <description>

[body]

[footer]
```

### type（必須）

| type | 用途 |
|------|------|
| feat | 新機能の追加 |
| fix | バグ修正 |
| docs | ドキュメントのみの変更 |
| style | コードの意味に影響しない変更（空白、フォーマット、セミコロンなど） |
| refactor | バグ修正や機能追加を伴わないコードの変更 |
| perf | パフォーマンス改善 |
| test | テストの追加・修正 |
| build | ビルドシステムや外部依存に関する変更 |
| ci | CI設定ファイルやスクリプトの変更 |
| chore | その他の変更（srcやtestを変更しないもの） |
| revert | 以前のコミットを取り消す |

### scope（任意）

変更対象のモジュールやコンポーネント名を括弧内に記載する。

例: `feat(auth)`, `fix(api)`, `refactor(components)`

### description（必須）

- 日本語で記述する
- 簡潔に変更内容を説明する
- 末尾にピリオドや句点を付けない

### body（任意）

変更の動機や詳細な説明が必要な場合に記載する。

### footer（任意）

- 破壊的変更がある場合: `BREAKING CHANGE: <説明>`
- Issue への参照: `Refs: #123`

## コミットメッセージの例

```
feat(auth): ログイン機能を追加
```

```
fix(api): ユーザー取得時のnullチェックを修正

レスポンスがnullの場合にクラッシュする問題を修正

Refs: #42
```

```
refactor(components): ボタンコンポーネントを共通化
```

```
chore(deps): パッケージを更新
```

## 注意事項

- 1つのコミットには1つの論理的な変更のみを含める
- 破壊的変更がある場合は必ず `BREAKING CHANGE` フッターを付ける
- コミットメッセージは HEREDOC 形式で渡す
- コミットの末尾に `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` を付ける
