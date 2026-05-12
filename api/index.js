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
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0f0f0f;
      color: #fff;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      text-align: center;
      padding: 40px;
      max-width: 600px;
    }
    .badge {
      background: #1a1a2e;
      border: 1px solid #00ff88;
      border-radius: 50px;
      padding: 6px 20px;
      font-size: 13px;
      color: #00ff88;
      display: inline-block;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 42px;
      font-weight: 800;
      background: linear-gradient(135deg, #00ff88, #00bfff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    p {
      color: #aaa;
      font-size: 16px;
      margin-bottom: 30px;
    }
    .endpoint {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 20px;
      text-align: left;
      margin-bottom: 20px;
    }
    .endpoint h3 {
      color: #00ff88;
      margin-bottom: 10px;
      font-size: 14px;
      text-transform: uppercase;
    }
    code {
      background: #0d0d0d;
      padding: 10px 15px;
      border-radius: 8px;
      display: block;
      font-size: 13px;
      color: #00bfff;
      word-break: break-all;
    }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0a2a1a;
      border: 1px solid #00ff88;
      padding: 10px 25px;
      border-radius: 50px;
      font-size: 14px;
      color: #00ff88;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #00ff88;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .footer {
      margin-top: 30px;
      color: #555;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">🚀 Edit Rocky API v1.0</div>
    <h1>Edit Rocky API</h1>
    <p>Seedream V4 Image Edit — Powered by AI</p>

    <div class="endpoint">
      <h3>📡 Endpoint</h3>
      <code>GET /generate?prompt=...&imageUrl=...</code>
    </div>

    <div class="endpoint">
      <h3>📦 Parameters</h3>
      <code>prompt — required (what to do with image)<br>imageUrl — required (image link)<br>model — optional (default: seedream v4 edit)</code>
    </div>

    <div class="status">
      <div class="dot"></div>
      Server is Online
    </div>

    <div class="footer">Made by Rocky • Edit Rocky API</div>
  </div>
</body>
</html>
  `);
};
