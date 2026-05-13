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

    // Step 1: Download image as base64
    const imgRes = await axios.get(decodedImage, {
      responseType: "arraybuffer",
      timeout: 30000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const b64 = Buffer.from(imgRes.data).toString("base64");
    const mime = imgRes.headers["content-type"] || "image/jpeg";
    const dataUrl = `data:${mime};base64,${b64}`;

    // Step 2: Call Gradio Space (pix2pix)
    const gradioRes = await axios.post(
      "https://fffiloni-instruct-pix2pix.hf.space/run/predict",
      {
        fn_index: 0,
        data: [
          dataUrl,
          decodedPrompt,
          7,
          1.5,
          20,
          null
        ]
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 120000
      }
    );

    const output = gradioRes.data?.data?.[0];
    if (!output) {
      throw new Error("No output from Gradio");
    }

    // output is base64 data URL
    const base64Data = output.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, "base64");

    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(imgBuffer);

  } catch (err) {
    let errMsg = err.message;
    if (err.response?.data) {
      try { errMsg = JSON.stringify(err.response.data); } catch(e) {}
    }
    return res.status(500).json({ success: false, error: errMsg });
  }
};
