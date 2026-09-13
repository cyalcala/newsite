// Preserve the deployed bundle, and reuse its licensed font files as static assets.
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync('build/index.html', 'utf8');
const dir = 'docs/overhaul/archive';
fs.mkdirSync(dir, {recursive:true});
if (!fs.existsSync(`${dir}/original-bundle.html`)) fs.writeFileSync(`${dir}/original-bundle.html`, html);
function payload(type) {
 const tag = `<script type="${type}">`, start = html.indexOf(tag) + tag.length;
 return JSON.parse(html.slice(start,html.indexOf('</script>',start)));
}
const manifest=payload('__bundler/manifest'), template=payload('__bundler/template');
fs.mkdirSync('build/assets/fonts',{recursive:true});
let css=''; const found=new Set();
for(const match of template.matchAll(/@font-face\s*\{[^}]+\}/g)) {
 let rule=match[0];
 const id=rule.match(/url\(["']?([^"')]+)/)?.[1];
 if(!id||!manifest[id]) continue;
 const font=manifest[id];
 if(!found.has(id)) {fs.writeFileSync(`build/assets/fonts/${id}.woff2`,Buffer.from(font.data,'base64'));found.add(id);}
 rule=rule.replace(id,`/assets/fonts/${id}.woff2`);
 css+=rule+'\n';
}
fs.mkdirSync('src',{recursive:true});
fs.writeFileSync('src/fonts.css',css);
console.log(`Preserved bundle and extracted ${found.size} font subsets.`);
