const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const petals=document.getElementById('petals');
for(let i=0;i<22;i++){const petal=document.createElement('i');petal.className='petal';petal.style.cssText=`--left:${(i*47)%100}%;--duration:${13+i%9}s;--delay:-${i*1.7}s;width:${7+i%6}px;height:${12+i%8}px`;petals.append(petal)}
let paused=reduced.matches;
const toggle=document.getElementById('motion');
function reflect(){document.body.classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume petals':'Pause petals'}
reflect();toggle.addEventListener('click',()=>{paused=!paused;reflect();update()});
let queued=false;const layers=[...document.querySelectorAll('[data-parallax]')];
function update(){queued=false;for(const layer of layers){const box=layer.parentElement.getBoundingClientRect();layer.style.transform=(!paused&&!reduced.matches)?`translateY(${-box.top*Number(layer.dataset.parallax)}px)`:'none'}}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});reduced.addEventListener('change',()=>{paused=reduced.matches;reflect();update()});update();
