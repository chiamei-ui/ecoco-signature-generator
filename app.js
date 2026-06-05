const company = {
  name: "凡立橙股份有限公司",
  nameEn: "FUN LEAD CHANGE CO., LTD.",
  address: "701016台南市東區崇學路5號",
  addressEn: "No. 5, Chongxue Rd., East Dist., Tainan City 701016, Taiwan",
  tel: "06-2225050",
  telEn: "+886-6-2225050",
  fax: "06-3133987",
  faxEn: "+886-6-3133987",
  emailDomain: "ecocogroup.com",
  web: "www.ecocogroup.com",
  facebook: "https://www.facebook.com/ecoco.tw",
  instagram: "https://www.instagram.com/ecoco.tw",
  youtube: "https://www.youtube.com/@ecoco",
};

const officeTweaks = {
  south: {
    label: "南部辦公室",
    phoneMode: "office",
    showFax: true,
  },
  north: {
    label: "北部辦公室",
    phoneMode: "mobile",
    showFax: false,
  },
};

const assetBase = "./assets/signature-assets";
const form = document.querySelector("#signature-form");
const preview = document.querySelector("#signature-preview");
const statusEl = document.querySelector("#copy-status");
const copyRichBtn = document.querySelector("#copy-rich");
const previewFrame = document.querySelector(".preview-frame");
const mobileField = document.querySelector('[data-field="mobile"]');
const extField = document.querySelector('[data-field="ext"]');
const signatureWidth = 520;
let validationActive = false;

