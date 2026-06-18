# UXレビュー対応 フォローアップ質問

Q2の回答が未確定のため確認します。

---

## Question 1: 画面遷移アニメーションの実装方式

補足情報:
- **A: CSSトランジション** — 全ブラウザ対応、軽量、確実。Next.jsクライアントナビゲーション時にCSSアニメーションで遷移効果を付ける
- **B: View Transitions API** — ブラウザネイティブで最も滑らか。ただしiOS Safari 18+（2024年9月〜）のみ。古いiOSでは遷移アニメーションなし（通常遷移にフォールバック）

A) CSSトランジション（全ブラウザ対応、安全策）
B) View Transitions API（最新ブラウザで最もiOS風、非対応ブラウザはフォールバック）
C) アニメーション自体を見送る
X) Other (please describe after [Answer]: tag below)

[Answer]: 一旦Aでやってみて、動作の滑らかさとかが気になったらView Transitions APIに変えます
