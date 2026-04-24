const {
  getLLMResponses,
  saveConversation,
  searchHistory,
  clearHistory
} = require("../src/llmService");

describe("LLM Service Unit Tests", () => {
  beforeEach(() => {
    clearHistory();
  });

  it("should return responses from multiple LLMs", () => {
    const responses = getLLMResponses("What is AI?");
    expect(responses.length).toBeGreaterThan(1);
  });

  it("should include the original question in each response", () => {
    const responses = getLLMResponses("Explain software testing");
    expect(responses[0].answer).toContain("Explain software testing");
  });

  it("should save a conversation", () => {
    const responses = getLLMResponses("What is Agile?");
    const saved = saveConversation("What is Agile?", responses);

    expect(saved.id).toBe(1);
    expect(saved.question).toBe("What is Agile?");
  });

  it("should search saved conversation history", () => {
    const responses = getLLMResponses("What is Cucumber?");
    saveConversation("What is Cucumber?", responses);

    const results = searchHistory("Cucumber");
    expect(results.length).toBe(1);
  });
});