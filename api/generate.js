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

    // Download image as binary
    const imgRes = await axios.get(decodedImage, {
      responseType: "arraybuffer",
      timeout: 30000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    // Use FormData with binary image
    const FormData = require("form-data");
    const form = new FormData();
    form.append("inputs", decodedPrompt);
    form.append("image", Buffer.from(imgRes.data), {
      filename: "image.jpg",
      contentType: imgRes.headers["content-type"] || "image/jpeg"
    });
    form.append("parameters", JSON.stringify({
      num_inference_steps: 20,
      image_guidance_scale: 1.5,
      guidance_scale: 7
    }));

    const hfRes = await axios.post(
      "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${HF_KEY}`
        },
        responseType: "arraybuffer",
        timeout: 120000
      }
    );

    const ct = hfRes.headers["content-type"] || "";
    if (ct.includes("application/json") || ct.includes("text")) {
      const msg = Buffer.from(hfRes.data).toString();
      return res.status(500).json({ success: false, error: msg });
    }

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
