const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

jest.mock("axios");

app.use(bodyParser.json());

const TAG_ANALYSIS_SERVICE_URL = "http://localhost:5001";

app.post("/match", async (req, res) => {
  const { userInterests, eventTags } = req.body;

  if (!userInterests || !eventTags) {
    return res.status(400).json({ error: "Please provide user interests and event tags." });
  }

  try {
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

describe("POST /match", () => {
  it("should return 400 if userInterests or eventTags are missing", async () => {
    const response = await request(app)
      .post("/match")
      .send({ userInterests: ["music"] });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Please provide user interests and event tags.");
  });

  it("should return 200 and the analysis result if userInterests and eventTags are provided", async () => {
    const mockResponse = { match: true };
    axios.post.mockResolvedValue({ data: mockResponse });

    const response = await request(app)
      .post("/match")
      .send({ userInterests: ["music"], eventTags: ["concert"] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it("should return 500 if the Tag Analysis Service fails", async () => {
    axios.post.mockRejectedValue(new Error("Service failure"));

    const response = await request(app)
      .post("/match")
      .send({ userInterests: ["music"], eventTags: ["concert"] });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to process request");
  });
});