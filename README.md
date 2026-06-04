# ECOCO Email Signature Generator

這是一個獨立部署的 ECOCO Email 簽名檔產生器。

## 使用方式

1. 開啟線上工具。
2. 填寫姓名、職稱、部門、Email、電話與分機。
3. 確認右側預覽。
4. 點「複製到 Gmail」。
5. 到 Gmail 設定中的「簽名」欄位貼上。

## 維護原則

- 此工具獨立部署，不嵌入 Working Hub 新人專區。
- Working Hub 資源庫只需新增一筆「工具」資源，連到此工具網址。
- 新人專區第 10 步只保留「前往簽名檔產生器」連結與「標記完成」流程。
- 修改 logo、社群圖、ESG 圖或公司資訊時，只更新此 repo。

## 檔案結構

```text
index.html
styles.css
app.js
assets/signature-assets/
docs/SPEC.md
```

## 部署

此專案是純靜態網站，可直接用 GitHub Pages 從 `main` branch root 發佈。
