const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt, model, imageUrl } = req.method === "POST" ? req.body : req.query;

  if (!prompt || !imageUrl) {
    return res.status(400).json({
      success: false,
      error: "prompt and imageUrl are required"
    });
  }

  try {
    const response = await axios.get("https://fluxcdibai-1.onrender.com/generate", {
      params: {
        prompt,
        model: model || "seedream v4 edit",
        imageUrl
      },
      timeout: 120000
    });

    const resultUrl = response.data?.data?.imageResponseVo?.url;

    if (!resultUrl) {
      return res.status(500).json({ success: false, error: "No image URL in response" });
    }

    return res.status(200).json({
      success: true,
      data: {
        imageResponseVo: { url: resultUrl }
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Unknown error"
    });
  }
};
