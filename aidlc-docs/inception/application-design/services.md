# Services - 保活手帳 v1 SLC

## サービス層概要

v1 SLCではサービス層は最小限に保ち、Zustandのpersistミドルウェアにデータ永続化を委ねる設計。

---

## 1. Storage Service

### `services/storageService.ts`

**責務**: localStorageの読み書きとスキーママイグレーション

```typescript
interface StorageService {
  // localStorageからデータ読み込み（マイグレーション適用済み）
  loadState: () => AppState | null;

  // localStorageにデータ保存
  saveState: (state: AppState) => void;

  // スキーマバージョンに応じたマイグレーション
  migrate: (rawData: unknown) => AppState;
}
```

**設計方針**:
- ストレージキー: `hokatsu-techo`
- Zustand persistミドルウェアのカスタムストレージとして提供
- `schemaVersion` フィールドでデータ構造バージョンを管理
- v1では `schemaVersion: 1`
- 読み込み時に `schemaVersion` をチェックし、必要に応じてマイグレーション実行
- 足りないフィールドはデフォルト値で補完

---

## 2. Analytics Service

### `services/analyticsService.ts`

**責務**: GA4とMicrosoft Clarityの初期化とイベント送信

```typescript
interface AnalyticsService {
  // 初期化（Cookie同意後に呼び出し）
  initialize: () => void;

  // ページビュー送信
  trackPageView: (path: string) => void;

  // カスタムイベント送信（園追加、園削除等）
  trackEvent: (eventName: string, params?: Record<string, string>) => void;
}
```

**設計方針**:
- Cookie同意前はトラッキングしない
- 入力データ（園名、メモ等）は送信しない
- ページビューとUIイベント（園追加、園削除等のアクション）のみトラッキング
- GA4: `gtag.js` 使用
- Clarity: Script tag 注入

---

## 3. PWA Service

### PWA設定（`next.config.js` + `public/manifest.json`）

**責務**: Service Workerの登録、Web App Manifest、オフライン対応

**設計方針**:
- `next-pwa` または `@ducanh2912/next-pwa` を使用
- オフラインキャッシュ戦略: Cache First（静的アセット）
- manifest.json: アプリ名、アイコン、テーマカラー設定
- ホーム画面追加対応

---

## 4. Cookie Consent

### `components/common/CookieConsent.tsx` + `hooks/useCookieConsent.ts`

**責務**: Cookie同意バナーの表示とアナリティクス初期化制御

```typescript
interface CookieConsentHook {
  hasConsented: boolean | null;  // null: 未回答
  accept: () => void;
  decline: () => void;
}
```

**設計方針**:
- localStorage に同意状態を保存（キー: `hokatsu-techo-consent`）
- 同意後にAnalyticsServiceを初期化
- 拒否の場合はアナリティクスを読み込まない

---

## サービス間の関係

```
[Zustand Store] --persist--> [Storage Service] --> [localStorage]

[Cookie Consent] --同意後--> [Analytics Service] --> [GA4 / Clarity]

[next-pwa config] --> [Service Worker] --> [オフラインキャッシュ]
```
