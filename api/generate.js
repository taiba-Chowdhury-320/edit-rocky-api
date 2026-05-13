const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { prompt, imageUrl } = req.method === "POST" ? req.body : req.query;

  if (!prompt || !imageUrl) {
    return res.status(400).json({ success: false, error: "prompt and imageUrl are required" });
  }

  const REPLICATE_KEY = process.env.REPLICATE_API_KEY;

  try {
    // Flux Kontext Pro - exact image editing
    const startRes = await axios.post(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions",
      {
        input: {
          prompt: prompt,
          input_image: imageUrl,
          output_format: "jpg",
          safety_tolerance: 6
        }
      },
      {
        headers: {
          Authorization: `Bearer ${REPLICATE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "wait=60"
        },
        timeout: 120000
      }
    );

    let resultUrl = null;
    const output = startRes.data?.output;
    resultUrl = Array.isArray(output) ? output[0] : output;

    // Poll if not ready yet
    if (!resultUrl) {
      const predId = startRes.data?.id;
      for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 3000));
        const poll = await axios.get(
          `https://api.replicate.com/v1/predictions/${predId}`,
          {
            headers: { Authorization: `Bearer ${REPLICATE_KEY}` },
            timeout: 10000
          }
        );
        const status = poll.data?.status;
        if (status === "succeeded") {
          const out = poll.data?.output;
          resultUrl = Array.isArray(out) ? out[0] : out;
          break;
        } else if (status === "failed" || status === "canceled") {
          return res.status(500).json({ success: false, error: "Generation failed: " + poll.data?.error });
        }
      }
    }

    if (!resultUrl) {
      return res.status(500).json({ success: false, error: "Timed out waiting for image" });
    }

    return res.status(200).json({
      success: true,
      data: { imageResponseVo: { url: resultUrl } }
    });

  } catch (err) {
    const errMsg = err?.response?.data?.detail || err?.response?.data?.error || err.message;
    return res.status(500).json({ success: false, error: errMsg });
  }
};
