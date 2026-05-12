module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Rocky API</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      background: #000;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      color: #fff;
    }

    /* Animated background */
    .bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      background: radial-gradient(ellipse at 20% 50%, #0d2b1a 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, #001a2e 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 80%, #1a0a2e 0%, transparent 50%),
                  #000;
    }

    /* Grid lines */
    .grid {
      position: fixed;
      inset: 0;
      z-index: 0;
      background-image:
        linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
    }
    @keyframes gridMove {
      0% { transform: translateY(0); }
      100% { transform: translateY(50px); }
    }

    /* Floating orbs */
    .orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      animation: float 8s ease-in-out infinite;
      z-index: 0;
    }
    .orb1 {
      width: 400px; height: 400px;
      background: rgba(0, 255, 136, 0.08);
      top: -100px; left: -100px;
      animation-delay: 0s;
    }
    .orb2 {
      width: 350px; height: 350px;
      background: rgba(0, 191, 255, 0.08);
      bottom: -100px; right: -100px;
      animation-delay: 3s;
    }
    .orb3 {
      width: 300px; height: 300px;
      background: rgba(138, 43, 226, 0.06);
      top: 50%; left: 50%;
      animation-delay: 6s;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.1); }
    }

    /* Particles */
    .particles {
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }
    .particle {
      position: absolute;
      width: 2px; height: 2px;
      background: #00ff88;
      border-radius: 50%;
      animation: rise linear infinite;
      opacity: 0;
    }
    @keyframes rise {
      0% { transform: translateY(100vh) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-10px) translateX(30px); opacity: 0; }
    }

    /* Main content */
    .wrapper {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px 20px;
    }

    /* Header */
    .badge {
      background: linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,191,255,0.15));
      border: 1px solid rgba(0,255,136,0.4);
      border-radius: 50px;
      padding: 8px 24px;
      font-size: 13px;
      color: #00ff88;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
    }

    h1 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(36px, 8vw, 72px);
      font-weight: 900;
      background: linear-gradient(135deg, #00ff88 0%, #00bfff 50%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      line-height: 1.1;
      margin-bottom: 15px;
      text-shadow: none;
      animation: glow 3s ease-in-out infinite;
    }
    @keyframes glow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.2); }
    }

    .subtitle {
      color: #888;
      font-size: 18px;
      margin-bottom: 60px;
      letter-spacing: 1px;
    }
    .subtitle span {
      color: #00ff88;
    }

    /* Status bar */
    .status-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(0,255,136,0.08);
      border: 1px solid rgba(0,255,136,0.3);
      border-radius: 50px;
      padding: 12px 30px;
      margin-bottom: 60px;
      backdrop-filter: blur(10px);
    }
    .dot {
      width: 10px; height: 10px;
      background: #00ff88;
      border-radius: 50%;
      box-shadow: 0 0 10px #00ff88;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 5px #00ff88; transform: scale(1); }
      50% { box-shadow: 0 0 20px #00ff88, 0 0 40px #00ff88; transform: scale(1.2); }
    }
    .status-text { color: #00ff88; font-size: 15px; font-weight: 600; }

    /* Cards grid */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 900px;
      margin-bottom: 40px;
    }

    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 30px;
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00ff88, transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: rgba(0,255,136,0.3);
      background: rgba(0,255,136,0.05);
    }
    .card:hover::before { opacity: 1; }

    .card-icon {
      font-size: 32px;
      margin-bottom: 15px;
    }
    .card h3 {
      color: #00ff88;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .card code {
      background: rgba(0,0,0,0.5);
      border: 1px solid rgba(0,255,136,0.2);
      padding: 12px 15px;
      border-radius: 10px;
      display: block;
      font-size: 13px;
      color: #00bfff;
      word-break: break-all;
      line-height: 1.8;
    }

    /* Big URL box */
    .url-box {
      width: 100%;
      max-width: 900px;
      background: rgba(0,191,255,0.05);
      border: 1px solid rgba(0,191,255,0.3);
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 40px;
      text-align: center;
    }
    .url-box h3 {
      color: #00bfff;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
    }
    .url-box code {
      font-size: 14px;
      color: #fff;
      background: rgba(0,0,0,0.4);
      padding: 15px 20px;
      border-radius: 10px;
      display: block;
      word-break: break-all;
      border: 1px solid rgba(0,191,255,0.2);
    }

    /* Footer */
    .footer {
      margin-top: 40px;
      text-align: center;
      color: #444;
      font-size: 14px;
    }
    .footer span { color: #00ff88; }
  </style>
</head>
<body>

  <div class="bg"></div>
  <div class="grid"></div>

  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>

  <!-- Particles -->
  <div class="particles" id="particles"></div>

  <div class="wrapper">
    <div class="badge">⚡ Edit Rocky API v1.0</div>

    <h1>Edit Rocky API</h1>
    <p class="subtitle">Seedream V4 Image Edit — <span>Powered by AI</span></p>

    <div class="status-bar">
      <div class="dot"></div>
      <span class="status-text">All Systems Operational</span>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">📡</div>
        <h3>Endpoint</h3>
        <code>GET /generate?prompt=...&imageUrl=...</code>
      </div>

      <div class="card">
        <div class="card-icon">📦</div>
        <h3>Parameters</h3>
        <code>
          prompt — required<br>
          imageUrl — required<br>
          model — optional
        </code>
      </div>

      <div class="card">
        <div class="card-icon">🤖</div>
        <h3>Model</h3>
        <code>Seedream V4 Edit<br>AI Image Editing<br>Max timeout: 120s</code>
      </div>

      <div class="card">
        <div class="card-icon">🔓</div>
        <h3>Access</h3>
        <code>
          Method: GET / POST<br>
          Auth: None required<br>
          CORS: Enabled ✓
        </code>
      </div>
    </div>

    <div class="url-box">
      <h3>🌐 Base URL</h3>
      <code>https://edit-rocky-api.vercel.app/generate</code>
    </div>

    <div class="footer">
      Made with ❤️ by <span>Rocky</span> • Edit Rocky API • Powered by Vercel
    </div>
  </div>

  <script>
    // Generate particles
    const container = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = (Math.random() * 10 + 8) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
      if (Math.random() > 0.5) p.style.background = '#00bfff';
      container.appendChild(p);
    }
  </script>

</body>
</html>
  `);
};