function field(name) {
  return form.elements[name].value.trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function assetUrl(fileName) {
  return new URL(`${assetBase}/${fileName}`, window.location.href).href;
}

function currentOffice() {
  return officeTweaks[field("office")] || officeTweaks.south;
}

function currentLanguage() {
  return document.querySelector('input[name="signatureLang"]:checked')?.value || "zh";
}

function emailAddress(data) {
  const account = data.emailAccount.replace(/@.*/, "");
  return account ? `${account}@${company.emailDomain}` : "";
}

function setupRequiredLabels() {
  form.querySelectorAll("label").forEach((label) => {
    const input = label.querySelector("input[required]");
    const title = label.querySelector(":scope > span");
    if (!input || !title || title.querySelector(".required-mark")) return;

    title.classList.add("field-title");
    title.insertAdjacentHTML(
      "beforeend",
      '<span class="required-mark" aria-hidden="true">*</span><span class="field-error" hidden>請填寫</span>',
    );
  });
}

function validateRequiredFields({ showErrors = false } = {}) {
  let firstInvalid = null;

  form.querySelectorAll("input[required]").forEach((input) => {
    const label = input.closest("label");
    const error = label?.querySelector(".field-error");
    const isInvalid = input.value.trim() === "";

    label?.classList.toggle("field-invalid", showErrors && isInvalid);
    input.setAttribute("aria-invalid", showErrors && isInvalid ? "true" : "false");

    if (error) {
      error.hidden = !(showErrors && isInvalid);
    }

    if (isInvalid && !firstInvalid) {
      firstInvalid = input;
    }
  });

  if (showErrors && firstInvalid) {
    firstInvalid.focus();
  }

  return !firstInvalid;
}

function titleLine(data) {
  const titles = [data.titleCn, data.titleCn2].filter(Boolean).join(" 暨 ");
  return [titles, data.deptCn].filter(Boolean).join("｜");
}

function titleLineEn(data) {
  const titles = [data.titleEn, data.titleEn2].filter(Boolean).join(" and ");
  return [titles, data.deptEn].filter(Boolean).join(" | ");
}

function phoneLine(data, office, lang = "zh") {
  if (office.phoneMode === "mobile") return data.mobile;
  const tel = lang === "en" ? company.telEn : company.tel;
  return [tel, data.ext ? `ext.${data.ext}` : ""].filter(Boolean).join(" ");
}

function contactRow(icon, label, value, href = "") {
  if (!value) return "";

  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:#004fe5;text-decoration:underline;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `<tr>
    <td style="width:22px;padding:0 6px 3px 0;vertical-align:top;">
      <img src="${assetUrl(icon)}" width="14" height="14" alt="${escapeHtml(label)}" style="display:block;border:0;">
    </td>
    <td style="padding:0 0 3px 0;color:rgb(68,68,68);font-size:12px;line-height:17px;vertical-align:top;">${content}</td>
  </tr>`;
}

function collectData() {
  return {
    office: field("office"),
    nameCn: field("nameCn"),
    nameEn: field("nameEn"),
    titleCn: field("titleCn"),
    titleCn2: field("titleCn2"),
    deptCn: field("deptCn"),
    titleEn: field("titleEn"),
    titleEn2: field("titleEn2"),
    deptEn: field("deptEn"),
    emailAccount: field("emailAccount"),
    mobile: field("mobile"),
    ext: field("ext"),
  };
}

function buildHtmlSignature(data, lang = currentLanguage()) {
  const office = currentOffice();
  const email = emailAddress(data);
  const isEnglish = lang === "en";
  const personName = escapeHtml(
    isEnglish
      ? data.nameEn || data.nameCn || "Name"
      : [data.nameCn, data.nameEn].filter(Boolean).join(" ") || "Name",
  );
  const personTitle = escapeHtml(
    (isEnglish ? titleLineEn(data) : titleLine(data)) ||
      (isEnglish ? "Title | Department" : "職稱｜部門"),
  );
  const companyName = isEnglish ? company.nameEn : company.name;
  const address = isEnglish ? company.addressEn : company.address;
  const esgImage = isEnglish ? "ESG-en.jpg" : "ESG.jpg";

  return `<table cellpadding="0" cellspacing="0" role="presentation" style="width:520px;max-width:520px;font-family:Verdana,Arial,'Microsoft JhengHei','PingFang TC',sans-serif;color:rgb(68,68,68);border-collapse:collapse;">
  <tr>
    <td style="padding:0 0 18px 0;font-size:11px;line-height:16px;color:rgb(68,68,68);">Best regards,</td>
  </tr>
  <tr>
    <td style="padding:0 0 18px 0;">
      <div style="font-size:18px;line-height:24px;color:rgb(68,68,68);font-weight:400;">${personName}</div>
      <div style="font-size:12px;line-height:18px;color:rgb(68,68,68);">${personTitle}</div>
    </td>
  </tr>
  <tr>
    <td style="padding:0 0 6px 0;">
      <div style="font-size:18px;line-height:24px;color:#ff5000;font-weight:700;">${escapeHtml(companyName)}</div>
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
        ${contactRow("map.jpg", isEnglish ? "Address" : "地址", address)}
        ${contactRow("tel.jpg", office.phoneMode === "mobile" ? (isEnglish ? "Mobile" : "手機") : (isEnglish ? "Phone" : "電話"), phoneLine(data, office, lang))}
        ${office.showFax ? contactRow("fax.jpg", isEnglish ? "Fax" : "傳真", isEnglish ? company.faxEn : company.fax) : ""}
        ${contactRow("mail.jpg", "Email", email, email ? `mailto:${email}` : "")}
        ${contactRow("web.jpg", isEnglish ? "Website" : "網站", company.web, `https://${company.web}`)}
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 0 14px 8px;">
      <img src="${assetUrl("logo.jpg")}" width="210" alt="ECOCO 宜可可循環經濟" style="display:block;border:0;">
    </td>
  </tr>
  <tr>
    <td style="padding:0 0 20px 8px;">
      <a href="${company.facebook}" style="display:inline-block;margin-right:8px;text-decoration:none;"><img src="${assetUrl("fb.jpg")}" width="32" height="32" alt="Facebook" style="border:0;display:block;"></a>
      <a href="${company.instagram}" style="display:inline-block;margin-right:8px;text-decoration:none;"><img src="${assetUrl("ig.jpg")}" width="32" height="32" alt="Instagram" style="border:0;display:block;"></a>
      <a href="${company.youtube}" style="display:inline-block;text-decoration:none;"><img src="${assetUrl("yt.jpg")}" width="32" height="32" alt="YouTube" style="border:0;display:block;"></a>
    </td>
  </tr>
  <tr>
    <td style="padding:0;">
      <img src="${assetUrl(esgImage)}" width="510" alt="ECOCO ESG" style="display:block;border:0;max-width:100%;">
    </td>
  </tr>
</table>`;
}

function buildTextSignature(data, lang = currentLanguage()) {
  const office = currentOffice();
  const email = emailAddress(data);
  const isEnglish = lang === "en";
  return [
    "Best regards,",
    "",
    isEnglish
      ? data.nameEn || data.nameCn || "Name"
      : [data.nameCn, data.nameEn].filter(Boolean).join(" ") || "Name",
    isEnglish ? titleLineEn(data) : titleLine(data),
    "",
    isEnglish ? company.nameEn : company.name,
    isEnglish ? company.addressEn : company.address,
    phoneLine(data, office, lang),
    office.showFax ? (isEnglish ? company.faxEn : company.fax) : "",
    email,
    company.web,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function syncOfficeFields() {
  const office = currentOffice();
  const isNorth = office.phoneMode === "mobile";
  mobileField.hidden = !isNorth;
  extField.hidden = isNorth;
  form.elements.mobile.required = false;
  form.elements.ext.required = false;
}

function fitPreviewToFrame() {
  const signature = preview.firstElementChild;
  if (!signature) return;

  const frameStyle = window.getComputedStyle(previewFrame);
  const framePadding =
    parseFloat(frameStyle.paddingLeft) + parseFloat(frameStyle.paddingRight);
  const availableWidth = previewFrame.clientWidth - framePadding;
  const scale = Math.min(1, availableWidth / signatureWidth);
  preview.style.setProperty("--preview-scale", scale);
  preview.style.height = `${signature.offsetHeight * scale}px`;
}

function render() {
  syncOfficeFields();
  if (validationActive) validateRequiredFields({ showErrors: true });
  const data = collectData();
  preview.innerHTML = buildHtmlSignature(data, currentLanguage());
  window.requestAnimationFrame(fitPreviewToFrame);
}

function setStatus(message) {
  statusEl.textContent = message;
  window.setTimeout(() => {
    if (statusEl.textContent === message) statusEl.textContent = "";
  }, 2400);
}

async function copyRichSignature() {
  syncOfficeFields();
  validationActive = true;
  if (!validateRequiredFields({ showErrors: true })) {
    setStatus("請先補齊紅字標示的必填欄位。");
    return;
  }

  const data = collectData();
  const lang = currentLanguage();
  const html = buildHtmlSignature(data, lang);
  const text = buildTextSignature(data, lang);

  if ("ClipboardItem" in window) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      }),
    ]);
    setStatus("已複製，可貼到 Gmail 簽名檔設定。");
    return;
  }

  await navigator.clipboard.writeText(html);
  setStatus("瀏覽器不支援富文字複製，已改複製 HTML。");
}

form.addEventListener("input", render);
form.addEventListener("change", render);
document
  .querySelectorAll('input[name="signatureLang"]')
  .forEach((input) => input.addEventListener("change", render));
window.addEventListener("resize", fitPreviewToFrame);
copyRichBtn.addEventListener("click", () =>
  copyRichSignature().catch(() => {
    setStatus("複製失敗，請確認瀏覽器權限後再試一次。");
  }),
);

setupRequiredLabels();
render();
