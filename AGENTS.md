# Repository Guidelines

## Project Structure & Module Organization

This repository is currently empty apart from this guide. As the project takes shape, keep application code in `src/`, automated tests in `tests/`, and static assets in `assets/`. Group files by feature where practical, and keep generated output out of source directories. Update this section when the actual layout is established.

## Build, Test, and Development Commands

No build system or package manager has been configured yet, so there are no project commands to run. When adding tooling, document the exact setup, local run, build, and test commands in a `README.md` and keep them working from the repository root. Prefer one reproducible command per task over steps that depend on a developer's local machine.

## Coding Style & Naming Conventions

Follow the conventions of the language and framework selected for the project. Use consistent indentation within each file and descriptive names for modules, functions, and tests. Add a formatter and linter alongside the first code, commit their configuration, and run them before submitting changes. Avoid introducing competing style rules in different parts of the repository.

## Testing Guidelines

There is no test framework or coverage target yet. Add tests with the first behavior-bearing code and keep them in `tests/` or beside the code, using the framework's standard naming pattern. Cover expected behavior and meaningful edge cases. Document how to run the full suite and any focused test command once a framework is chosen.

## Commit & Pull Request Guidelines

There is no Git history here from which to infer a commit convention. Use short, imperative commit subjects that describe the change, such as `Add gift selection screen`. Keep unrelated changes in separate commits. Pull requests should explain the purpose, summarize the changes, list verification performed, and link a relevant issue when one exists. Include screenshots for visible UI changes.
