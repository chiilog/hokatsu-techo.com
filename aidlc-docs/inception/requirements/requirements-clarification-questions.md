# Requirements Clarification Questions

Question 6 について、プロトタイプのデータ構造を分析した上でメリット・デメリットを提示します。

## データ構造の差異

| 項目 | プロトタイプ | v1 SLC |
|------|-------------|--------|
| ストレージキー | `nursery-store` (Zustand persist) | `hokatsu-techo-v1` |
| データ構造 | `Nursery → VisitSession[] → Question[]` | `Nursery { name, visitDate, memo }` |
| 園名 | `name` | `name` |
| 見学日 | `VisitSession.visitDate` (複数回可) | `visitDate` (1つのみ) |
| メモ | なし（質問の回答 + insights タグ） | `memo` (自由テキスト) |
| 暗号化 | あり（オプション） | なし |

## メリット・デメリット

### A) 移行機能を含める場合

**メリット**
- 既存プロトタイプユーザーのデータを失わない
- 園名と見学日は比較的簡単にマッピングできる

**デメリット**
- データ構造が大幅に異なるため、変換ロジックが複雑になる
  - 複数VisitSession → 1つのvisitDateにどう変換するか（最新を採用？）
  - Question回答 + insights → 1つのmemoにどう変換するか
  - 暗号化データの復号処理も必要になる可能性
- SLC v1のシンプルさに反する実装コストが発生する
- プロトタイプの実ユーザー数が少なければ費用対効果が低い
- 移行ロジック自体のテストも必要

### B) 移行機能を含めない場合

**メリット**
- 実装がシンプルに保てる（SLCの原則に合致）
- v1のデータ構造に集中できる
- 旧データとの互換性を気にせず設計できる

**デメリット**
- 既存ユーザーは手動でデータを移す必要がある
- プロトタイプで記録した園情報が失われる

## Clarification Question 1
上記を踏まえて、プロトタイプのデータ移行をどうしますか？

A) 移行機能を含める（旧データからの自動変換）
B) 移行機能は含めない（v1は新規データのみ、SLCのシンプルさを優先）
C) Other (please describe after [Answer]: tag below)

[Answer]: B
