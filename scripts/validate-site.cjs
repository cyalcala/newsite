const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const pages=require('../src/pages.cjs');
const issues=[];const checked=[];
for(const page of pages){
 const file=page.path==='/'?'build/index.html':`build${page.path}index.html`;
 const html=fs.readFileSync(file,'utf8');
 if((html.match(/<h1[ >]/g)||[]).length!==1)issues.push(`${file}: expected one H1`);
 if(!html.includes('<main id="main">'))issues.push(`${file}: missing main`);
 for(const m of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)){
  const url=m[1];if(/^(https?:|mailto:|data:)/.test(url))continue;
  const [pathname,hash]=url.split('#');
  let target=pathname?path.join('build',pathname):file;
  if(pathname.endsWith('/'))target=path.join(target,'index.html');
  if(!fs.existsSync(target)){issues.push(`${file}: missing ${url}`);continue;}
  if(hash&&target.endsWith('.html')&&!fs.readFileSync(target,'utf8').includes(`id="${hash}"`))issues.push(`${file}: missing anchor ${url}`);
 }
 checked.push({path:page.path,bytes:Buffer.byteLength(html)});
}
const archive='docs/overhaul/archive/original-bundle.html';
if(!fs.existsSync(archive))issues.push('Missing archived original bundle');
for(let n=1;n<=10;n++)for(const ext of ['mp4','webp'])if(!fs.existsSync(`build/use-${String(n).padStart(2,'0')}.${ext}`))issues.push(`Missing sample ${n}.${ext}`);
const report={date:new Date().toISOString(),pages:checked,cssBytes:fs.statSync('build/site.css').size,jsBytes:fs.statSync('build/site.js').size,originalBundleSHA256:fs.existsSync(archive)?crypto.createHash('sha256').update(fs.readFileSync(archive)).digest('hex'):null,issues};
fs.mkdirSync('docs/overhaul/qa',{recursive:true});fs.writeFileSync('docs/overhaul/qa/static-validation.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));if(issues.length)process.exitCode=1;
