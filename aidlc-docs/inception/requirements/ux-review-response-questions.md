# UXレビュー対応方針 確認質問

`docs/ux-improvement-review.md` のレビュー指摘に対する方針を決定します。
各質問の [Answer]: タグの後にアルファベットを記入してください。

---

## Question 1: 保存モデルの変更（レビュー指摘 #1, 重要度: 高）

レビューの提案: テキスト入力画面では「完了」ボタンで保存、「戻る」は変更破棄確認ダイアログを表示（iOS連絡先編集パターン）。

A) レビュー提案を採用 — テキスト入力（園名・メモ）は右上「完了」ボタンで保存。変更がある状態で「戻る」を押したら破棄確認ダイアログ
B) 見学日のみ「選択 = 即保存」（トグル的操作）、テキスト入力は「完了」ボタン方式にする（ハイブリッド）
C) 当初案を維持 — 全フィールド「戻る＝保存」
X) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 2: スワイプジェスチャーとブラウザバックの競合（レビュー指摘 #7, 重要度: 中〜高）

A) カスタムスワイプアニメーションは実装せず、通常のNext.jsページ遷移 + CSSトランジションのみで実現する（ブラウザバックとの競合を回避）
B) View Transitions API を使用する（モダンブラウザ対応、Safariは2024年からサポート）
C) 画面遷移アニメーション自体を見送る（シンプルなページ遷移のみ）
X) Other (please describe after [Answer]: tag below)

[Answer]: AかBで悩みますね。基本的にスマホで動くことを想定しています。動作の軽さならCSS？

---

## Question 3: トースト表示時間（レビュー指摘 #2）

A) レビュー提案を採用 — 1.5〜2秒に延長 + チェックマークアイコン付き
B) 1秒のまま維持
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 4: 3階層ナビゲーション（レビュー指摘 #3）

編集完了後の動作について確認します。

A) 「完了」タップ後、自動的に園詳細画面に戻る（レビュー提案）
B) 「完了」タップ後、その画面に留まる（ユーザーが明示的に戻る）
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 5: カレンダーピッカー仕様の補足（レビュー指摘 #4）

A) 初期表示: 現在の見学日がある場合はその月、なければ今月。過去日付も選択可。日付表示は「2026年4月2日（木）」形式
B) 上記に加え、「今日」ボタンも配置する
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 6: アクセシビリティ（レビュー指摘 #5）

A) レビュー提案を全て採用（フォーカス管理、aria-live、aria-hidden、見出し構造）
B) 一部のみ採用（どの項目を採用するか記述してください）
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 7: エラーハンドリング（レビュー指摘 #6）

A) レビュー提案を採用 — 保存失敗時はエラートーストを表示し、編集画面に留まる
B) localStorage保存のため失敗はほぼないが、念のためtry-catchでエラートースト表示のみ
X) Other (please describe after [Answer]: tag below)

[Answer]: A
