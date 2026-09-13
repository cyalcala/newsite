// Local-only responsive harness: real iframe viewport when host resizing is unavailable.
const fs=require('node:fs');
for(const [name,width,height] of [['phone',375,812],['tablet',768,1024],['small',360,800]]){
 fs.writeFileSync(`build/review-${name}.html`,`<!doctype html><html><head><meta charset="utf-8"><title>Local responsive review</title><style>html,body{margin:0;padding:0;background:#ddd}iframe{border:0;display:block;width:${width}px;height:${height}px}</style></head><body><iframe title="Responsive site preview" src="/" width="${width}" height="${height}"></iframe></body></html>`);
}
