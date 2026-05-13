module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Edit Rocky API — Rocky Chowdhury</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --g:#00ffaa;
  --b:#00aaff;
  --p:#aa55ff;
  --r:#ff3366;
  --bg:#04050f;
}
html{scroll-behavior:smooth}
body{
  background:var(--bg);
  color:#fff;
  font-family:'Syne',sans-serif;
  min-height:100vh;
  overflow-x:hidden;
}

/* ═══ ANIMATED BACKGROUND ═══ */
#scene{
  position:fixed;
  inset:0;
  z-index:0;
  overflow:hidden;
}

/* Deep space gradient */
#scene::before{
  content:'';
  position:absolute;
  inset:0;
  background:
    radial-gradient(ellipse 120% 80% at 15% 25%, rgba(0,255,170,.12) 0%, transparent 55%),
    radial-gradient(ellipse 100% 100% at 85% 75%, rgba(0,170,255,.10) 0%, transparent 55%),
    radial-gradient(ellipse 80% 80% at 50% 50%, rgba(170,85,255,.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 10%, rgba(255,51,102,.08) 0%, transparent 50%),
    linear-gradient(180deg, #04050f 0%, #060818 50%, #04050f 100%);
  animation: gradShift 12s ease-in-out infinite alternate;
}
@keyframes gradShift{
  0%{filter:hue-rotate(0deg) brightness(1);}
  100%{filter:hue-rotate(30deg) brightness(1.1);}
}

/* Aurora waves */
.aurora{
  position:absolute;
  width:200%;
  height:300px;
  border-radius:50%;
  filter:blur(60px);
  opacity:.15;
  animation:auroraMove ease-in-out infinite;
}
.a1{
  background:linear-gradient(90deg,transparent,var(--g),var(--b),transparent);
  top:15%;left:-50%;
  animation-duration:16s;
}
.a2{
  background:linear-gradient(90deg,transparent,var(--p),var(--r),transparent);
  top:55%;left:-30%;
  animation-duration:22s;
  animation-delay:5s;
  opacity:.1;
}
.a3{
  background:linear-gradient(90deg,transparent,var(--b),var(--g),transparent);
  top:80%;left:-40%;
  animation-duration:18s;
  animation-delay:10s;
}
@keyframes auroraMove{
  0%{transform:translateX(0) scaleY(1);}
  50%{transform:translateX(20%) scaleY(1.3);}
  100%{transform:translateX(0) scaleY(1);}
}

/* Floating orbs */
.orb{
  position:absolute;
  border-radius:50%;
  filter:blur(100px);
  animation:orbDrift ease-in-out infinite;
}
.o1{width:700px;height:700px;background:rgba(0,255,170,.06);top:-200px;left:-200px;animation-duration:20s;}
.o2{width:600px;height:600px;background:rgba(0,170,255,.06);bottom:-200px;right:-200px;animation-duration:25s;animation-delay:7s;}
.o3{width:500px;height:500px;background:rgba(170,85,255,.05);top:30%;left:30%;animation-duration:30s;animation-delay:13s;}
.o4{width:400px;height:400px;background:rgba(255,51,102,.04);top:60%;right:10%;animation-duration:22s;animation-delay:3s;}
@keyframes orbDrift{
  0%,100%{transform:translate(0,0) scale(1);}
  25%{transform:translate(40px,-50px) scale(1.1);}
  50%{transform:translate(-30px,30px) scale(.95);}
  75%{transform:translate(20px,40px) scale(1.05);}
}

/* Star field */
#stars{position:absolute;inset:0;}
.star{
  position:absolute;
  background:#fff;
  border-radius:50%;
  animation:starTwinkle ease-in-out infinite;
}
@keyframes starTwinkle{
  0%,100%{opacity:.1;transform:scale(1);}
  50%{opacity:.8;transform:scale(1.5);}
}

/* Grid */
.grid-bg{
  position:absolute;
  inset:0;
  background-image:
    linear-gradient(rgba(0,255,170,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,255,170,.025) 1px,transparent 1px);
  background-size:80px 80px;
  animation:gridPan 40s linear infinite;
}
@keyframes gridPan{to{transform:translate(80px,80px);}}

/* Scan line */
.scan{
  position:absolute;
  width:100%;
  height:2px;
  background:linear-gradient(90deg,transparent,var(--g),transparent);
  opacity:.15;
  animation:scanDown 8s linear infinite;
  box-shadow:0 0 20px var(--g);
}
@keyframes scanDown{
  0%{top:-2px;}
  100%{top:100%;}
}

/* ═══ CURSOR ═══ */
#c1{position:fixed;width:10px;height:10px;background:var(--g);border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:screen;transition:transform .1s;}
#c2{position:fixed;width:30px;height:30px;border:1px solid rgba(0,255,170,.5);border-radius:50%;pointer-events:none;z-index:9998;transition:all .2s ease;}

/* ═══ LAYOUT ═══ */
.wrap{position:relative;z-index:10;max-width:1160px;margin:0 auto;padding:0 28px;}

/* NAV */
nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:36px 0 32px;
  border-bottom:1px solid rgba(255,255,255,.05);
  margin-bottom:0;
}
.logo{
  font-family:'Space Mono',monospace;
  font-size:13px;font-weight:700;
  color:var(--g);letter-spacing:3px;
  text-transform:uppercase;text-decoration:none;
}
.logo em{color:rgba(255,255,255,.2);font-style:normal;}
.online{
  display:flex;align-items:center;gap:9px;
  border:1px solid rgba(0,255,170,.2);
  border-radius:100px;padding:9px 22px;
  font-family:'Space Mono',monospace;
  font-size:11px;color:var(--g);
  letter-spacing:2px;
  background:rgba(0,255,170,.04);
  backdrop-filter:blur(20px);
}
.led{width:7px;height:7px;background:var(--g);border-radius:50%;box-shadow:0 0 8px var(--g),0 0 16px var(--g);animation:ledPulse 2s infinite;}
@keyframes ledPulse{0%,100%{opacity:1;box-shadow:0 0 6px var(--g);}50%{opacity:.3;box-shadow:0 0 20px var(--g),0 0 40px var(--g);}}

