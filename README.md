# GoREST API Testing with Cypress

This repository contains a suite of automated REST API tests for the [GoREST API](https://gorest.co.in/) built with [Cypress](https://www.cypress.io/). It serves as a practical example of testing RESTful endpoints using Cypress's native `cy.request()` method.

___

## Purpose

To verify REST API functionality including:
- GET user list
- POST new user
- GET user by ID
- PUT (update) user
- DELETE user
- Negative test cases (invalid token, missing fields)
- Pagination check

## Project Structure

cypress/\
└── e2e/\
│ ├── gorestApi.cy.js # Main test file\
└── fixtures/\
│ ├── gorest.json # Contains the API token



## Getting Started

1. Clone the repository

>git clone https://github.com/AdamWudarczyk/Portfolio-Cypress_APITesting.git \
cd gorest-api-tests

2. Install dependencies

> npm install

3. Add your token

Update cypress/fixtures/gorest.json with your GoREST Bearer token.



4. Run the tests

a) Run all tests in headless mode:

> npx cypress run

b) Open the Cypress test runner (GUI mode):

> npx cypress open

##  Authentication

All tests (except the invalid token test) require a valid Bearer token.
This token is stored in a fixture file:

>gorest.json

## Tech Stack

- Cypress (JavaScript)
- Mocha & Chai (test runner and assertions – built into Cypress)
- JSON fixtures for data-driven tests
- RESTful API testing with `cy.request()`


## Troubleshooting

- If you get `401 Unauthorized`, make sure your token in `gorest.json` is correct and not expired.
- If Cypress can't find the test files, make sure the folder structure is correct: `cypress/e2e/gorestApi.cy.js`.

---
Made by Adam Wudarczyk

This project is for educational and demonstration purposes.