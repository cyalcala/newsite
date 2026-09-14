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
 menu.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click',()=>{
   setTimeout(()=>{menu.open=false},60);
  });
 });
}

// Smooth inquiry overlay dialog
const dialog=document.getElementById('inquiry-dialog');
if(dialog){
 const closeBtn=dialog.querySelector('.inquiry-close-btn');
 const backdrop=dialog.querySelector('.inquiry-backdrop');
 const doneBtn=dialog.querySelector('.form-done-btn');
 const firstInput=dialog.querySelector('#inquiry-name');

 function openDialog(){
  dialog.classList.add('is-active');
  void dialog.offsetWidth;
  dialog.classList.add('is-visible');
  document.body.style.overflow='hidden';
  if(window.innerWidth>700&&firstInput){
   setTimeout(()=>{firstInput.focus()},120);
  }
 }

 function closeDialog(){
  dialog.classList.remove('is-visible');
  document.body.style.overflow='';
  setTimeout(()=>{dialog.classList.remove('is-active')},280);
 }

 document.addEventListener('click',e=>{
  const trigger=e.target.closest('.open-inquiry-btn, a[href="#contact"], a[href="#inquiry"]');
  if(trigger){
   e.preventDefault();
   const m=document.querySelector('.mobile-nav');
   if(m&&m.open)m.open=false;
   openDialog();
  }
 });

 if(closeBtn)closeBtn.addEventListener('click',closeDialog);
 if(backdrop)backdrop.addEventListener('click',closeDialog);
 if(doneBtn)doneBtn.addEventListener('click',closeDialog);

 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&dialog.classList.contains('is-visible')){
   closeDialog();
  }
 });
}

// Progressive enhancement for native contact form
const form=document.querySelector('.inquiry-form');
const successBox=document.getElementById('inquiry-success');
if(form&&successBox){
 const submitBtn=form.querySelector('.form-button');
 const btnText=submitBtn?submitBtn.querySelector('.btn-text'):null;
 const nameInput=form.querySelector('[name="entry.25383299"]');
 const emailInput=form.querySelector('[name="entry.668403667"]');
 const detailsInput=form.querySelector('[name="entry.923088650"]');
 const errName=document.getElementById('err-name');
 const errEmail=document.getElementById('err-email');
 const errDetails=document.getElementById('err-details');
 const resetBtn=successBox.querySelector('.form-reset-btn');

 function validate(){
  let valid=true;
  if(errName)errName.textContent='';
  if(errEmail)errEmail.textContent='';
  if(errDetails)errDetails.textContent='';
  if(nameInput)nameInput.classList.remove('invalid');
  if(emailInput)emailInput.classList.remove('invalid');
  if(detailsInput)detailsInput.classList.remove('invalid');

  if(!nameInput||!nameInput.value.trim()){
   if(errName)errName.textContent='Please enter your name.';
   if(nameInput)nameInput.classList.add('invalid');
   valid=false;
  }
  const emailVal=emailInput?emailInput.value.trim():'';
  if(!emailVal||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)){
   if(errEmail)errEmail.textContent='Please enter a valid email address.';
   if(emailInput)emailInput.classList.add('invalid');
   valid=false;
  }
  if(!detailsInput||!detailsInput.value.trim()){
   if(errDetails)errDetails.textContent='Please tell me a little about the project.';
   if(detailsInput)detailsInput.classList.add('invalid');
   valid=false;
  }
  return valid;
 }

 form.addEventListener('submit',async event=>{
  const hp=form.querySelector('[name="inquiry_hp"]');
  if(hp&&hp.value){
   event.preventDefault();
   form.hidden=true;
   successBox.hidden=false;
   return;
  }

  if(!validate()){
   event.preventDefault();
   const firstInvalid=form.querySelector('.invalid');
   if(firstInvalid)firstInvalid.focus();
   return;
  }

  event.preventDefault();
  if(submitBtn){
   submitBtn.disabled=true;
   if(btnText)btnText.textContent='Sending inquiry...';
  }

  try{
   const formData=new FormData(form);
   const params=new URLSearchParams();
   for(const [key,val] of formData.entries()){
    if(key!=='inquiry_hp')params.append(key,val);
   }

   await fetch(form.action,{
    method:'POST',
    mode:'no-cors',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:params.toString()
   });

   form.hidden=true;
   successBox.hidden=false;
  }catch(err){
   // Fallback to hidden iframe submit if fetch fails
   form.submit();
   form.hidden=true;
   successBox.hidden=false;
  }finally{
   if(submitBtn){
    submitBtn.disabled=false;
    if(btnText)btnText.textContent='Send inquiry';
   }
  }
 });

 if(resetBtn){
  resetBtn.addEventListener('click',()=>{
   form.reset();
   form.hidden=false;
   successBox.hidden=true;
   if(nameInput)nameInput.focus();
  });
 }
}

