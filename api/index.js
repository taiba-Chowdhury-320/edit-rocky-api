module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Edit Rocky API</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

:root{
  --c1:#0affb0;
  --c2:#ff3cac;
  --c3:#784ba0;
  --c4:#2b86c5;
  --bg:#03040a;
  --card:#0a0b14;
  --border:rgba(255,255,255,0.06);
}

html{scroll-behavior:smooth}

body{
  background:var(--bg);
  color:#fff;
  font-family:'Syne',sans-serif;
  min-height:100vh;
  overflow-x:hidden;
  cursor:none;
}

/* Custom cursor */
#cur{
  position:fixed;
  width:12px;height:12px;
  background:var(--c1);
  border-radius:50%;
  pointer-events:none;
  z-index:9999;
  transition:transform .15s ease;
  mix-blend-mode:difference;
}
#cur2{
  position:fixed;
  width:36px;height:36px;
  border:1px solid var(--c1);
  border-radius:50%;
  pointer-events:none;
  z-index:9998;
  transition:all .25s ease;
  mix-blend-mode:difference;
  opacity:.5;
}

/* Canvas bg */
#bgCanvas{
  position:fixed;
  inset:0;
  z-index:0;
  opacity:.4;
}

/* Noise overlay */
body::before{
  content:'';
  position:fixed;
  inset:0;
  z-index:1;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events:none;
  opacity:.5;
}

/* Glow blobs */
.blob{
  position:fixed;
  border-radius:50%;
  filter:blur(120px);
  pointer-events:none;
  z-index:0;
  animation:blobMove ease-in-out infinite;
}
.b1{width:600px;height:600px;background:rgba(10,255,176,.07);top:-200px;left:-200px;animation-duration:14s;}
.b2{width:500px;height:500px;background:rgba(255,60,172,.06);bottom:-150px;right:-100px;animation-duration:18s;animation-delay:4s;}
.b3{width:400px;height:400px;background:rgba(43,134,197,.05);top:40%;left:35%;animation-duration:22s;animation-delay:8s;}
@keyframes blobMove{
  0%,100%{transform:translate(0,0) scale(1);}
  33%{transform:translate(30px,-40px) scale(1.06);}
  66%{transform:translate(-20px,20px) scale(.96);}
}

/* Wrapper */
.wrap{
  position:relative;
  z-index:10;
  max-width:1140px;
  margin:0 auto;
  padding:0 24px;
}

