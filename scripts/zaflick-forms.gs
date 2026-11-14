/**
 * Zaflick forms (Google Apps Script project "Zaflick forms" on marketing@zaflick.com).
 *
 * Receives the Founding Testers, 6am Club and Contact forms from zaflick.com, plus a copy of every
 * early-list sign-up (member number, tracking tags, referral code), and adds one row per
 * submission to the matching tab. The "Referrals" tab counts sign-ups per referral code. Deployed as a web app: Execute as marketing@zaflick.com,
 * Who has access: Anyone. The /exec URL goes into NEXT_PUBLIC_FORMS_ENDPOINT (package.json, build:live).
 *
 * This file is a copy for reference; the live code is in the Apps Script project.
 * It writes to the "Zaflick forms" sheet in marketing@'s Drive, by ID.
 */
const SHEET_ID = "1GWavo5dkIjQ5uSkpuwvAfiJLe5bGYjXaS4Q9XM3cTxc";
const TABS = {
  "founding-tester": { name: "Founding Testers", fields: ["name", "email", "city", "for", "training", "often", "size", "instagram", "problem"] },
  "6am-club": { name: "6am Club", fields: ["name", "email", "city", "activity"] },
  contact: { name: "Contact", fields: ["name", "email", "topic", "message"] },
  "early-list": { name: "Early list", fields: ["member_number", "email", "form", "piece"] },
};
const EXTRA = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref", "page"];

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return reply(false, "bad_json");
  }
  const tab = TABS[data.kind];
  if (!tab) return reply(false, "unknown_form");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || ""))) return reply(false, "bad_email");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getTab(tab);
    sheet.appendRow([new Date()].concat(tab.fields.concat(EXTRA).map((k) => clean(data[k]))));
    return reply(true);
  } finally {
    lock.releaseLock();
  }
}

/** Lets you open the /exec URL in a browser to check the deployment is up. */
function doGet() {
  return reply(true, "zaflick-forms");
}

function getTab(tab) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(tab.name);
  if (!sheet) {
    sheet = ss.insertSheet(tab.name);
    sheet.appendRow(["received_at"].concat(tab.fields, EXTRA));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight("bold");
  }
  return sheet;
}

/** Plain text only: nothing from the internet becomes a formula, and long answers are capped. */
function clean(v) {
  let s = v == null ? "" : String(v).slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply(ok, note) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, note: note || "" })).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor: creates the three tabs with headers and removes the empty Sheet1. */
function setup() {
  Object.keys(TABS).forEach((k) => getTab(TABS[k]));
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const first = ss.getSheetByName("Sheet1");
  if (first && first.getLastRow() === 0) ss.deleteSheet(first);
}

/**
 * Run once from the editor: creates the "Early list" tab and a "Referrals" tab that counts
 * sign-ups per referral code (codes look like Z87, from each member's share link).
 * Early list columns: A received_at, B member_number, C email, D form, E piece, F-I utm_*, J ref, K page.
 */
function setupReferrals() {
  getTab(TABS["early-list"]);
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName("Referrals") || ss.insertSheet("Referrals");
  sheet.clear();
  sheet
    .getRange("A1")
    .setFormula(
      `=QUERY('Early list'!A:K, "select J, count(C) where J starts with 'Z' group by J order by count(C) desc label J 'referral code', count(C) 'sign-ups'", 1)`
    );
}
