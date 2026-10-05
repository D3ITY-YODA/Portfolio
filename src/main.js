import "./styles.css";
import { profile, groups, projects, articles, facts } from "./data.js";

const $ = (selector) => document.querySelector(selector);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const bytes = (n) => Array.from(crypto.getRandomValues(new Uint8Array(n)));
const hex = (n) => bytes(n).map((b) => b.toString(16).padStart(2, "0")).join("");
const b64 = (n) => btoa(String.fromCharCode(...bytes(n))).replace(/[=+/]/g, "x");
const bech = (n) => bytes(n).map((b) => "qpzry9x8gf2tvdw0s3jn54khce6mua7l"[b % 32]).join("");

const brand = $("#brand");
brand.textContent = profile.name;
$("#intro-name").textContent = profile.name;
$("#foot-name").textContent = `${profile.name}, ${profile.location}`;
document.title = `${profile.name} – Backend developer in Kisumu`;

const out = $("#probe-out");
const btn = $("#probe-btn");
const note = $("#probe-note");
const idleNote = note.textContent;
let stage = 0;
let token = null;

const addLine = (html, cls = "") => {
  const d = document.createElement("div");
  d.className = `ln ${cls}`.trim();
  d.innerHTML = html;
  out.appendChild(d);
};

const play = async (lines) => {
  btn.disabled = true;
  for (const [html, cls] of lines) {
    addLine(html, cls);
    if (!reduce) await sleep(240);
  }
  btn.disabled = false;
};

const colorize = (line) =>
  esc(line).replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;)(\s*:)?|\b(true|false|null)\b|(-?\b\d+\b)/g, (m, str, colon, lit, num) => {
    if (str) return colon ? `<span class="k">${str}</span>${colon}` : `<span class="s">${str}</span>`;
    if (lit || num) return `<span class="n">${m}</span>`;
    return m;
  });

const bodyLines = () => {
  const body = {
    name: profile.name,
    role: "Backend developer",
    location: profile.location,
    stack: ["Go", "Spring Boot", "PostgreSQL", "LND"],
    projects: projects.length,
    building: projects.filter((p) => p.tone === "active").map((p) => p.title)
  };
  return JSON.stringify(body, null, 2).split("\n").map((l) => [colorize(l), ""]);
};

const reset = () => {
  out.innerHTML = "";
  addLine("Waiting for a request.", "dim");
  note.textContent = idleNote;
  btn.textContent = "Send request";
  stage = 0;
};

btn.addEventListener("click", async () => {
  if (stage === 0) {
    out.innerHTML = "";
    token = { macaroon: b64(24), invoice: `lnbc210n1${bech(56)}`, preimage: hex(32) };
    await play([
      ["HTTP/1.1 402 Payment Required", "bad"],
      [`WWW-Authenticate: L402 macaroon="${token.macaroon.slice(0, 20)}…"`, ""],
      [`invoice="${token.invoice.slice(0, 30)}…"`, ""],
      ["Pay the invoice to get the preimage.", "dim"]
    ]);
    note.textContent = "Demo invoice, generated in your browser. It can't be paid for real.";
    btn.textContent = "Pay invoice";
    stage = 1;
  } else if (stage === 1) {
    await play([
      [`preimage: ${token.preimage.slice(0, 26)}…`, "dim"],
      [`Authorization: L402 ${token.macaroon.slice(0, 8)}…:${token.preimage.slice(0, 8)}…`, ""],
      ["HTTP/1.1 200 OK", "good"],
      ["", ""],
      ...bodyLines()
    ]);
    note.textContent = "Paid. The gateway checked the preimage and stored it so it can't be reused.";
    btn.textContent = "Start over";
    stage = 2;
  } else {
    reset();
  }
});

reset();

const filtersEl = $("#filters");
const countEl = $("#count");
const listEl = $("#plist");
const detailEl = $("#detail");
const state = { tag: null, id: projects[0].id };

const visible = () => projects.filter((p) => !state.tag || p.tags.includes(state.tag));

const usedTags = new Set(projects.flatMap((p) => p.tags));

filtersEl.innerHTML = groups
  .map((g) => ({ ...g, tags: g.tags.filter((t) => usedTags.has(t)) }))
  .filter((g) => g.tags.length)
  .map(
    (g) => `<div class="fgroup"><span class="fgroup-label">${esc(g.label)}</span>${g.tags
      .map((t) => `<button type="button" class="chip" data-tag="${esc(t)}" aria-pressed="false">${esc(t)}</button>`)
      .join("")}</div>`
  )
  .join("");

const renderList = () => {
  const items = visible();
  if (!items.some((p) => p.id === state.id)) state.id = items[0] ? items[0].id : null;
  filtersEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.tag === state.tag)));
  countEl.innerHTML = state.tag
    ? `Showing ${items.length} of ${projects.length} projects that use ${esc(state.tag)}. <button type="button" class="linkish" id="clear">Show all</button>`
    : `${projects.length} projects`;
  listEl.innerHTML = items
    .map(
      (p) => `<li><button type="button" class="pitem" data-id="${p.id}" aria-current="${p.id === state.id}"><span class="pt">${esc(p.title)}</span><span class="pl">${esc(p.line)}</span></button></li>`
    )
    .join("");
  const project = projects.find((p) => p.id === state.id);
  detailEl.innerHTML = project
    ? `<h3>${esc(project.title)}</h3>
       ${project.status ? `<span class="status ${project.tone}">${esc(project.status)}</span>` : ""}
       <p class="summary">${esc(project.summary)}</p>
       ${project.points.length ? `<ul>${project.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
       ${project.tags.length ? `<div class="tags">${project.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}`
    : `<p class="summary">No projects use ${esc(state.tag)} yet.</p>`;
};

filtersEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  state.tag = state.tag === chip.dataset.tag ? null : chip.dataset.tag;
  renderList();
});
countEl.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    state.tag = null;
    renderList();
  }
});
listEl.addEventListener("click", (e) => {
  const item = e.target.closest(".pitem");
  if (!item) return;
  state.id = item.dataset.id;
  renderList();
  const again = listEl.querySelector(`[data-id="${state.id}"]`);
  if (again) again.focus();
});
renderList();

$("#articles").innerHTML = articles
  .map((a) => {
    const title = a.href
      ? `<a class="at" href="${esc(a.href)}" target="_blank" rel="noopener">${esc(a.title)}</a>`
      : `<span class="at">${esc(a.title)}</span>`;
    return `<li>${title}<span class="an">${esc(a.note)}</span></li>`;
  })
  .join("");

$("#facts").innerHTML = facts.map(([what, where]) => `<div class="fact"><dt>${esc(what)}</dt><dd>${esc(where)}</dd></div>`).join("");

const contact = [];
if (profile.links.email) contact.push(`<a class="btn primary" href="mailto:${esc(profile.links.email)}">Email me</a>`);
if (profile.links.github) contact.push(`<a class="btn" href="${esc(profile.links.github)}" target="_blank" rel="noopener">GitHub</a>`);
if (profile.links.devto) contact.push(`<a class="btn" href="${esc(profile.links.devto)}" target="_blank" rel="noopener">dev.to</a>`);
$("#contact-links").innerHTML = contact.join("");
$("#place").textContent = `Based in ${profile.location} (${profile.timezone}).`;