/* NAV */
nav{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:32px 0 28px;
}
.logo{
  font-family:'Space Mono',monospace;
  font-size:14px;
  font-weight:700;
  color:var(--c1);
  letter-spacing:2px;
  text-transform:uppercase;
  text-decoration:none;
}
.logo span{color:#fff;opacity:.3;}
.pill{
  display:flex;
  align-items:center;
  gap:8px;
  border:1px solid rgba(10,255,176,.25);
  border-radius:100px;
  padding:8px 20px;
  font-family:'Space Mono',monospace;
  font-size:11px;
  color:var(--c1);
  letter-spacing:1px;
  background:rgba(10,255,176,.05);
  backdrop-filter:blur(10px);
}
.led{
  width:7px;height:7px;
  background:var(--c1);
  border-radius:50%;
  box-shadow:0 0 10px var(--c1),0 0 20px var(--c1);
  animation:ledPulse 2s infinite;
}
@keyframes ledPulse{
  0%,100%{opacity:1;}
  50%{opacity:.3;}
}

/* HERO */
.hero{
  padding:90px 0 80px;
  position:relative;
}
.hero-eyebrow{
  font-family:'Space Mono',monospace;
  font-size:11px;
  letter-spacing:4px;
  color:rgba(255,255,255,.3);
  text-transform:uppercase;
  margin-bottom:28px;
}
.hero-eyebrow span{
  color:var(--c1);
  border-bottom:1px solid var(--c1);
  padding-bottom:2px;
}

.hero-title{
  font-size:clamp(52px,10vw,110px);
  font-weight:800;
  line-height:.95;
  letter-spacing:-3px;
  margin-bottom:30px;
  overflow:hidden;
}
.hero-title .line{
  display:block;
  animation:slideUp .8s cubic-bezier(.16,1,.3,1) both;
}
.hero-title .line:nth-child(2){animation-delay:.1s;}
.hero-title .line:nth-child(3){animation-delay:.2s;}
@keyframes slideUp{
  from{transform:translateY(100%);opacity:0;}
  to{transform:translateY(0);opacity:1;}
}
.hero-title .grd{
  background:linear-gradient(135deg,var(--c1) 0%,var(--c4) 50%,var(--c2) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
}
.hero-title .strk{
  -webkit-text-stroke:2px rgba(255,255,255,.15);
  -webkit-text-fill-color:transparent;
}

.hero-by{
  display:flex;
  align-items:center;
  gap:16px;
  margin-bottom:50px;
}
.hero-by-line{width:40px;height:1px;background:rgba(255,255,255,.15);}
.hero-by-text{
  font-family:'Space Mono',monospace;
  font-size:12px;
  color:rgba(255,255,255,.3);
  letter-spacing:2px;
}
.hero-by-name{
  font-size:15px;
  font-weight:700;
  background:linear-gradient(135deg,var(--c2),var(--c3),var(--c4));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  letter-spacing:.5px;
}

/* Big URL display */
.hero-url{
  display:inline-flex;
  align-items:center;
  gap:16px;
  background:rgba(255,255,255,.03);
  border:1px solid var(--border);
  border-left:3px solid var(--c1);
  border-radius:12px;
  padding:18px 28px;
  font-family:'Space Mono',monospace;
  font-size:13px;
  color:rgba(255,255,255,.5);
  max-width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  transition:border-color .3s;
}
.hero-url:hover{border-left-color:var(--c2);}
.hero-url .method{
  background:var(--c1);
  color:#000;
  font-size:10px;
  font-weight:700;
  padding:3px 10px;
  border-radius:4px;
  flex-shrink:0;
}
.hero-url .url-text{color:#fff;opacity:.7;}

/* MARQUEE */
.marquee-wrap{
  overflow:hidden;
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  padding:18px 0;
  margin:60px 0;
  position:relative;
}
.marquee-wrap::before,.marquee-wrap::after{
  content:'';
  position:absolute;
  top:0;bottom:0;
  width:120px;
  z-index:2;
}
.marquee-wrap::before{left:0;background:linear-gradient(90deg,var(--bg),transparent);}
.marquee-wrap::after{right:0;background:linear-gradient(-90deg,var(--bg),transparent);}
.marquee-track{
  display:flex;
  gap:0;
  width:max-content;
  animation:marqueeRoll 25s linear infinite;
}
@keyframes marqueeRoll{from{transform:translateX(0);}to{transform:translateX(-50%)}}
.marquee-item{
  font-family:'Space Mono',monospace;
  font-size:12px;
  color:rgba(255,255,255,.2);
  letter-spacing:3px;
  text-transform:uppercase;
  padding:0 40px;
  white-space:nowrap;
}
.marquee-item .accent{color:var(--c1);}

/* STATS ROW */
.stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:2px;
  margin-bottom:80px;
  border:1px solid var(--border);
  border-radius:20px;
  overflow:hidden;
}
.stat{
  padding:36px 28px;
  background:var(--card);
  position:relative;
  overflow:hidden;
  transition:background .3s;
}
.stat::after{
  content:'';
  position:absolute;
  bottom:0;left:0;right:0;
  height:2px;
  background:linear-gradient(90deg,var(--c1),var(--c4),var(--c2));
  transform:scaleX(0);
  transform-origin:left;
  transition:transform .4s ease;
}
.stat:hover{background:#0d0e1a;}
.stat:hover::after{transform:scaleX(1);}
.stat-n{
  font-family:'Space Mono',monospace;
  font-size:38px;
  font-weight:700;
  color:var(--c1);
  line-height:1;
  margin-bottom:8px;
}
.stat-l{
  font-size:11px;
  color:rgba(255,255,255,.25);
  letter-spacing:2px;
  text-transform:uppercase;
}

/* SECTION */
.sec-head{
  display:flex;
  align-items:center;
  gap:16px;
  margin-bottom:32px;
}
.sec-num{
  font-family:'Space Mono',monospace;
  font-size:11px;
  color:rgba(255,255,255,.2);
  letter-spacing:2px;
}
.sec-title{
  font-size:13px;
  font-weight:700;
  letter-spacing:3px;
  text-transform:uppercase;
  color:rgba(255,255,255,.4);
}
.sec-line{flex:1;height:1px;background:var(--border);}

/* CARDS GRID */
.grid4{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:16px;
  margin-bottom:16px;
}
.grid4-full{
  display:grid;
  grid-template-columns:1fr;
  gap:16px;
  margin-bottom:80px;
}
.card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:20px;
  padding:30px;
  transition:all .35s cubic-bezier(.16,1,.3,1);
  position:relative;
  overflow:hidden;
}
.card::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg,transparent,var(--c1),transparent);
  opacity:0;
  transition:opacity .4s;
}
.card:hover{
  transform:translateY(-8px);
  border-color:rgba(10,255,176,.2);
  background:#0c0d18;
}
.card:hover::before{opacity:1;}

