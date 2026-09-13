const fs=require('node:fs');
const base=process.argv[2];if(!base)throw new Error('Provide deployment base URL');
const paths=['/','/work/','/services/','/about/','/hire/','/work/va-freelance-hub/','/work/techwriter-bot/','/work/cyrusalcala/','/work/video/','/assets/Cyrus-Alcala-Resume.docx','/assets/Google-AI-Professional-Certificate.pdf','/assets/social-card.png','/site.css','/site.js','/robots.txt','/sitemap.xml','/missing-page-check'];
(async()=>{
 const results=[];
 for(let i=0;i<paths.length;i+=4){
  const group=await Promise.all(paths.slice(i,i+4).map(async p=>{
   try{const r=await fetch(base+p,{signal:AbortSignal.timeout(30000)});const b=await r.arrayBuffer();return {path:p,status:r.status,type:r.headers.get('content-type'),bytes:b.byteLength,ok:r.status===(p==='/missing-page-check'?404:200)}}catch(e){return {path:p,error:e.message,ok:false}}
  }));results.push(...group);
 }
 const report={base,date:new Date().toISOString(),results};
 const name=base.includes('cyrusalcala.com')?'production':'preview';
 fs.writeFileSync(`docs/overhaul/qa/${name}-http.json`,JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));if(results.some(r=>!r.ok))process.exitCode=1;
})();
