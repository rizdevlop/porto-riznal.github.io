const header=document.getElementById('header');
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
const typed=document.getElementById('typed');
const roles=['antarmuka sampai server.','API yang cepat.','database yang rapi.','produk yang siap rilis.'];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent=new Date().getFullYear();
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
menuBtn.addEventListener('click',()=>{
const open=nav.classList.toggle('open');
menuBtn.setAttribute('aria-expanded',open);
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
nav.classList.remove('open');
menuBtn.setAttribute('aria-expanded','false');
}));
const io=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}});
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const links=[...nav.querySelectorAll('a:not(.nav-cta)')];
const spy=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}
});
},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>spy.observe(s));
let r=0,c=0,del=false;
function type(){
const word=roles[r];
typed.textContent=word.slice(0,c);
if(!del&&c<word.length){c++;setTimeout(type,70)}
else if(!del){del=true;setTimeout(type,1800)}
else if(c>0){c--;setTimeout(type,35)}
else{del=false;r=(r+1)%roles.length;setTimeout(type,300)}
}
if(reduce){typed.textContent=roles[0]}else{type()}