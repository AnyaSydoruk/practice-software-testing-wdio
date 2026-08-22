# practice-software-testing-wdio

UI test automation framework for [practicesoftwaretesting.com](https://practicesoftwaretesting.com),
built with WebdriverIO 9, Mocha, Chai and Allure.

## Architecture

The solution is split into three layers. The rule that defines them is the direction of
dependencies: **a layer may only depend on the layer below it, never above.**

| Layer | Location | Responsibility | Rewritten when |
| --- | --- | --- | --- |
| Tests | `test/` | Specs and framework configuration | The requirements change |
| Business | `src/business/` | Everything specific to the application under test | The application changes |
| Core | `src/core/` | Reusable framework functionality | The tooling changes |

`src/core/` contains no selector, URL or term belonging to the application, so it can be
carried to another project unchanged. `test/specs/` never imports from `#core/` — a test
speaks to the business layer only.

Imports use Node's native subpath imports declared in `package.json`, so a path does not
depend on the depth of the importing file and the layer is visible in the import itself:

```js
import HomePage from "#business/pages/home.page.js";
```

### Structure

```
src/
  core/
    config/      timeouts.js, env.js
    elements/    base.element.js, input.js, angular.input.js, dropdown.js, element.list.js
    pages/       base.page.js            abstract page (Template Method)
    components/  base.component.js       abstract page fragment
    utils/       wait.helper.js
  business/
    components/  header.component.js
    pages/       base.app.page.js, home, login, register, product, cart, checkout
                 account/  account.page.js, profile.page.js, favorites.page.js
    steps/       auth.steps.js, catalog.steps.js, cart.steps.js, checkout.steps.js
    data/        users.js, constants/
test/
  specs/         *.spec.js
  wdio.conf.js
```

### Key decisions

**Pages are opened by a Template Method.** `BasePage.open()` owns the algorithm — navigate,
then wait until the page has rendered. A page supplies only `path` and `uniqueElement`.
Pages reached exclusively by navigation (product details, cart, checkout wizard) declare no
`path`; the abstract getter raises a clear error if one is opened directly.

**The header is composed, not inherited.** A page is not a kind of header, it contains one,
so `BaseAppPage` holds a `HeaderComponent` field. This also keeps application selectors out
of the core base page.

**Element wrappers own their waits.** `BaseElement` stores a selector and resolves it on
every interaction, so a cached instance never goes stale. Each wrapper carries a name that
is used in timeout messages: `Add to cart button is not clickable`.

**Angular inputs are handled by polymorphism.** Angular reactive forms listen to native
`input`/`change` events that WebDriver does not reliably emit. `AngularInput` overrides
`setValue()` to write through the native setter, so callers write `setValue()` either way.

**Steps hold the scenarios.** A page knows how to click; a step knows what a user does.
`addProductToCart()` spans the catalog, the product page and the cart, so it belongs to none
of them.

### Adding a new page

```js
import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";

class ContactPage extends BaseAppPage {
  get path() { return "contact"; }
  get uniqueElement() { return this.submitButton; }

  get submitButton() {
    return new BaseElement('[data-test="contact-submit"]', "Contact submit button");
  }
}

export default new ContactPage();
```

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the test account credentials
3. `npm run wdio`

`BASE_URL` is optional and defaults to the public demo site. A missing required variable
fails with an explicit message rather than an obscure test failure.

## Reporting

Results are written to `allure-results/`. Screenshots of failing tests are captured in the
`afterTest` hook and attached to the report by the Allure reporter.

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

The `should` interface is installed once per worker in the `before` hook of `wdio.conf.js`,
so no spec repeats the call.

## Application constraints discovered during automation

- Only one Thor Hammer can be added to the cart
- Registration rejects passwords found in known data breaches
- The seeded customer account cannot update its profile ("Access denied")
- After a successful payment the cart is not emptied, so a run resets it explicitly
- The demo site resets its database periodically, so accounts may stop working
- The product grid is occasionally served empty; the catalog page allows one reload
