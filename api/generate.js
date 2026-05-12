const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt, imageUrl } = req.method === "POST" ? req.body : req.query;

  if (!prompt || !imageUrl) {
    return res.status(400).json({
      success: false,
      error: "prompt and imageUrl are required"
    });
  }

  try {
    // Encode prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);
    const encodedImage = encodeURIComponent(imageUrl);

    // Try Pollinations image edit
    const editUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?image=${encodedImage}&width=1024&height=1024&nologo=true&enhance=true`;

    // Check if URL is reachable
    const testRes = await axios.get(editUrl, {
      responseType: "arraybuffer",
      timeout: 90000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!testRes.data || testRes.data.byteLength < 1000) {
      throw new Error("Empty image response");
    }

    return res.status(200).json({
      success: true,
      data: {
        imageResponseVo: {
          url: editUrl
        }
      }
    });

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      success: false,
      error: err.message || "Unknown error"
    });
  }
};
