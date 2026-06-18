# Plan: Conventional Commit スキルの作成

## Context
commit 時に Conventional Commits 仕様に沿ったメッセージを生成するスキルを作成する。ユーザーが `/commit` で呼び出せるようにする。

## 実装内容

### 作成ファイル
- `.claude/skills/commit/SKILL.md`

### スキル仕様
- **name**: `commit`
- **description**: Conventional Commits 仕様に沿ったコミットメッセージでコミットする
- **disable-model-invocation**: なし（ユーザーも Claude も呼び出し可能）
- **allowed-tools**: `Bash, Read, Grep, Glob`

### スキルの動作フロー
1. `git diff --cached` でステージされた変更を確認
2. ステージされた変更がない場合は `git diff` を確認し、ステージを促す
3. 変更内容を分析
4. Conventional Commits 仕様に基づきコミットメッセージを生成
5. ユーザーに確認後、コミット実行

### Conventional Commits ルール（スキル内に記載）
- フォーマット: `<type>(<scope>): <description>`
- type: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- scope: 任意（変更対象のモジュール/コンポーネント名）
- description: 小文字始まり、末尾にピリオドなし、命令形
- body: 任意（変更の詳細）
- footer: 任意（BREAKING CHANGE など）
- 日本語で description を書く

## 検証方法
- `/commit` でスキルが呼び出せることを確認
- ステージされた変更に対して適切な Conventional Commit メッセージが生成されることを確認
