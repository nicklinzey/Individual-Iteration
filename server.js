const express = require("express");
const path = require("path");
const { getLLMResponses, saveConversation, searchHistory } = require("./src/llmService");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/query", (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is required" });
  }

  const responses = getLLMResponses(question);
  res.json({ question, responses });
});

app.post("/save", (req, res) => {
  const { question, responses } = req.body;

  const saved = saveConversation(question, responses);
  res.json(saved);
});

app.get("/history", (req, res) => {
  res.json(searchHistory(""));
});

app.get("/history/search", (req, res) => {
  const query = req.query.q || "";
  res.json(searchHistory(query));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;