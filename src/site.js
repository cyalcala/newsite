// Small enhancements only. Content, links, menu, and media work without JS.
const legacy={'#samples':'/work/video/#samples','#showreel':'/work/video/#showreel','#proof':'/hire/#experience','#writing':'/about/#writing','#how':'/services/#how'};
if(location.pathname==='/'&&legacy[location.hash])location.replace(legacy[location.hash]);
document.querySelectorAll('video').forEach(video=>{
 video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause()}));
});
const menu=document.querySelector('.mobile-nav');
if(menu){
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus()}});
 document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false});
 menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.open=false));
}
