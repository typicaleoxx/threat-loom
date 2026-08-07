# Development Guide

## Current status

Threat Loom is in the planning and repository foundation stage. The application, package scripts, tests, CI workflow, and local runtime have not been initialized.

The repository-wide contract is [AGENTS.md](../AGENTS.md). Architecture, domain, security, and visual rules are maintained in their focused documents rather than repeated here.

## Engineering workflow

Initial repository documentation and foundation may be established on `main`. After the foundation is stable, significant work follows this sequence:

1. Create or select an issue with clear context and acceptance criteria.
2. Confirm the milestone, priority, type, area, and effort where those fields are available.
3. Create a branch tied to the issue.
4. Make one focused change at a time with tests and documentation.
5. Open a pull request and link the issue.
6. Complete review and required CI checks.
7. Merge only when acceptance criteria and quality gates are satisfied.

Use the smallest change that fully meets the issue. Do not mix cleanup, refactoring, or later roadmap work into a focused pull request.

## Issue-first feature work

Create an issue before significant features, fixes, infrastructure changes, or architectural decisions. Small typo corrections and initial repository foundation work may proceed without a dedicated issue.

A useful issue states the problem, proposed outcome, acceptance criteria, area, constraints, and relevant documentation. See [GitHub Workflow](GITHUB_WORKFLOW.md) and the repository issue forms.

## Branch naming

Use a short category, issue number, and descriptive slug:

```text
feat/12-threat-graph
fix/31-node-selection
docs/42-opencti-boundary
chore/55-ci-foundation
```

Prefer `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, or `infra` as the category. Keep branches focused and current with the target branch according to the repository's chosen merge policy.

## Commits

Use concise conventional-style subjects that describe one logical unit:

```text
docs: add initial system architecture
docs: define threat intelligence data model
chore: initialize application foundation
feat: add threat graph data transformer
test: cover graph normalization logic
fix: preserve node selection during graph filtering
```

- Write subjects in the imperative mood and keep them specific.
- Do not combine unrelated changes.
- Do not claim checks or behavior that were not verified.
- Do not commit secrets, populated environment files, local output, or temporary files.
- Update documentation in the same logical change as the contract it describes.

## Pull requests

Pull requests should be small enough to review as one coherent change. Complete the pull request template with:

- a factual summary;
- the related issue and `Closes #<issue>` when appropriate;
- notable implementation and boundary changes;
- exact testing performed and results;
- screenshots for meaningful visual changes;
- documentation changes or a reason none were needed;
- known limits or follow-up work.

Draft pull requests may be used for early feedback. A pull request should not be marked ready until its scope is complete and local checks pass.

## Code review expectations

Reviewers should check:

- behavior against acceptance criteria;
- normalized data and adapter boundaries;
- unsupported assumptions or fabricated relationships;
- security and approved-data separation;
- accessibility and large-screen usability for interface changes;
- source-specific types leaking into components;
- error, empty, and partial-data behavior;
- focused tests and maintainable documentation;
- unnecessary dependencies or abstractions.

Authors should respond to review with code, clarification, or a focused follow-up issue. Resolve conversations only when the concern is addressed or an agreed decision is recorded.

## Testing expectations

The planned testing layers are:

- **Vitest:** normalized model behavior, adapters, graph transformation, filters, identity, and other domain logic.
- **React Testing Library:** component behavior, keyboard access, semantic controls, selection, and visible states.
- **Playwright:** later end-to-end exploration, idle-mode interruption, responsive layouts, and critical accessibility checks.

Tests must not require a live OpenCTI instance unless they are explicitly marked integration tests and run in an approved environment. Use representative, clearly labeled test data. Every defect fix should include a regression test when practical.

Once scripts exist, changes must pass formatting, linting, TypeScript checking, relevant tests, and a production build before merge. Commands will be documented here after initialization.

## CI expectations

GitHub Actions is planned for continuous integration. The initial workflow should install dependencies reproducibly and run:

1. formatting verification;
2. ESLint;
3. TypeScript checking;
4. unit and component tests;
5. production build.

Playwright and container checks should be added when those capabilities exist. Required checks should protect the main branch. CI must use least-privilege permissions, pinned action versions, caching that does not contain secrets, and no production credentials.

## Documentation maintenance

- Update the focused document that owns a decision rather than copying full sections elsewhere.
- Keep the README status and repository structure accurate.
- Update [Architecture](ARCHITECTURE.md) when system boundaries change.
- Update [Data Model](DATA_MODEL.md) when normalized contracts or relationship semantics change.
- Update [Design System](DESIGN_SYSTEM.md) when visual tokens or interaction rules become established.
- Update [Security](SECURITY.md) when trust boundaries or data policy change.
- Update [Roadmap](ROADMAP.md) when phase scope or completion criteria change.
- Clearly distinguish plans, current behavior, and deferred work.

## Source comments and documentation

Where the language supports comments, each meaningful source file starts with one concise first-line comment describing the file's purpose.

Every meaningful function uses the language-appropriate documentation convention. TypeScript functions use TSDoc or JSDoc to document purpose, parameters, return values, and important behavior or constraints. Public types, interfaces, adapters, and transformations require especially clear documentation.

Add concise comments before non-obvious logic. Explain intent, reasoning, transformations, or constraints. Do not narrate syntax or preserve comments that no longer match behavior.

Repository prose must not use em dashes. It must remain factual and must not present development data as real intelligence.

## Local setup

**Pending until application initialization.**

There are no valid install, run, test, or build commands yet. This section will be replaced with verified commands during v0.2 Foundation after the package manager, runtime requirements, environment variables, and scripts are established.
