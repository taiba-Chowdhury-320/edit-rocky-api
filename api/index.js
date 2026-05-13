module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Rocky API — by Rocky Chowdhury</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --green: #00ff88;
      --blue: #00bfff;
      --purple: #a855f7;
      --pink: #ff006e;
      --dark: #050508;
    }

    body {
      background: var(--dark);
      color: #fff;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ── Animated background ── */
    .bg-wrap {
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }
    .bg-gradient {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 10% 20%, rgba(0,255,136,.07) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 90% 80%, rgba(0,191,255,.07) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(168,85,247,.05) 0%, transparent 70%);
    }
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,255,136,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,.03) 1px, transparent 1px);
      background-size: 60px 60px;
      animation: gridScroll 25s linear infinite;
    }
    @keyframes gridScroll { to { transform: translateY(60px); } }

    /* Floating orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      animation: orbFloat ease-in-out infinite;
    }
    .orb1 { width:500px;height:500px;background:rgba(0,255,136,.06);top:-150px;left:-150px;animation-duration:9s; }
    .orb2 { width:400px;height:400px;background:rgba(0,191,255,.06);bottom:-100px;right:-100px;animation-duration:12s;animation-delay:3s; }
    .orb3 { width:300px;height:300px;background:rgba(168,85,247,.05);top:40%;left:40%;animation-duration:15s;animation-delay:6s; }
    @keyframes orbFloat {
      0%,100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(20px,-30px) scale(1.08); }
    }

    /* Particles */
    #particles { position:fixed;inset:0;z-index:0;pointer-events:none; }
    .p {
      position:absolute;
      border-radius:50%;
      animation: rise linear infinite;
      opacity:0;
    }
    @keyframes rise {
      0%   { transform:translateY(100vh);opacity:0; }
      10%  { opacity:.8; }
      90%  { opacity:.8; }
      100% { transform:translateY(-20px) translateX(20px);opacity:0; }
    }

    /* ── Layout ── */
    .page {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px 80px;
    }

    /* ── NAV ── */
    nav {
      width: 100%;
      max-width: 1100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 0;
      border-bottom: 1px solid rgba(255,255,255,.06);
      margin-bottom: 70px;
    }
    .nav-logo {
      font-family: 'Orbitron', sans-serif;
      font-size: 17px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--green), var(--blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
    }
    .nav-status {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,255,136,.08);
      border: 1px solid rgba(0,255,136,.25);
      border-radius: 50px;
      padding: 7px 18px;
      font-size: 13px;
      color: var(--green);
    }
    .dot {
      width: 8px; height: 8px;
      background: var(--green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--green);
      animation: blink 1.5s infinite;
    }
    @keyframes blink {
      0%,100% { opacity:1; box-shadow:0 0 6px var(--green); }
      50%      { opacity:.4; box-shadow:0 0 18px var(--green); }
    }

    /* ── HERO ── */
    .hero { text-align: center; max-width: 800px; }

    .hero-badge {
      display: inline-block;
      background: linear-gradient(135deg, rgba(0,255,136,.12), rgba(0,191,255,.12));
      border: 1px solid rgba(0,255,136,.35);
      border-radius: 50px;
      padding: 8px 24px;
      font-size: 12px;
      color: var(--green);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 28px;
    }

    h1 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(40px, 9vw, 82px);
      font-weight: 900;
      line-height: 1.05;
      background: linear-gradient(135deg, var(--green) 0%, var(--blue) 50%, var(--purple) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s ease-in-out infinite;
      margin-bottom: 16px;
    }
    @keyframes shimmer {
      0%,100% { filter: brightness(1); }
      50%      { filter: brightness(1.25) drop-shadow(0 0 20px rgba(0,255,136,.3)); }
    }

    .hero-sub {
      font-size: 18px;
      color: #777;
      margin-bottom: 12px;
      letter-spacing: .5px;
    }
    .hero-sub span { color: var(--blue); }

    /* Author line */
    .author-line {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 48px;
      font-size: 15px;
      color: #555;
    }
    .author-line .name {
      font-family: 'Orbitron', sans-serif;
      font-size: 15px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--pink), var(--purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .author-line .divider { color: #333; }

    /* ── STATS ── */
    .stats {
      display: flex;
      gap: 30px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 70px;
    }
    .stat {
      text-align: center;
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 16px;
      padding: 22px 36px;
      min-width: 130px;
      transition: border-color .3s, transform .3s;
    }
    .stat:hover { border-color: rgba(0,255,136,.3); transform: translateY(-4px); }
    .stat-num {
      font-family: 'Orbitron', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: var(--green);
      margin-bottom: 4px;
    }
    .stat-label { font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 1px; }

    /* ── CARDS ── */
    .section-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 13px;
      color: #444;
      letter-spacing: 3px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 30px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
      width: 100%;
      max-width: 1100px;
      margin-bottom: 30px;
    }

    .card {
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 20px;
      padding: 28px;
      transition: all .35s ease;
      position: relative;
      overflow: hidden;
    }
    .card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,255,136,.03), transparent);
      opacity: 0;
      transition: opacity .35s;
    }
    .card:hover { transform: translateY(-6px); border-color: rgba(0,255,136,.25); }
    .card:hover::after { opacity: 1; }
    .card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
    .card-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
      background: rgba(0,255,136,.08);
      border: 1px solid rgba(0,255,136,.15);
    }
    .card-title { font-size: 13px; color: var(--green); text-transform: uppercase; letter-spacing: 2px; }
    .card code {
      background: rgba(0,0,0,.5);
      border: 1px solid rgba(0,255,136,.15);
      border-radius: 10px;
      padding: 12px 14px;
      display: block;
      font-size: 13px;
      color: var(--blue);
      line-height: 1.9;
      word-break: break-all;
    }

    /* ── URL BOX ── */
    .url-box {
      width: 100%;
      max-width: 1100px;
      background: rgba(0,191,255,.04);
      border: 1px solid rgba(0,191,255,.2);
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 30px;
      text-align: center;
    }
    .url-box h3 { font-size: 12px; color: var(--blue); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px; }
    .url-box code {
      font-size: 15px;
      color: #fff;
      background: rgba(0,0,0,.4);
      padding: 16px 24px;
      border-radius: 12px;
      display: inline-block;
      border: 1px solid rgba(0,191,255,.15);
      word-break: break-all;
    }

    /* ── EXAMPLE BOX ── */
    .example-box {
      width: 100%;
      max-width: 1100px;
      background: rgba(168,85,247,.04);
      border: 1px solid rgba(168,85,247,.2);
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 60px;
    }
    .example-box h3 { font-size: 12px; color: var(--purple); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; }
    .examples { display: flex; flex-direction: column; gap: 10px; }
    .ex {
      background: rgba(0,0,0,.3);
      border: 1px solid rgba(168,85,247,.1);
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 13px;
      color: #aaa;
      font-family: monospace;
    }
    .ex span { color: var(--purple); }

    /* ── FOOTER ── */
    footer {
      width: 100%;
      max-width: 1100px;
      border-top: 1px solid rgba(255,255,255,.05);
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
    }
    .footer-name {
      font-family: 'Orbitron', sans-serif;
      font-size: 22px;
      font-weight: 900;
      background: linear-gradient(135deg, var(--pink), var(--purple), var(--blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .footer-sub { font-size: 13px; color: #444; }
    .footer-sub span { color: var(--green); }
  </style>
</head>
<body>

<div class="bg-wrap">
  <div class="bg-gradient"></div>
  <div class="grid-lines"></div>
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>
</div>

<div id="particles"></div>

<div class="page">

  <!-- NAV -->
  <nav>
    <div class="nav-logo">⚡ EDIT ROCKY API</div>
    <div class="nav-status"><div class="dot"></div> All Systems Online</div>
  </nav>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-badge">🚀 Edit Rocky API &nbsp;•&nbsp; v2.0</div>
    <h1>Edit Rocky<br>API</h1>
    <p class="hero-sub">AI Image Editing — <span>Powered by Hugging Face</span></p>
    <div class="author-line">
      <span>Created by</span>
      <span class="divider">|</span>
      <span class="name">Rocky Chowdhury</span>
    </div>
  </div>

  <!-- STATS -->
  <div class="stats">
    <div class="stat"><div class="stat-num">∞</div><div class="stat-label">Requests</div></div>
    <div class="stat"><div class="stat-num">AI</div><div class="stat-label">Powered</div></div>
    <div class="stat"><div class="stat-num">0$</div><div class="stat-label">Cost</div></div>
    <div class="stat"><div class="stat-num">24/7</div><div class="stat-label">Uptime</div></div>
  </div>

  <!-- CARDS -->
  <p class="section-title">API Reference</p>
  <div class="cards">
    <div class="card">
      <div class="card-top">
        <div class="card-icon">📡</div>
        <div class="card-title">Endpoint</div>
      </div>
      <code>GET /generate?prompt=...&url=...</code>
    </div>

    <div class="card">
      <div class="card-top">
        <div class="card-icon">📦</div>
        <div class="card-title">Parameters</div>
      </div>
      <code>
        prompt — required<br>
        url — required (image link)<br>
        imageUrl — alternative param
      </code>
    </div>

    <div class="card">
      <div class="card-top">
        <div class="card-icon">🤖</div>
        <div class="card-title">Model</div>
      </div>
      <code>
        instruct-pix2pix<br>
        Image-to-Image AI<br>
        Timeout: 120s
      </code>
    </div>

    <div class="card">
      <div class="card-top">
        <div class="card-icon">🔓</div>
        <div class="card-title">Access</div>
      </div>
      <code>
        Method: GET / POST<br>
        Auth: None required<br>
        CORS: Enabled ✓
      </code>
    </div>
  </div>

  <!-- URL BOX -->
  <div class="url-box">
    <h3>🌐 Base URL</h3>
    <code>https://edit-rocky-api-ttmy.vercel.app/generate</code>
  </div>

  <!-- EXAMPLES -->
  <div class="example-box">
    <h3>💡 Example Prompts</h3>
    <div class="examples">
      <div class="ex">?prompt=<span>make it cartoon</span>&url=IMAGE_URL</div>
      <div class="ex">?prompt=<span>add a cat</span>&url=IMAGE_URL</div>
      <div class="ex">?prompt=<span>change background to beach</span>&url=IMAGE_URL</div>
      <div class="ex">?prompt=<span>make it black and white</span>&url=IMAGE_URL</div>
      <div class="ex">?prompt=<span>add snow effect</span>&url=IMAGE_URL</div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="footer-name">Rocky Chowdhury</div>
    <div class="footer-sub">Edit Rocky API • Hosted on <span>Vercel</span> • Powered by <span>Hugging Face AI</span></div>
  </footer>

</div>

<script>
  const c = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'p';
    const size = Math.random() * 3 + 1;
    p.style.cssText = [
      'left:' + Math.random() * 100 + 'vw',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'animation-duration:' + (Math.random() * 12 + 8) + 's',
      'animation-delay:' + (Math.random() * 12) + 's',
      'background:' + (Math.random() > .5 ? '#00ff88' : '#00bfff')
    ].join(';');
    c.appendChild(p);
  }
</script>
</body>
</html>`);
};
