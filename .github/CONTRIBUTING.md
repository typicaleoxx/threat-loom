# Contributing to Threat Loom

Threat Loom is currently in its planning and repository foundation stage. Do not begin application implementation until the foundation is approved and the relevant issue is ready.

## Before contributing

Read:

- [Engineering Contract](../AGENTS.md) for repository-wide rules;
- [Development Guide](../docs/DEVELOPMENT.md) for coding, testing, and review expectations;
- [Architecture](../docs/ARCHITECTURE.md) and [Data Model](../docs/DATA_MODEL.md) before changing data or visualization boundaries;
- [Security](../docs/SECURITY.md) before handling intelligence, URLs, credentials, or deployment;
- [GitHub Workflow](../docs/GITHUB_WORKFLOW.md) for issue and project conventions.

## Contributor workflow

After the repository foundation is stable:

1. Create or select a focused GitHub Issue with acceptance criteria.
2. Confirm that the issue is Ready and assigned to the correct milestone.
3. Create a branch such as `feat/12-threat-graph` or `fix/31-node-selection`.
4. Make the smallest complete change and keep unrelated work out.
5. Add or update tests and focused documentation with the behavior they describe.
6. Run all configured formatting, lint, type-check, test, and build commands.
7. Open a pull request using the template and link the issue with `Closes #<issue>` when appropriate.
8. Address review and required CI checks before merge.

Do not commit or post credentials, restricted intelligence, internal incidents, customer data, employee information, or sensitive operational details.

## Contribution standards

- Preserve the repository, adapter, normalized model, and visualization boundaries.
- Keep raw OpenCTI GraphQL structures out of React components.
- Treat displayed entities and relationships as source-supported claims with provenance.
- Label mock content as development or test data.
- Keep paid services optional and core operation self-hostable.
- Write clear, factual prose without em dashes or claims about unfinished functionality.
- Follow the source documentation and comment rules in the [Development Guide](../docs/DEVELOPMENT.md).
- Add dependencies only for a demonstrated requirement.
- Update the focused architecture or product document when a contract changes.

## Reviews

A pull request should be one coherent review unit. Reviewers will check acceptance criteria, architecture boundaries, data safety, accessibility, tests, documentation, and unnecessary complexity. Security-sensitive or boundary-changing work may require an additional focused review.

Local setup instructions are pending application initialization. Do not invent installation or runtime commands before verified project scripts exist.
