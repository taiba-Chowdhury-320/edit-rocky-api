const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Support both ?prompt=&url= and ?prompt=&imageUrl=
  const prompt = req.query.prompt;
  const imageUrl = req.query.url || req.query.imageUrl;

  if (!prompt || !imageUrl) {
    return res.status(400).json({ 
      success: false, 
      error: "prompt and url are required" 
    });
  }

  const REPLICATE_KEY = process.env.REPLICATE_API_KEY;

  try {
    const decodedImage = decodeURIComponent(imageUrl);
    const decodedPrompt = decodeURIComponent(prompt);

    // Start Flux Kontext prediction
    const startRes = await axios.post(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions",
      {
        input: {
          prompt: decodedPrompt,
          input_image: decodedImage,
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

    // Poll for result
    if (!resultUrl) {
      const predId = startRes.data?.id;
      for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 3000));
        const poll = await axios.get(
          `https://api.replicate.com/v1/predictions/${predId}`,
          { headers: { Authorization: `Bearer ${REPLICATE_KEY}` } }
        );
        const status = poll.data?.status;
        if (status === "succeeded") {
          const out = poll.data?.output;
          resultUrl = Array.isArray(out) ? out[0] : out;
          break;
        } else if (status === "failed" || status === "canceled") {
          break;
        }
      }
    }

    if (!resultUrl) {
      return res.status(500).json({ success: false, error: "Generation failed" });
    }

    // Fetch image and return as direct image (like smfahim.xyz/gedit)
    const imgRes = await axios.get(resultUrl, {
      responseType: "arraybuffer",
      timeout: 60000
    });

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", "inline; filename=edited.jpg");
    return res.status(200).send(Buffer.from(imgRes.data));

  } catch (err) {
    const errMsg = err?.response?.data?.detail || err.message;
    return res.status(500).json({ success: false, error: errMsg });
  }
};
