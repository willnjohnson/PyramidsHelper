// ==UserScript==
// @name           Pyramids Autoplayer
// @namespace      GreaseMonkey
// @description    Auto-plays Neopets Pyramids
// @match          *://www.neopets.com/games/pyramids/*
// @author         @willnjohnson
// @grant          none
// @run-at         document-end
// ==/UserScript==

(() => {
  const R = /\/(\d+)_\w+\.gif/;
  const hl = el => { if(el){el.style.border='2px solid magenta'; el.style.boxSizing='border-box'; el.style.boxShadow='magenta 0 0 12px 3px';} };
  const clickHl = (el,min=500,max=750) => { if(!el) return;
    if(["input[value='Play Pyramids Again!']", "a[href*='pyramids.phtml?action=collect']"].some(s=>el.matches?.(s))) {
      setTimeout(()=>el.click(),Math.random()*(max-min)+min); return;
    }
    if(el.tagName==='A'){const i=el.querySelector('img'); if(i){hl(i); setTimeout(()=>el.click(),Math.random()*(max-min)+min); return;}}
    hl(el); setTimeout(()=>el.click(),Math.random()*(max-min)+min);
  };
  const faceRank = () => {
    for(const i of document.querySelectorAll("img[src*='mcards/']")){
      if(i.src.includes("backs")||i.src.includes("empty")) continue;
      if(i.parentElement?.tagName==='A' && i.parentElement.href.includes("action=play")) continue;
      const m=R.exec(i.src); if(m) return +m[1];
    }
  };
  const playable = () => [...document.querySelectorAll("a[href*='action=play&position=']")]
    .map(a=>{
      const p=/position=(\d+)/.exec(a.href), i=a.querySelector("img[src*='mcards/']"), r=i&&R.exec(i.src);
      return p&&r?{pos:+p[1],rank:+r[1],el:a}:null;
    }).filter(Boolean);
  const adj = r => [r>2?r-1:14, r<14?r+1:2];
  const maxChain = (face,cards) => {
    const valid = cards.filter(c => { const [l,h] = adj(face); return c.rank===l||c.rank===h; });
    if(!valid.length) return 0;
    return 1+Math.max(...valid.map(c => maxChain(c.rank, cards.filter(x=>x.pos!==c.pos))));
  };

  if(document.querySelector("input[value='Play Pyramids Again!']"))
    return clickHl(document.querySelector("input[value='Play Pyramids Again!']"),1000,1500);
  if(document.querySelector("a[href*='pyramids.phtml?action=collect']"))
    return clickHl(document.querySelector("a[href*='pyramids.phtml?action=collect']"),1000,1500);

  const face=faceRank();
  if(!face) return;
  const plays=playable(), [left,right]=adj(face);
  const valid=plays.filter(c=>c.rank===left||c.rank===right);
  if(valid.length){
    let best=valid[0],bestScore=0;
    for(const m of valid){
      const score=maxChain(m.rank, plays.filter(c=>c.pos!==m.pos));
      if(score>bestScore){bestScore=score; best=m;}
    }
    clickHl(best.el,500,1500);
    return;
  }
  const draw=document.querySelector("a[href='pyramids.phtml?action=draw']");
  if(draw) clickHl(draw.querySelector('img')||draw,750,1000);
})();
