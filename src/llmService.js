let conversationHistory = [];

function getLLMResponses(question) {
  return [
    {
      model: "LLM 1",
      answer: `LLM 1 response to: ${question}`
    },
    {
      model: "LLM 2",
      answer: `LLM 2 response to: ${question}`
    },
    {
      model: "LLM 3",
      answer: `LLM 3 response to: ${question}`
    }
  ];
}

function saveConversation(question, responses) {
  const conversation = {
    id: conversationHistory.length + 1,
    question,
    responses,
    timestamp: new Date().toISOString()
  };

  conversationHistory.push(conversation);
  return conversation;
}

function searchHistory(searchTerm) {
  if (!searchTerm) {
    return conversationHistory;
  }

  return conversationHistory.filter((conversation) =>
    conversation.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function clearHistory() {
  conversationHistory = [];
}

module.exports = {
  getLLMResponses,
  saveConversation,
  searchHistory,
  clearHistory
};