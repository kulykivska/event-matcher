const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Читаем переменные окружения
const USE_PY_SERVICE = process.env.USE_PY_SERVICE === "true";
const NODE_SERVICE_URL = process.env.NODE_SERVICE_URL || "http://tag-analysis-js-service:4001";
const PY_SERVICE_URL = process.env.PY_ANALYSIS_SERVICE_URL || "http://tag-analysis-py-service:5001";

// Определяем, какой сервис использовать
const SERVICE_URL = USE_PY_SERVICE ? PY_SERVICE_URL : NODE_SERVICE_URL;

app.post("/match", async (req, res) => {
  const { userInterests, eventTags } = req.body;

  try {
    const response = await axios.post(`${SERVICE_URL}/analyze`, {
      userInterests,
      eventTags,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with Tag Analysis Service:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
