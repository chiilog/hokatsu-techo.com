# Component Dependency - 保活手帳 v1 SLC

## データフロー概要

```
[localStorage]
     |
     | persist middleware
     v
[Zustand NurseryStore] <--- 全Client Componentが参照
     |
     +---> app/page.tsx (園一覧)
     |       +---> NurseryList
     |       |       +---> NurseryCard (x N)
     |       +---> EmptyState (0件時)
     |       +---> OnboardingDialog (初回 or ヘルプ)
     |       +---> Header
     |
     +---> app/add/page.tsx (園追加)
     |       +---> NurseryForm
     |       +---> Header
     |
     +---> app/nursery/[id]/page.tsx (園詳細)
             +---> NurseryDetail
             +---> DeleteNurseryDialog
             +---> VisitTipsDialog (初回 or リンク)
             +---> Header
```

---

## コンポーネント依存関係マトリクス

| コンポーネント | 依存先 | データ受け取り方法 |
|---------------|--------|-------------------|
| `app/layout.tsx` | Header | children経由でページを表示 |
| `app/page.tsx` | NurseryList, EmptyState, OnboardingDialog, Header | Zustand store直接参照 |
| `app/add/page.tsx` | NurseryForm, Header | Zustand store（addNursery） |
| `app/nursery/[id]/page.tsx` | NurseryDetail, DeleteNurseryDialog, VisitTipsDialog, Header | Zustand store（nursery取得・更新・削除） |
| NurseryList | NurseryCard | props（nurseries配列） |
| NurseryCard | なし | props（単一nursery） |
| NurseryForm | なし | props（onSubmitコールバック） |
| NurseryDetail | なし | props（nursery + 編集コールバック） |
| DeleteNurseryDialog | shadcn/ui AlertDialog | props（open状態 + コールバック） |
| VisitTipsDialog | shadcn/ui Dialog | props（open状態） |
| OnboardingDialog | shadcn/ui Dialog | props（open状態 + onComplete） |
| Header | なし | props（onHelpClick） |
| EmptyState | なし | なし |

---

## 状態管理フロー

### 園の追加フロー
```
NurseryForm --onSubmit--> app/add/page.tsx --addNursery()--> Zustand Store --persist--> localStorage
                          router.push('/') で一覧に遷移
```

### 園の編集フロー
```
NurseryDetail --onSave--> app/nursery/[id]/page.tsx --updateNursery()--> Zustand Store --persist--> localStorage
```

### 園の削除フロー
```
DeleteNurseryDialog --onConfirm--> app/nursery/[id]/page.tsx --deleteNursery()--> Zustand Store --persist--> localStorage
                                   router.push('/') で一覧に遷移
```

### オンボーディングフロー
```
app/page.tsx: hasSeenOnboarding === false --> OnboardingDialog 表示
OnboardingDialog --onComplete--> setOnboardingSeen() --> Zustand Store --persist--> localStorage
```

### 見学のコツフロー
```
app/nursery/[id]/page.tsx: hasSeenVisitTips === false --> VisitTipsDialog 自動表示
VisitTipsDialog 閉じる --> setVisitTipsSeen() --> Zustand Store --persist--> localStorage
「見学のコツ」リンクタップ --> VisitTipsDialog 再表示（storeは更新しない）
```

---

## Client/Server Component境界

```
app/layout.tsx          [Server Component]
  +-- Header            [Client Component] ※ヘルプクリックのイベント処理
  +-- children          [各ページ]

app/page.tsx            [Client Component] ※Zustand store参照
app/add/page.tsx        [Client Component] ※Zustand store参照
app/nursery/[id]/page.tsx [Client Component] ※Zustand store参照
```

**方針**: Zustand storeを参照するページはすべてClient Component（`"use client"`）。layout.tsxのみServer Componentとして、メタデータ等を管理する。Headerはイベントハンドラを持つためClient Component。

---

## 外部サービス依存

| サービス | 依存元 | 初期化タイミング |
|---------|--------|-----------------|
| localStorage | Zustand persist | アプリ起動時（自動） |
| GA4 | AnalyticsService | Cookie同意後 |
| Microsoft Clarity | AnalyticsService | Cookie同意後 |
| Service Worker | next-pwa | アプリ起動時（自動） |
