// Shared helpers: decode / re-encode the bundler template safely.
const fs = require('fs');
const FILE = 'C:/Users/admin/Desktop/cyrusalcala-newsite/build/index.html';
const OPEN = '<script type="__bundler/template">';
const CLOSE = '<\/script>';

function read() {
  const html = fs.readFileSync(FILE, 'utf8');
  const i = html.indexOf(OPEN);
  if (i < 0) throw new Error('template script not found');
  const start = i + OPEN.length;
  const end = html.indexOf(CLOSE, start);
  return { html, start, end, raw: html.slice(start, end), tpl: JSON.parse(html.slice(start, end)) };
}

// Re-encode: JSON-escape, force pure ASCII (charset-independent), then restore
// the generator's closing-tag escape so no "</script>" can end the host script.
// NOTE: the stored payload is a *quoted* JSON string literal (preceded by a
// newline), so keep JSON.stringify's outer quotes here.
function encode(tpl) {
  let s = JSON.stringify(tpl);
  s = s.replace(/[^\x00-\x7F]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
  return '\n' + s.split('</').join('<\\u002F');
}

function payload(html, type) {
  const tag = '<script type="' + type + '">';
  const i = html.indexOf(tag);
  if (i < 0) throw new Error('missing script ' + type);
  const s = i + tag.length;
  return html.slice(s, html.indexOf(CLOSE, s));
}

function write(state, newTpl) {
  const encoded = encode(newTpl);
  if (encoded.includes('</')) throw new Error('unescaped </ would break the script tag');
  const out = state.html.slice(0, state.start) + encoded + state.html.slice(state.end);
  if (JSON.parse(payload(out, '__bundler/template')) !== newTpl) throw new Error('round-trip mismatch');
  JSON.parse(payload(out, '__bundler/manifest'));
  fs.writeFileSync(FILE, out);
  return out.length;
}

module.exports = { read, write, encode, FILE };