/* HERO */
.hero{padding:100px 0 80px;text-align:center;}

.eyebrow{
  display:inline-flex;align-items:center;gap:12px;
  font-family:'Space Mono',monospace;font-size:11px;
  color:rgba(255,255,255,.25);letter-spacing:4px;
  text-transform:uppercase;margin-bottom:36px;
}
.eyebrow span{color:var(--g);border-bottom:1px solid rgba(0,255,170,.3);padding-bottom:2px;}

.hero-title{
  font-size:clamp(56px,12vw,130px);
  font-weight:800;line-height:.9;
  letter-spacing:-4px;
  margin-bottom:24px;
}
.ht-line{
  display:block;
  animation:revealUp .9s cubic-bezier(.16,1,.3,1) both;
}
.ht-line:nth-child(2){animation-delay:.12s;}
.ht-line:nth-child(3){animation-delay:.24s;}
@keyframes revealUp{
  from{opacity:0;transform:translateY(60px) skewY(3deg);}
  to{opacity:1;transform:translateY(0) skewY(0);}
}
.grad-text{
  background:linear-gradient(135deg,var(--g) 0%,var(--b) 40%,var(--p) 75%,var(--r) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 0 40px rgba(0,255,170,.3));
}
.outline-text{
  -webkit-text-stroke:2px rgba(255,255,255,.12);
  -webkit-text-fill-color:transparent;
}

/* Author */
.author{
  display:inline-flex;align-items:center;gap:20px;
  margin:28px 0 50px;
  padding:14px 32px;
  border:1px solid rgba(255,255,255,.06);
  border-radius:100px;
  background:rgba(255,255,255,.02);
  backdrop-filter:blur(20px);
}
.auth-by{font-family:'Space Mono',monospace;font-size:10px;color:rgba(255,255,255,.2);letter-spacing:3px;}
.auth-line{width:1px;height:20px;background:rgba(255,255,255,.1);}
.auth-name{
  font-size:16px;font-weight:700;
  background:linear-gradient(135deg,var(--r),var(--p),var(--b));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:.5px;
}

