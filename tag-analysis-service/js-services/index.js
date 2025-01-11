const express = require("express");
const bodyParser = require("body-parser");
const { matchEvent } = require("./matchService");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());

// Route for tag analysis
app.post("/analyze", (req, res) => {
  const { userInterests, eventTags } = req.body;

  if (!userInterests || !eventTags) {
    return res.status(400).json({ error: "Please provide user interests and event tags." });
  }

  const result = matchEvent(userInterests, eventTags);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Tag Analysis Service is running on port ${PORT}`);
});
