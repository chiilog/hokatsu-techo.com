// グローバル CSS の副作用インポート（例: import "./globals.css"）に型を与える。
// Next.js の型は CSS Modules 用のみで、プレーン CSS の宣言が無いため補う。
declare module "*.css";