/* URL pill */
.url-pill{
  display:inline-flex;align-items:center;gap:14px;
  border:1px solid rgba(0,255,170,.15);
  border-radius:14px;padding:16px 28px;
  font-family:'Space Mono',monospace;font-size:12px;
  color:rgba(255,255,255,.4);
  background:rgba(0,255,170,.03);
  backdrop-filter:blur(10px);
  max-width:90vw;overflow:hidden;
  transition:border-color .3s;
}
.url-pill:hover{border-color:rgba(0,255,170,.4);}
.method{
  background:var(--g);color:#000;
  font-size:10px;font-weight:700;
  padding:4px 12px;border-radius:6px;
  flex-shrink:0;letter-spacing:1px;
}
.url-text{color:rgba(255,255,255,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* MARQUEE */
.mq-wrap{
  overflow:hidden;
  border-top:1px solid rgba(255,255,255,.04);
  border-bottom:1px solid rgba(255,255,255,.04);
  padding:20px 0;margin:80px 0;
  position:relative;
}
.mq-wrap::before,.mq-wrap::after{
  content:'';position:absolute;top:0;bottom:0;width:150px;z-index:2;
}
.mq-wrap::before{left:0;background:linear-gradient(90deg,var(--bg),transparent);}
.mq-wrap::after{right:0;background:linear-gradient(-90deg,var(--bg),transparent);}
.mq-track{
  display:flex;width:max-content;
  animation:mq 22s linear infinite;
}
@keyframes mq{to{transform:translateX(-50%);}}
.mq-item{
  font-family:'Space Mono',monospace;font-size:11px;
  color:rgba(255,255,255,.15);letter-spacing:4px;
  text-transform:uppercase;padding:0 48px;white-space:nowrap;
}
.mq-item .a{color:var(--g);}

/* STATS */
.stats{
  display:grid;grid-template-columns:repeat(4,1fr);
  border:1px solid rgba(255,255,255,.05);
  border-radius:24px;overflow:hidden;
  margin-bottom:90px;
}
.stat{
  padding:40px 28px;
  background:rgba(255,255,255,.02);
  position:relative;overflow:hidden;
  transition:background .4s;
  border-right:1px solid rgba(255,255,255,.05);
}
.stat:last-child{border-right:none;}
.stat::after{
  content:'';position:absolute;
  bottom:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--g),var(--b),var(--p));
  transform:scaleX(0);transform-origin:left;
  transition:transform .5s ease;
}
.stat:hover{background:rgba(0,255,170,.04);}
.stat:hover::after{transform:scaleX(1);}
.sn{
  font-family:'Space Mono',monospace;
  font-size:42px;font-weight:700;
  color:var(--g);line-height:1;
  margin-bottom:10px;
  text-shadow:0 0 30px rgba(0,255,170,.3);
}
.sl{font-size:11px;color:rgba(255,255,255,.2);letter-spacing:3px;text-transform:uppercase;}

/* SECTIONS */
.sh{
  display:flex;align-items:center;gap:18px;
  margin-bottom:36px;
}
.sh-n{font-family:'Space Mono',monospace;font-size:11px;color:rgba(255,255,255,.15);letter-spacing:2px;}
.sh-t{font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.3);}
.sh-l{flex:1;height:1px;background:rgba(255,255,255,.05);}

/* CARDS */
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:16px;}
.g1{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:90px;}
.card{
  background:rgba(255,255,255,.02);
  border:1px solid rgba(255,255,255,.06);
  border-radius:22px;padding:32px;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
}
.card::before{
  content:'';position:absolute;
  top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--g),transparent);
  opacity:0;transition:opacity .4s;
}
.card:hover{
  transform:translateY(-8px);
  border-color:rgba(0,255,170,.15);
  background:rgba(0,255,170,.03);
  box-shadow:0 20px 60px rgba(0,0,0,.3),0 0 0 1px rgba(0,255,170,.08);
}
.card:hover::before{opacity:1;}
.ci{font-size:30px;margin-bottom:22px;display:block;}
.cl{
  font-family:'Space Mono',monospace;font-size:10px;
  color:var(--g);letter-spacing:3px;text-transform:uppercase;
  margin-bottom:16px;
}
.card code{
  font-family:'Space Mono',monospace;font-size:12px;
  color:rgba(255,255,255,.4);line-height:2;
  background:rgba(0,0,0,.4);
  border:1px solid rgba(255,255,255,.04);
  border-radius:12px;padding:16px 18px;
  display:block;word-break:break-all;
}
.card code .h1{color:var(--b);}
.card code .h2{color:var(--g);}
.card code .h3{color:var(--p);}

/* EXAMPLES */
.exs{display:flex;flex-direction:column;gap:10px;}
.ex{
  display:flex;align-items:flex-start;gap:18px;
  background:rgba(0,0,0,.25);
  border:1px solid rgba(255,255,255,.04);
  border-radius:14px;padding:18px 22px;
  transition:all .3s;
}
.ex:hover{
  border-color:rgba(0,255,170,.12);
  background:rgba(0,255,170,.02);
  transform:translateX(6px);
}
.ex-n{
  font-family:'Space Mono',monospace;font-size:10px;
  color:rgba(255,255,255,.1);padding-top:2px;
  flex-shrink:0;width:20px;
}
.ex-c{font-family:'Space Mono',monospace;font-size:12px;color:rgba(255,255,255,.35);line-height:1.7;}
.ex-c .p{color:var(--r);}
.ex-c .v{color:var(--g);}

