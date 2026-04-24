Feature: Query multiple LLMs

  Scenario: User submits a question and receives multiple responses
    Given the user is on the home page
    When the user enters a question and submits it
    Then multiple LLM responses should be displayed