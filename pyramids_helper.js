// ==UserScript==
// @name           Pyramids Helper
// @namespace      GreaseMonkey
// @description    Highlights playable card
// @match          *://www.neopets.com/games/pyramids/*
// @author         @willnjohnson
// @grant          none
// @run-at         document-end
// ==/UserScript==

(() => {
  const R = /\/(\d+)_\w+\.gif/;
  const hl = el => { if(el){el.style.border='2px solid magenta'; el.style.boxSizing='border-box'; el.style.boxShadow='magenta 0 0 12px 3px';} };
  const spImg = () => document.querySelector('a[href="pyramids.phtml?action=draw"] img');
  const faceRank = () => {
    for(const i of document.querySelectorAll("img[src*='mcards/']")){
      if(i.src.includes("backs")||i.src.includes("empty")) continue;
      if(i.parentElement?.tagName==='A' && i.parentElement.href.includes("action=play")) continue;
      const m = R.exec(i.src); if(m) return +m[1];
    }
  };
  const playable = () => [...document.querySelectorAll("a[href*='action=play&position=']")]
    .map(a=>{
      const p=/position=(\d+)/.exec(a.href), i=a.querySelector("img[src*='mcards/']"), r=i&&R.exec(i.src);
      return p&&r?{pos:+p[1], rank:+r[1], el:a}:null;
    }).filter(Boolean);
  const adj = r => [r>2?r-1:14, r<14?r+1:2];
  const maxChain = (face,cards) => {
    const valid = cards.filter(c => { const [l,h] = adj(face); return c.rank===l||c.rank===h; });
    if(!valid.length) return 0;
    return 1+Math.max(...valid.map(c => maxChain(c.rank, cards.filter(x=>x.pos!==c.pos))));
  };

  const face = faceRank();
  if(!face) return;
  const plays = playable();
  if(!plays.length){ hl(spImg()); return; }
  const valid = plays.filter(c => {
    const [l,h] = adj(face);
    return c.rank===l||c.rank===h;
  });
  if(!valid.length){ hl(spImg()); return; }

  let best=valid[0], bestLen=0;
  for(const c of valid){
    const len = maxChain(c.rank, plays.filter(p => p.pos!==c.pos));
    if(len>bestLen){ bestLen=len; best=c; }
  }
  hl(best.el.querySelector('img'));
})();
