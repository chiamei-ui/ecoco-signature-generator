# ECOCO Email 簽名檔產生器規格

## 這是在做什麼

把 Working Hub 內原本規劃成「新人專區內嵌工具」的簽名檔產生器，拆成獨立線上工具。這樣資源庫、新人專區、HR 文件都只需要連到同一個網址，維護時不用改多個模組。

## 來源整理

原 Working Hub 相關規格來源：

- `openspec/specs/PRD.md`：F08c 簽名檔產生器，包含工具定位、資料模型、版本概念。
- `openspec/specs/onboarding-wireframe-spec.md`：新人第 10 步與簽名檔產生器畫面。
- `openspec/specs/ui-wireframe_20260427.md`：早期 wireframe，包含中英欄位與複製 HTML。
- `openspec/specs/resource-library-spec.md`：Phase 9，簽名檔工具與 AI tools / resources 的關係。
- `docs/flow/資源庫、新人專區流程圖.md`：資源庫工具入口與新人流程描述。
- `docs/flow/新人入職-flow.md`：新人流程中簽名檔任務節點。

## 新決策

### 工具定位

簽名檔產生器是「公司共用工具」，不是「新人專區功能」。

### 正確入口

- 主要入口：Working Hub 資源庫 > 工具。
- 次要入口：新人專區第 10 步的外部連結。
- 其他入口：HR 文件、IT 開通信箱 SOP、內部公告可直接連到同一網址。

### 不再採用

- 不再把工具 UI 深度嵌入新人專區。
- 不在新人專區內維護 logo、ESG 圖、社群 icon。
- 不讓 onboarding 狀態與簽名檔產生器互相依賴。

## 使用者流程

1. 使用者從資源庫工具卡或新人第 10 步開啟工具。
2. 使用者填寫個人資料：
   - 姓名（中）
   - 姓名（英）
   - 職稱（中）
   - 職稱（英）
   - 部門（中）
   - 部門（英）
   - 公司信箱
   - 手機
   - 分機
3. 工具即時產生品牌簽名檔預覽。
4. 使用者點「複製到 Gmail」。
5. 使用者到 Gmail 設定貼上。
6. 若使用者是新人，再回新人專區標記任務完成。

## 資源庫新增資料建議

```text
title: Email 簽名檔產生器
type: tool
category: AI 工具 / 內部工具
status: public
embed_type: link
tool_url: GitHub Pages URL
owner: HR / 品牌維護者
description: 產生符合 ECOCO 品牌格式的 Gmail HTML 簽名檔。
tags: email, signature, onboarding, brand
```

## 新人專區調整建議

新人專區第 10 步文案：

```text
產生並設定 Email 簽名檔
請開啟公司簽名檔產生器，填寫個人資料並複製到 Gmail。完成 Gmail 設定後，回到此處標記完成。
```

按鈕：

```text
前往簽名檔產生器
標記完成
```

## 視覺素材

素材來源：

```text
D:\vs code\ecoco-brand-hub-pack\public\signature-assets
```

已搬入本專案：

```text
assets/signature-assets/
```

素材清單：

- `logo.jpg`
- `mail.jpg`
- `tel.jpg`
- `fax.jpg`
- `map.jpg`
- `web.jpg`
- `fb.jpg`
- `ig.jpg`
- `yt.jpg`
- `ESG.jpg`
- `ESG-en.jpg`

## 維護規則

- 公司資訊、電話、地址、社群連結統一維護在 `app.js` 的 `company`。
- 圖片素材統一放在 `assets/signature-assets/`。
- 若品牌簽名檔改版，更新此 repo 後重新 push，GitHub Pages 會更新線上版本。
- Working Hub 僅更新資源庫工具 URL，不需要重新開發簽名檔 UI。

## 開發工時風險

低風險：

- 修改公司文字資訊。
- 替換圖片。
- 調整欄位標籤與提示字。

中風險：

- 大幅改 email HTML table 結構，可能影響 Gmail 貼上效果。
- 圖片改成需登入的 URL，可能導致收件人看不到圖。

高風險：

- 重新嵌回 Working Hub，會牽涉 auth、onboarding、resource library、部署流程。
- 把產生狀態寫入資料庫，會增加後端與隱私維護成本。
