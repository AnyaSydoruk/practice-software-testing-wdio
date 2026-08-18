## Application constraints discovered during automation

- Only one Thor Hammer can be added to the cart
- Registration rejects passwords found in known data breaches
- The seeded customer account cannot update its profile ("Access denied")
- After a successful payment the cart is not emptied
- The demo site resets its database periodically, so accounts may stop working

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the test account credentials
3. `npm run wdio`

## Scenario coverage

| #   | Scenario                                     | Spec     | Chai interface |
| --- | -------------------------------------------- | -------- | -------------- |
| 1   | User registers a new account                 | auth     | assert         |
| 2   | User signs in with valid credentials         | auth     | assert         |
| 3   | User updates the profile details             | account  | expect         |
| 4   | User searches for an exact product by name   | catalog  | expect         |
| 5   | User browses products in a specific category | catalog  | expect         |
| 6   | User filters products by brand               | catalog  | expect         |
| 7   | User sorts products by price                 | catalog  | expect         |
| 8   | User adds a product to the basket            | cart     | should         |
| 9   | User adds a product to favorites             | account  | assert         |
| 10  | User updates the quantity in the basket      | cart     | should         |
| 11  | User completes checkout                      | checkout | should         |
| 12  | User changes the application language        | settings | assert         |
