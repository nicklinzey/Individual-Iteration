const { Given, When, Then, After } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const assert = require("assert");
const app = require("../../server");

let browser;
let page;
let server;

Given("the user is on the home page", async function () {
  server = app.listen(3000);
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

When("the user enters a question and submits it", async function () {
  await page.type("#questionInput", "What is artificial intelligence?");
  await page.click("#submitButton");
  await page.waitForSelector(".llm-response");
});

Then("multiple LLM responses should be displayed", async function () {
  const responses = await page.$$(".llm-response");
  assert(responses.length > 1);
});

After(async function () {
  if (browser) {
    await browser.close();
  }

  if (server) {
    server.close();
  }
});