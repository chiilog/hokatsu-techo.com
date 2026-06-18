# アプリケーション設計プラン - 保活手帳 v1 SLC

## プラン概要

要件定義書とユーザーストーリーを基に、Next.js + Tailwind CSSアプリのコンポーネント構成・サービス層・データフローを設計する。

## 設計ステップ

- [x] Step 1: コンポーネント定義（components.md）
  - [x] ページコンポーネント（4画面）の定義
  - [x] UIコンポーネントの分割と責務定義
  - [x] 共通コンポーネントの抽出
- [x] Step 2: コンポーネントメソッド定義（component-methods.md）
  - [x] 各コンポーネントのprops/メソッドシグネチャ
  - [x] カスタムフックの定義
- [x] Step 3: サービス層定義（services.md）
  - [x] localStorageサービスの設計
  - [x] PWAサービスの設計
  - [x] アナリティクスサービスの設計
- [x] Step 4: コンポーネント依存関係（component-dependency.md）
  - [x] データフロー図
  - [x] コンポーネント間の依存関係

---

## 質問

以下の質問に回答してください。[Answer]: タグの後に選択肢を記入してください。

## Question 1
状態管理の方針について。プロトタイプではZustandを使用していましたが、v1 SLCではデータがシンプル（園リスト + オンボーディングフラグ + 見学のコツ表示フラグ）です。

A) Zustand を引き続き使用（プロトタイプの知見を活かす）
B) React Context + useReducer（外部ライブラリなし、Next.jsとの相性が良い）
C) localStorageの直接操作 + カスタムフック（最もシンプル、状態管理ライブラリ不要）
D) Other (please describe after [Answer]: tag below)

[Answer]: AかBで悩んでいます。このアプリ作成には学習意図もあるので、メリットデメリットを教えて

## Question 2
Next.jsのルーティング構成について。App Router と Pages Router のどちらを使いますか？

A) App Router（Next.js 13+推奨、Server Components対応）
B) Pages Router（従来型、シンプルで実績あり）
C) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
UIコンポーネントライブラリについて。Tailwind CSSのみで構築する方針ですが、ヘッドレスUIコンポーネント（日付ピッカー、ダイアログ等）の利用方針は？

A) Headless UI（Tailwind Labs公式）を使用
B) Radix UI を使用（アクセシビリティが充実）
C) shadcn/ui を使用（Radixベース + Tailwindスタイル、コピー&ペースト方式）
D) ライブラリなし、全て自作する
E) Other (please describe after [Answer]: tag below)

[Answer]: おすすめを教えて

---

## Follow-up Questions

上記の比較を踏まえて、最終的な選択をお願いします。

## Follow-up Q1
状態管理の方針を決定してください。

A) Zustand（推奨：プロトタイプ知見活用、将来拡張しやすい、学習価値あり）
B) React Context + useReducer（React本体の仕組みを深く学びたい場合）

[Answer]: A

## Follow-up Q3
UIコンポーネントライブラリを決定してください。

A) Headless UI（Tailwind Labs公式、コンポーネント数少なめ）
B) Radix UI（アクセシビリティ充実、ヘッドレス）
C) shadcn/ui（推奨：Radixベース + Tailwind、コード手元で学べる、日付ピッカー等揃う）

[Answer]: Radix UI or shadcn/ui、ドラムロールUI希望、アクセシビリティ重視

## Follow-up Q3-2
日付ピッカーの方針を決定してください。ドラムロールUIはWeb上でのアクセシビリティ対応が困難です（スクリーンリーダー・キーボード操作の問題）。

A) ネイティブ `<input type="date">` を使う（iOSではOS標準のドラムロール風UIが自動表示される。デスクトップではブラウザ標準UI。最もアクセシブル）
B) shadcn/ui のカレンダーピッカーを使う（Radixベースでアクセシブル、全環境で統一UI）
C) モバイルはネイティブ `<input type="date">`、デスクトップはshadcn/uiカレンダーのハイブリッド
D) Other (please describe)

[Answer]: A

## Follow-up Q3-3
UIコンポーネントライブラリの最終決定をしてください。アクセシビリティ重視の観点では、どちらもRadixベースのためアクセシビリティ品質は同等です。

A) shadcn/ui（推奨：コードが手元にあり学べる・カスタマイズ自由・Tailwindスタイリング済み）
B) Radix UI + 自前Tailwindスタイリング（より低レベルから学びたい場合）

[Answer]: A