/* FOOTER */
footer{
  border-top:1px solid rgba(255,255,255,.05);
  padding:80px 0 60px;
  text-align:center;
  position:relative;
  overflow:hidden;
}
footer::before{
  content:'';position:absolute;
  top:0;left:50%;transform:translateX(-50%);
  width:400px;height:1px;
  background:linear-gradient(90deg,transparent,var(--g),transparent);
  box-shadow:0 0 30px var(--g);
}
.ft-name{
  font-size:clamp(44px,9vw,90px);
  font-weight:800;letter-spacing:-3px;line-height:1;
  background:linear-gradient(135deg,var(--r) 0%,var(--p) 30%,var(--b) 60%,var(--g) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:20px;
  filter:drop-shadow(0 0 60px rgba(0,255,170,.15));
}
.ft-role{
  font-family:'Space Mono',monospace;font-size:11px;
  color:rgba(255,255,255,.15);letter-spacing:4px;
  text-transform:uppercase;margin-bottom:32px;
}
.ft-tags{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;}
.ft-tag{
  font-family:'Space Mono',monospace;font-size:10px;
  color:rgba(255,255,255,.12);letter-spacing:2px;
  padding:8px 18px;
  border:1px solid rgba(255,255,255,.05);
  border-radius:100px;
}

@media(max-width:720px){
  .stats{grid-template-columns:repeat(2,1fr);}
  .g2{grid-template-columns:1fr;}
  .hero-title{letter-spacing:-2px;}
  nav{flex-direction:column;gap:16px;align-items:flex-start;}
  #c1,#c2{display:none;}
}
</style>
</head>
<body>

<div id="c1"></div>
<div id="c2"></div>

<!-- ANIMATED BG -->
<div id="scene">
  <div class="aurora a1"></div>
  <div class="aurora a2"></div>
  <div class="aurora a3"></div>
  <div class="orb o1"></div>
  <div class="orb o2"></div>
  <div class="orb o3"></div>
  <div class="orb o4"></div>
  <div class="grid-bg"></div>
  <div class="scan"></div>
  <div id="stars"></div>
</div>

<div class="wrap">
  <!-- NAV -->
  <nav>
    <a class="logo" href="#">ERA<em>/</em>API</a>
    <div class="online"><div class="led"></div>LIVE &nbsp;·&nbsp; ALL SYSTEMS GO</div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="eyebrow">✦ AI IMAGE EDITING &nbsp;·&nbsp; <span>EDIT ROCKY API v2.0</span></div>
    <h1 class="hero-title">
      <span class="ht-line grad-text">Edit</span>
      <span class="ht-line outline-text">Rocky</span>
      <span class="ht-line grad-text">API.</span>
    </h1>
    <div class="author">
      <span class="auth-by">CREATED BY</span>
      <span class="auth-line"></span>
      <span class="auth-name">Rocky Chowdhury</span>
    </div>
    <br>
    <div class="url-pill">
      <span class="method">GET</span>
      <span class="url-text">/generate?prompt=make+it+cartoon&url=IMAGE_URL</span>
    </div>
  </section>
</div>

<!-- MARQUEE -->
<div class="mq-wrap">
  <div class="mq-track">
    <span class="mq-item">ROCKY CHOWDHURY <span class="a">✦</span></span>
    <span class="mq-item">EDIT ROCKY API <span class="a">✦</span></span>
    <span class="mq-item">AI IMAGE EDITING <span class="a">✦</span></span>
    <span class="mq-item">FREE TO USE <span class="a">✦</span></span>
    <span class="mq-item">POWERED BY AI <span class="a">✦</span></span>
    <span class="mq-item">VERCEL HOSTED <span class="a">✦</span></span>
    <span class="mq-item">ROCKY CHOWDHURY <span class="a">✦</span></span>
    <span class="mq-item">EDIT ROCKY API <span class="a">✦</span></span>
    <span class="mq-item">AI IMAGE EDITING <span class="a">✦</span></span>
    <span class="mq-item">FREE TO USE <span class="a">✦</span></span>
    <span class="mq-item">POWERED BY AI <span class="a">✦</span></span>
    <span class="mq-item">VERCEL HOSTED <span class="a">✦</span></span>
  </div>
</div>

<div class="wrap">
  <!-- STATS -->
  <div class="stats">
    <div class="stat"><div class="sn">∞</div><div class="sl">Requests</div></div>
    <div class="stat"><div class="sn">AI</div><div class="sl">Powered</div></div>
    <div class="stat"><div class="sn">0$</div><div class="sl">Cost</div></div>
    <div class="stat"><div class="sn">24/7</div><div class="sl">Online</div></div>
  </div>

  <!-- API REFERENCE -->
  <div class="sh"><div class="sh-n">01</div><div class="sh-t">API Reference</div><div class="sh-l"></div></div>
  <div class="g2">
    <div class="card">
      <span class="ci">📡</span>
      <div class="cl">Endpoint</div>
      <code><span class="h2">GET</span> /generate<br><span class="h1">?prompt</span>=your prompt<br><span class="h1">&url</span>=image link</code>
    </div>
    <div class="card">
      <span class="ci">📦</span>
      <div class="cl">Parameters</div>
      <code><span class="h1">prompt</span> — <span class="h2">required</span><br><span class="h1">url</span> — <span class="h2">required</span><br><span class="h1">imageUrl</span> — <span class="h3">alternative</span></code>
    </div>
    <div class="card">
      <span class="ci">🤖</span>
      <div class="cl">Model</div>
      <code>instruct-pix2pix<br>Image Editing AI<br>Timeout: <span class="h2">120s</span></code>
    </div>
    <div class="card">
      <span class="ci">🔓</span>
      <div class="cl">Access</div>
      <code>Method: <span class="h2">GET / POST</span><br>Auth: <span class="h2">None</span><br>CORS: <span class="h2">Enabled ✓</span></code>
    </div>
  </div>

  <!-- EXAMPLES -->
  <div class="sh" style="margin-top:60px"><div class="sh-n">02</div><div class="sh-t">Example Prompts</div><div class="sh-l"></div></div>
  <div class="g1">
    <div class="card">
      <div class="exs">
        <div class="ex"><div class="ex-n">01</div><div class="ex-c">?<span class="p">prompt</span>=<span class="v">make it cartoon</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-n">02</div><div class="ex-c">?<span class="p">prompt</span>=<span class="v">add a cat</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-n">03</div><div class="ex-c">?<span class="p">prompt</span>=<span class="v">change background to beach</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-n">04</div><div class="ex-c">?<span class="p">prompt</span>=<span class="v">make it black and white</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-n">05</div><div class="ex-c">?<span class="p">prompt</span>=<span class="v">add snow effect</span>&url=IMAGE_URL</div></div>
        <div class="ex"><div class="ex-n">06</div><div class="ex-c">?<span class="p">prompt</span>=<span class="v">remove background</span>&url=IMAGE_URL</div></div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="ft-name">Rocky Chowdhury</div>
    <div class="ft-role">Developer &nbsp;·&nbsp; Edit Rocky API</div>
    <div class="ft-tags">
      <span class="ft-tag">EDIT ROCKY API</span>
      <span class="ft-tag">VERCEL</span>
      <span class="ft-tag">AI POWERED</span>
      <span class="ft-tag">FREE</span>
    </div>
  </footer>
</div>

<script>
// Cursor
const c1=document.getElementById('c1'),c2=document.getElementById('c2');
let mx=0,my=0,cx=0,cy=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  c1.style.cssText='left:'+(mx-5)+'px;top:'+(my-5)+'px;position:fixed;width:10px;height:10px;background:#00ffaa;border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:screen;';
});
setInterval(()=>{
  cx+=(mx-cx)*.12;cy+=(my-cy)*.12;
  c2.style.cssText='left:'+(cx-15)+'px;top:'+(cy-15)+'px;position:fixed;width:30px;height:30px;border:1px solid rgba(0,255,170,.4);border-radius:50%;pointer-events:none;z-index:9998;transition:none;';
},16);

// Stars
const starsEl=document.getElementById('stars');
for(let i=0;i<120;i++){
  const s=document.createElement('div');
  const sz=Math.random()*2+.5;
  s.className='star';
  s.style.cssText=
    'left:'+Math.random()*100+'%;'+
    'top:'+Math.random()*100+'%;'+
    'width:'+sz+'px;height:'+sz+'px;'+
    'animation-duration:'+(Math.random()*4+2)+'s;'+
    'animation-delay:'+(Math.random()*6)+'s;'+
    'opacity:'+(Math.random()*.3);
  starsEl.appendChild(s);
}

// Hover effects on cards
document.querySelectorAll('.card,.stat,.ex').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    c1.style.transform='scale(3)';
    c2.style.transform='scale(1.8)';
  });
  el.addEventListener('mouseleave',()=>{
    c1.style.transform='scale(1)';
    c2.style.transform='scale(1)';
  });
});
</script>
</body>
</html>`);
};