.card-ico{
  font-size:28px;
  margin-bottom:20px;
  display:block;
}
.card-lbl{
  font-family:'Space Mono',monospace;
  font-size:10px;
  color:var(--c1);
  letter-spacing:3px;
  text-transform:uppercase;
  margin-bottom:14px;
}
.card code{
  font-family:'Space Mono',monospace;
  font-size:12.5px;
  color:rgba(255,255,255,.5);
  line-height:2;
  background:rgba(0,0,0,.4);
  border:1px solid rgba(255,255,255,.05);
  border-radius:10px;
  padding:14px 16px;
  display:block;
  word-break:break-all;
}
.card code .hl{color:var(--c4);}
.card code .hl2{color:var(--c1);}

/* EXAMPLES */
.examples{display:flex;flex-direction:column;gap:10px;}
.ex{
  display:flex;
  align-items:flex-start;
  gap:16px;
  background:rgba(0,0,0,.3);
  border:1px solid rgba(255,255,255,.04);
  border-radius:12px;
  padding:16px 20px;
  transition:border-color .3s;
}
.ex:hover{border-color:rgba(10,255,176,.15);}
.ex-num{
  font-family:'Space Mono',monospace;
  font-size:10px;
  color:rgba(255,255,255,.15);
  padding-top:2px;
  flex-shrink:0;
  width:24px;
}
.ex-code{
  font-family:'Space Mono',monospace;
  font-size:12px;
  color:rgba(255,255,255,.4);
  line-height:1.6;
}
.ex-code .p{color:var(--c2);}
.ex-code .v{color:var(--c1);}

