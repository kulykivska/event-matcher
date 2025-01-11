const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const TAG_ANALYSIS_SERVICE_URL = process.env.TAG_ANALYSIS_SERVICE_URL;

app.use(bodyParser.json());

// Маршрут для анализа тегов
app.post("/match", async (req, res) => {
  const { userInterests, eventTags } = req.body;

  if (!userInterests || !eventTags) {
    return res.status(400).json({ error: "Please provide user interests and event tags." });
  }

  try {
    // Направляем запрос в сервис анализа тегов
    const response = await axios.post(`${TAG_ANALYSIS_SERVICE_URL}/analyze`, {
      userInterests,
      eventTags,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with Tag Analysis Service:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
