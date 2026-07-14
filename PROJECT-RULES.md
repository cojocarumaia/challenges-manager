# STEPathON Internship Project Rules

These rules apply to all work completed during the STEPathON internship. Their purpose is to keep the code consistent, readable, secure, tested, and easy for another developer to understand.

## 1. Use Bootstrap for all styling

All interface styling should use Bootstrap and React Bootstrap whenever possible.

Use Bootstrap classes for:

- layout;
- spacing;
- buttons;
- forms;
- cards;
- alerts;
- loading states;
- responsive design;
- light mode and dark mode.

Avoid adding custom CSS unless Bootstrap cannot provide the required result. When custom styling is necessary, keep it small and consistent with the rest of the application.

## 2. Every data list must show a skeleton while loading

Any page or component that loads a list from the back end must show a skeleton loading state while waiting for the data.

A plain message such as “Loading...” is not enough for list pages. The skeleton should resemble the final layout, so the user understands what is being loaded.

The component must also handle:

- successful loading;
- empty results;
- request errors;
- loading additional pages, if pagination or infinite scrolling is used.

## 3. Every feature must include tests

A feature is not complete until it has appropriate automated tests.

Tests should cover:

- the expected successful behaviour;
- important validation failures;
- errors or edge cases;
- behaviour that could break existing functionality.

Front-end tests should follow the existing React testing setup. Back-end tests should follow the existing server testing setup. Before a feature is considered complete, all new and existing tests must pass.

## 4. Write a short specification before building each feature

Before writing code for a new feature, create a short specification using the project specification template.

The specification must explain:

- the goal;
- what the user can do;
- the rules and validation;
- how the team will know the feature works.

The specification should be agreed before implementation begins. If the feature changes while it is being built, the specification must be updated.

## 5. Never commit secrets

Secrets and machine-specific settings must never be committed to Git.

This includes:

- passwords;
- database connection strings;
- API keys;
- private tokens;
- personal data;
- production credentials.

Secrets must be stored in `.env` files or another approved secure location. The `.env` file must be included in `.gitignore`.

When sharing code or error messages with an AI assistant, replace any secret value with `SECRET`.

## 6. Work on a branch and make focused commits

Do not make feature changes directly on `main`.

Each feature or fix should be developed on its own branch. Commits should be small, focused, and use clear conventional commit messages, such as:

- `feat: add challenge image upload`
- `fix: correct challenge validation`
- `test: add form validation tests`
- `docs: add feature specification`

The code should be reviewed before it is merged.

## 7. Keep code readable and consistent

Follow the existing project structure and naming conventions.

Before creating a new component, utility, route, or pattern, check whether the project already has an existing example to follow.

Remove:

- dead code;
- unused imports;
- debugging logs;
- duplicate logic;
- temporary test data.

Do not introduce a new library unless it is necessary and approved.

## 8. Validate data on both front end and back end

The front end should give the user immediate and clear feedback.

The back end must also validate all incoming data because requests cannot be trusted simply because the front end already checked them.

Invalid requests must return a clear message and an appropriate status code.

## 9. Keep documentation updated

When setup steps, routes, environment variables, scripts, or features change, update the README and relevant documentation in the same feature.

Another developer should be able to clone the repository, follow the README, and run the application without asking for missing steps.

## 10. Definition of done

A feature is complete only when:

- the specification is written;
- the implementation works;
- validation is included;
- loading and error states are handled;
- tests are written and passing;
- linting passes;
- documentation is updated;
- no secrets are committed;
- the work is committed clearly and ready for review.