/* FOOTER */
footer{
  border-top:1px solid var(--border);
  padding:60px 0 50px;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  gap:20px;
}
.ft-name{
  font-size:clamp(36px,7vw,72px);
  font-weight:800;
  letter-spacing:-2px;
  line-height:1;
  background:linear-gradient(135deg,var(--c2) 0%,var(--c3) 40%,var(--c4) 70%,var(--c1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
}
.ft-role{
  font-family:'Space Mono',monospace;
  font-size:11px;
  color:rgba(255,255,255,.2);
  letter-spacing:3px;
  text-transform:uppercase;
}
.ft-bottom{
  display:flex;
  align-items:center;
  gap:20px;
  margin-top:10px;
}
.ft-tag{
  font-family:'Space Mono',monospace;
  font-size:10px;
  color:rgba(255,255,255,.15);
  letter-spacing:2px;
}
.ft-dot{width:3px;height:3px;background:rgba(255,255,255,.1);border-radius:50%;}

@media(max-width:700px){
  .stats{grid-template-columns:repeat(2,1fr);}
  .grid4{grid-template-columns:1fr;}
  .hero-title{letter-spacing:-2px;}
  nav{flex-direction:column;gap:16px;align-items:flex-start;}
}
</style>
</head>
<body>

<div id="cur"></div>
<div id="cur2"></div>
<canvas id="bgCanvas"></canvas>
<div class="blob b1"></div>
<div class="blob b2"></div>
<div class="blob b3"></div>

<div class="wrap">

  <!-- NAV -->
  <nav>
    <a class="logo" href="#">ERA<span>/</span>API</a>
    <div class="pill"><div class="led"></div>LIVE &nbsp;•&nbsp; ALL SYSTEMS GO</div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-eyebrow">✦ AI IMAGE EDITING &nbsp;•&nbsp; <span>EDIT ROCKY API</span></div>
    <h1 class="hero-title">
      <span class="line grd">Edit</span>
      <span class="line strk">Rocky</span>
      <span class="line grd">API.</span>
    </h1>
    <div class="hero-by">
      <div class="hero-by-line"></div>
      <div class="hero-by-text">CREATED BY</div>
      <div class="hero-by-name">Rocky Chowdhury</div>
    </div>
    <div class="hero-url">
      <span class="method">GET</span>
      <span class="url-text">edit-rocky-api-ttmy.vercel.app/generate?prompt=...&url=...</span>
    </div>
  </section>

</div>

<!-- MARQUEE -->
<div class="marquee-wrap">
  <div class="marquee-track">
    <span class="marquee-item">AI IMAGE EDITING <span class="accent">✦</span></span>
    <span class="marquee-item">ROCKY CHOWDHURY <span class="accent">✦</span></span>
    <span class="marquee-item">EDIT ROCKY API <span class="accent">✦</span></span>
    <span class="marquee-item">POWERED BY AI <span class="accent">✦</span></span>
    <span class="marquee-item">FREE TO USE <span class="accent">✦</span></span>
    <span class="marquee-item">INSTRUCT PIX2PIX <span class="accent">✦</span></span>
    <span class="marquee-item">VERCEL HOSTED <span class="accent">✦</span></span>
    <span class="marquee-item">AI IMAGE EDITING <span class="accent">✦</span></span>
    <span class="marquee-item">ROCKY CHOWDHURY <span class="accent">✦</span></span>
    <span class="marquee-item">EDIT ROCKY API <span class="accent">✦</span></span>
    <span class="marquee-item">POWERED BY AI <span class="accent">✦</span></span>
    <span class="marquee-item">FREE TO USE <span class="accent">✦</span></span>
    <span class="marquee-item">INSTRUCT PIX2PIX <span class="accent">✦</span></span>
    <span class="marquee-item">VERCEL HOSTED <span class="accent">✦</span></span>
  </div>
</div>

<div class="wrap">

  <!-- STATS -->
  <div class="stats">
    <div class="stat"><div class="stat-n">∞</div><div class="stat-l">Requests</div></div>
    <div class="stat"><div class="stat-n">AI</div><div class="stat-l">Powered</div></div>
    <div class="stat"><div class="stat-n">0$</div><div class="stat-l">Cost</div></div>
    <div class="stat"><div class="stat-n">24/7</div><div class="stat-l">Online</div></div>
  </div>

  <!-- API REFERENCE -->
  <div class="sec-head">
    <div class="sec-num">01</div>
    <div class="sec-title">API Reference</div>
    <div class="sec-line"></div>
  </div>

  <div class="grid4">
    <div class="card">
      <span class="card-ico">📡</span>
      <div class="card-lbl">Endpoint</div>
      <code><span class="hl2">GET</span> /generate<br><span class="hl">?prompt</span>=your prompt<br><span class="hl">&url</span>=image link</code>
    </div>
    <div class="card">
      <span class="card-ico">📦</span>
      <div class="card-lbl">Parameters</div>
      <code><span class="hl">prompt</span> — required<br><span class="hl">url</span> — required<br><span class="hl">imageUrl</span> — alt param</code>
    </div>
    <div class="card">
      <span class="card-ico">🤖</span>
      <div class="card-lbl">Model</div>
      <code>Flux Image AI<br>Image Editing<br>Timeout: <span class="hl2">120s</span></code>
    </div>
    <div class="card">
      <span class="card-ico">🔓</span>
      <div class="card-lbl">Access</div>
      <code>Method: <span class="hl2">GET/POST</span><br>Auth: <span class="hl2">None</span><br>CORS: <span class="hl2">Enabled ✓</span></code>
    </div>
  </div>

  <!-- EXAMPLES -->
  <div class="sec-head" style="margin-top:60px">
    <div class="sec-num">02</div>
    <div class="sec-title">Example Prompts</div>
    <div class="sec-line"></div>
  </div>

  <div class="grid4-full">
    <div class="card">
      <div class="examples">
        <div class="ex"><div class="ex-num">01</div><div class="ex-code">?<span class="p">prompt</span>=<span class="v">make it cartoon</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-num">02</div><div class="ex-code">?<span class="p">prompt</span>=<span class="v">add a cat</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-num">03</div><div class="ex-code">?<span class="p">prompt</span>=<span class="v">change background to beach</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-num">04</div><div class="ex-code">?<span class="p">prompt</span>=<span class="v">make it black and white</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-num">05</div><div class="ex-code">?<span class="p">prompt</span>=<span class="v">add snow effect</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-num">06</div><div class="ex-code">?<span class="p">prompt</span>=<span class="v">remove background</span>&url=IMAGE_URL</div></div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="ft-name">Rocky Chowdhury</div>
    <div class="ft-role">Developer &nbsp;•&nbsp; Edit Rocky API</div>
    <div class="ft-bottom">
      <div class="ft-tag">EDIT ROCKY API</div>
      <div class="ft-dot"></div>
      <div class="ft-tag">VERCEL</div>
      <div class="ft-dot"></div>
      <div class="ft-tag">AI POWERED</div>
      <div class="ft-dot"></div>
      <div class="ft-tag">FREE</div>
    </div>
  </footer>

</div>

<script>
// Custom cursor
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx=0,my=0,cx=0,cy=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cur.style.left=(mx-6)+'px';
  cur.style.top=(my-6)+'px';
});
setInterval(()=>{
  cx+=(mx-cx)*.15; cy+=(my-cy)*.15;
  cur2.style.left=(cx-18)+'px';
  cur2.style.top=(cy-18)+'px';
},16);
document.querySelectorAll('.card,.stat,.ex,.pill').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.transform='scale(2.5)';
    cur2.style.transform='scale(1.5)';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.transform='scale(1)';
    cur2.style.transform='scale(1)';
  });
});

// Canvas animated background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize',()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});

const lines = [];
for(let i=0;i<8;i++){
  lines.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-.5)*.4,
    vy:(Math.random()-.5)*.4,
    len:Math.random()*200+100,
    opacity:Math.random()*.15+.05,
    color:['#0affb0','#ff3cac','#2b86c5'][Math.floor(Math.random()*3)]
  });
}

function drawFrame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  lines.forEach(l=>{
    l.x+=l.vx; l.y+=l.vy;
    if(l.x<0||l.x>canvas.width) l.vx*=-1;
    if(l.y<0||l.y>canvas.height) l.vy*=-1;
    const grad=ctx.createLinearGradient(l.x,l.y,l.x+l.len,l.y+l.len*.5);
    grad.addColorStop(0,'transparent');
    grad.addColorStop(.5,l.color);
    grad.addColorStop(1,'transparent');
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.globalAlpha=l.opacity;
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x+l.len,l.y+l.len*.3);
    ctx.stroke();
    ctx.globalAlpha=1;
  });
  requestAnimationFrame(drawFrame);
}
drawFrame();
</script>
</body>
</html>`);
};
