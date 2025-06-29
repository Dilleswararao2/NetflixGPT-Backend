const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Replace this with your actual Cohere API key
const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/cohere", async (req, res) => {
  try {
    const cohereRes = await axios.post(
      "https://api.cohere.ai/v1/generate",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(cohereRes.data);
  } catch (err) {
    console.error("Cohere error:", err.response?.data || err.message);
    res.status(500).json({ error: "Cohere API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
