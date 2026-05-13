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
    const HF_KEY = process.env.HF_API_KEY;

    // Download image as base64
    const imgRes = await axios.get(decodedImage, {
      responseType: "arraybuffer",
      timeout: 30000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const base64 = Buffer.from(imgRes.data).toString("base64");
    const mime = imgRes.headers["content-type"] || "image/jpeg";

    // Call HF - instruct-pix2pix (image editing model)
    const hfRes = await axios.post(
      "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix",
      {
        inputs: decodedPrompt,
        parameters: {
          image: base64,
          num_inference_steps: 20,
          image_guidance_scale: 1.5,
          guidance_scale: 7
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        timeout: 120000
      }
    );

    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(Buffer.from(hfRes.data));

  } catch (err) {
    let errMsg = err.message;
    if (err.response?.data) {
      try { errMsg = Buffer.from(err.response.data).toString(); } catch(e) {}
    }
    return res.status(500).json({ success: false, error: errMsg });
  }
};
