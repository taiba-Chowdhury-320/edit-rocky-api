const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  const prompt = req.query.prompt;
  const imageUrl = req.query.url || req.query.imageUrl;

  if (!prompt || !imageUrl) {
    return res.status(400).json({
      success: false,
      error: "prompt and url are required"
    });
  }

  try {
    const decodedImage = decodeURIComponent(imageUrl);
    const decodedPrompt = decodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);

    // Pollinations with image2image mode
    const encoded = encodeURIComponent(decodedPrompt);
    const encodedImg = encodeURIComponent(decodedImage);

    const resultUrl = `https://image.pollinations.ai/prompt/${encoded}?image=${encodedImg}&width=1024&height=1024&seed=${seed}&nologo=true&model=flux-pro`;

    const imgRes = await axios.get(resultUrl, {
      responseType: "arraybuffer",
      timeout: 90000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!imgRes.data || imgRes.data.byteLength < 500) {
      throw new Error("Empty image");
    }

    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(Buffer.from(imgRes.data));

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
