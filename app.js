const company = {
  name: "凡立橙股份有限公司",
  nameEn: "ECOCO",
  tel: "+886-2-2717-9668",
  fax: "+886-2-2717-9669",
  email: "service@ecoco.xyz",
  web: "www.ecoco.xyz",
  address: "台北市松山區南京東路四段 1 號",
  facebook: "https://www.facebook.com/ecoco.tw",
  instagram: "https://www.instagram.com/ecoco.tw",
  youtube: "https://www.youtube.com/@ecoco",
};

const assetBase = "./assets/signature-assets";
const form = document.querySelector("#signature-form");
const preview = document.querySelector("#signature-preview");
const statusEl = document.querySelector("#copy-status");
const copyRichBtn = document.querySelector("#copy-rich");
const copyHtmlBtn = document.querySelector("#copy-html");
const copyTextBtn = document.querySelector("#copy-text");

function field(name) {
  return form.elements[name].value.trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function assetUrl(fileName) {
  return new URL(`${assetBase}/${fileName}`, window.location.href).href;
}

function contactRow(icon, label, value, href = "") {
  if (!value) return "";
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:#4B5563;text-decoration:none;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `<tr>
    <td style="width:24px;padding:2px 6px 2px 0;vertical-align:middle;">
      <img src="${assetUrl(icon)}" width="18" height="16" alt="${escapeHtml(label)}" style="display:block;border:0;">
    </td>
    <td style="padding:2px 0;color:#4B5563;font-size:12px;line-height:18px;">${content}</td>
  </tr>`;
}

function collectData() {
  return {
    nameCn: field("nameCn"),
    nameEn: field("nameEn"),
    titleCn: field("titleCn"),
    titleEn: field("titleEn"),
    deptCn: field("deptCn"),
    deptEn: field("deptEn"),
    email: field("email"),
    mobile: field("mobile"),
    ext: field("ext"),
  };
}

function buildHtmlSignature(data) {
  const displayName = [data.nameCn, data.nameEn]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" / ");
  const displayTitle = [data.titleCn, data.titleEn]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" / ");
  const displayDept = [data.deptCn, data.deptEn]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" / ");
  const personalPhone = [data.mobile, data.ext && `ext. ${data.ext}`]
    .filter(Boolean)
    .join(" / ");

  return `<table cellpadding="0" cellspacing="0" role="presentation" style="width:560px;max-width:560px;font-family:Arial,'Microsoft JhengHei',sans-serif;color:#1A1A1A;border-collapse:collapse;">
  <tr>
    <td style="padding:0 0 10px 0;border-bottom:1px solid #E5E7EB;">
      <img src="${assetUrl("logo.jpg")}" width="185" height="57" alt="${company.nameEn}" style="display:block;border:0;">
    </td>
  </tr>
  <tr>
    <td style="padding:12px 0 8px 0;">
      <div style="font-size:17px;font-weight:700;line-height:24px;color:#111827;">${displayName || "姓名 / Name"}</div>
      ${displayTitle ? `<div style="font-size:13px;line-height:19px;color:#4B5563;">${displayTitle}</div>` : ""}
      ${displayDept ? `<div style="font-size:12px;line-height:18px;color:#6B7280;">${displayDept}</div>` : ""}
      <div style="font-size:12px;line-height:18px;color:#FF5000;font-weight:700;padding-top:2px;">${company.name}</div>
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
        ${contactRow("mail.jpg", "Email", data.email, data.email ? `mailto:${data.email}` : "")}
        ${contactRow("tel.jpg", "Phone", personalPhone)}
        ${contactRow("web.jpg", "Website", company.web, `https://${company.web}`)}
        ${contactRow("map.jpg", "Address", company.address)}
        ${contactRow("fax.jpg", "Fax", company.fax)}
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top:10px;">
      <a href="${company.facebook}" style="display:inline-block;margin-right:6px;text-decoration:none;"><img src="${assetUrl("fb.jpg")}" width="30" height="30" alt="Facebook" style="border:0;display:block;"></a>
      <a href="${company.instagram}" style="display:inline-block;margin-right:6px;text-decoration:none;"><img src="${assetUrl("ig.jpg")}" width="30" height="30" alt="Instagram" style="border:0;display:block;"></a>
      <a href="${company.youtube}" style="display:inline-block;text-decoration:none;"><img src="${assetUrl("yt.jpg")}" width="30" height="30" alt="YouTube" style="border:0;display:block;"></a>
    </td>
  </tr>
  <tr>
    <td style="padding-top:10px;">
      <img src="${assetUrl("ESG.jpg")}" width="508" height="31" alt="ESG" style="max-width:100%;display:block;border:0;">
    </td>
  </tr>
</table>`;
}

function buildTextSignature(data) {
  return [
    [data.nameCn, data.nameEn].filter(Boolean).join(" / ") || "姓名 / Name",
    [data.titleCn, data.titleEn].filter(Boolean).join(" / "),
    [data.deptCn, data.deptEn].filter(Boolean).join(" / "),
    company.name,
    data.email ? `Email: ${data.email}` : "",
    [data.mobile, data.ext && `ext. ${data.ext}`].filter(Boolean).join(" / "),
    `${company.web} | ${company.address}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function render() {
  const data = collectData();
  preview.innerHTML = buildHtmlSignature(data);
}

function setStatus(message) {
  statusEl.textContent = message;
  window.setTimeout(() => {
    if (statusEl.textContent === message) statusEl.textContent = "";
  }, 2400);
}

async function copyRichSignature() {
  const data = collectData();
  const html = buildHtmlSignature(data);
  const text = buildTextSignature(data);

  if ("ClipboardItem" in window) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      }),
    ]);
    setStatus("已複製，可貼到 Gmail 簽名欄位。");
    return;
  }

  await navigator.clipboard.writeText(html);
  setStatus("瀏覽器不支援 HTML 複製，已改複製 HTML 原始碼。");
}

async function copyHtmlSource() {
  await navigator.clipboard.writeText(buildHtmlSignature(collectData()));
  setStatus("已複製 HTML 原始碼。");
}

async function copyTextSignature() {
  await navigator.clipboard.writeText(buildTextSignature(collectData()));
  setStatus("已複製純文字簽名檔。");
}

form.addEventListener("input", render);
copyRichBtn.addEventListener("click", () => copyRichSignature().catch(() => {
  setStatus("複製失敗，請確認瀏覽器允許剪貼簿權限。");
}));
copyHtmlBtn.addEventListener("click", () => copyHtmlSource().catch(() => {
  setStatus("複製失敗，請確認瀏覽器允許剪貼簿權限。");
}));
copyTextBtn.addEventListener("click", () => copyTextSignature().catch(() => {
  setStatus("複製失敗，請確認瀏覽器允許剪貼簿權限。");
}));

render();
