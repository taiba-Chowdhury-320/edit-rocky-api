const axios = require("axios");

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { prompt, model, imageUrl } = req.method === "POST" ? req.body : req.query;

  if (!prompt) {
    return res.status(400).json({ success: false, error: "prompt is required" });
  }

  if (!imageUrl) {
    return res.status(400).json({ success: false, error: "imageUrl is required" });
  }

  const selectedModel = model || "seedream v4 edit";

  try {
    // Seedream V4 Edit API call (Flux/ByteDance endpoint)
    const response = await axios.post(
      "https://api.bfl.ai/v1/flux-kontext-pro", // বা তোমার আসল endpoint
      {
        prompt: prompt,
        input_image: imageUrl,
        aspect_ratio: "1:1",
        output_format: "jpeg",
        safety_tolerance: 2
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Key": process.env.BFL_API_KEY || ""
        },
        timeout: 120000
      }
    );

    const taskId = response.data?.id;
    if (!taskId) {
      return res.status(500).json({ success: false, error: "No task ID received" });
    }

    // Poll for result
    let resultUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 3000));

      const poll = await axios.get(`https://api.bfl.ai/v1/get_result?id=${taskId}`, {
        headers: { "X-Key": process.env.BFL_API_KEY || "" }
      });

      const status = poll.data?.status;
      if (status === "Ready") {
        resultUrl = poll.data?.result?.sample;
        break;
      } else if (status === "Error" || status === "Failed") {
        break;
      }
    }

    if (!resultUrl) {
      return res.status(500).json({ success: false, error: "Image generation failed or timed out" });
    }

    return res.status(200).json({
      success: true,
      data: {
        imageResponseVo: {
          url: resultUrl
        }
      },
      model: selectedModel,
      prompt: prompt
    });

  } catch (err) {
    console.error("API Error:", err?.response?.data || err.message);
    return res.status(500).json({
      success: false,
      error: err?.response?.data?.message || err.message || "Unknown error"
    });
  }
}
