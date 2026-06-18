# Requirements Verification Questions

PRD/仕様書は非常に充実していますが、技術的な実装方針について確認が必要な項目があります。
各質問の [Answer]: タグの後に回答（A, B, C 等の選択肢）を記入してください。

## Question 1
フレームワークの選定について。PRDでは「Next.js + Tailwind CSS」と記載されていますが、プロトタイプは「React + Vite + MUI」で構築されています。v1 SLCではどちらを採用しますか？

A) Next.js + Tailwind CSS（PRD記載通り）
B) React + Vite + Tailwind CSS（SPAで十分、SSR不要）
C) React + Vite + MUI（プロトタイプと同じ構成を維持）
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
デプロイ先について。プロトタイプにはvercel.jsonが含まれています。

A) Vercel（プロトタイプと同様）
B) AWS Amplify（プロトタイプのamplify.ymlが示唆）
C) Cloudflare Pages
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
アナリティクス/トラッキングについて。プロトタイプにはGA4とMicrosoft Clarityが実装されています。v1でもアナリティクスを含めますか？

A) GA4 + Clarity を引き続き含める
B) GA4のみ含める
C) v1ではアナリティクスなし（後から追加）
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
テスト戦略について。プロトタイプには単体テスト（Vitest）が多数含まれています。v1のテスト方針は？

A) 単体テスト + 結合テスト（Vitest + Testing Library）
B) 単体テストのみ（Vitest）
C) E2Eテストのみ（Playwright等）
D) v1ではテストなし（品質より速度優先）
E) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
PWA対応の範囲について。PRDでは「PWAとして動作、圏外でも使える」とあります。

A) フルPWA（Service Worker + マニフェスト + ホーム画面追加 + オフライン対応）
B) マニフェスト + ホーム画面追加のみ（オフライン対応は後回し）
C) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
プロトタイプのデータ移行について。PRDでは「現プロトタイプからの移行は別途検討（キー名が異なるため）」とあります。v1にプロトタイプのlocalStorageデータ移行機能を含めますか？

A) 移行機能を含める（旧キーからの自動マイグレーション）
B) 移行機能は含めない（v1は新規データのみ）
C) Other (please describe after [Answer]: tag below)

[Answer]: メリット・デメリットを提示してください。それを元に判断します

## Question 7: Security Extensions
セキュリティ拡張ルールをこのプロジェクトに適用しますか？

A) Yes - 全てのSECURITYルールをブロッキング制約として適用（本番向けアプリ推奨）
B) No - SECURITYルールをスキップ（PoC、プロトタイプ、実験的プロジェクト向け）
C) Other (please describe after [Answer]: tag below)

[Answer]: A
