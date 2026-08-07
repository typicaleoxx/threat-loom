# GitHub Workflow

## Status

This document describes the planned GitHub configuration after the repository foundation is accepted. Repository settings, labels, fields, milestones, protections, and CI checks are not considered active until they are created and verified in GitHub.

## Issues

Use GitHub Issues as the source of work context and acceptance criteria. Create an issue before significant feature, fix, infrastructure, design, testing, refactor, or documentation work. Initial foundation work and very small corrections may be exceptions.

Issue forms should collect the problem before the solution, observable acceptance criteria, affected area, and supporting context. Keep one issue focused on one outcome. Split work when acceptance criteria require unrelated systems or cannot be reviewed together.

## Project board

A repository project should track accepted issues and pull requests through these statuses:

- **Backlog:** recorded work that is not ready to start.
- **Ready:** scoped, prioritized, and free of known blockers.
- **In Progress:** actively being implemented.
- **In Review:** a pull request is open and awaiting review or checks.
- **Blocked:** progress requires a decision, dependency, access, or external change.
- **Done:** merged or otherwise completed with acceptance criteria satisfied.

Status should reflect actual work. Blocked items should state the blocker and owner in the issue rather than relying on the column alone.

## Labels

Use labels for visible classification that remains useful outside the project board.

### Type

- `type: feature`
- `type: bug`
- `type: documentation`
- `type: infrastructure`
- `type: testing`
- `type: design`
- `type: refactor`
- `type: chore`

### Area

- `area: frontend`
- `area: visualization`
- `area: data`
- `area: opencti`
- `area: infrastructure`
- `area: documentation`
- `area: ci-cd`

### Workflow labels

Use a small set only when useful, such as:

- `blocked`
- `security-review`
- `accessibility`
- `good first issue`
- `help wanted`

Priority and effort should use project fields rather than duplicate labels unless repository reporting requires labels.

## Project custom fields

### Priority

- `P0 Critical`: active security exposure, data disclosure, or unusable core deployment requiring immediate attention.
- `P1 High`: blocks a milestone or critical product path.
- `P2 Medium`: important planned work with no immediate release blocker.
- `P3 Low`: useful improvement that can wait.

### Type

Feature, Bug, Documentation, Infrastructure, Testing, Design, Refactor, or Chore.

### Area

Frontend, Visualization, Data, OpenCTI, Infrastructure, Documentation, or CI/CD.

### Effort

- `XS`: isolated change with minimal review surface.
- `S`: small focused change.
- `M`: several related changes within one boundary.
- `L`: substantial feature that may need planned slices.
- `XL`: too large for normal execution and should usually be split before Ready.

The project should also use the Status field represented by the board columns. An iteration field may be added only when the team adopts time-boxed planning.

## Milestones

Create milestones without dates until delivery targets are known:

- `v0.1 Planning`
- `v0.2 Foundation`
- `v0.3 Graph`
- `v0.4 Explorer`
- `v0.5 Display Mode`
- `v1.0 OpenCTI Integration`

Milestone scope and completion criteria are defined in the [Roadmap](ROADMAP.md). Issues should belong to the earliest milestone that needs their result.

## Issue structure

A well-scoped issue includes:

1. **Summary:** one clear outcome.
2. **Problem or context:** why the work is needed and who it affects.
3. **Proposed behavior:** expected user or system behavior without prescribing unnecessary implementation.
4. **Acceptance criteria:** observable, testable completion conditions.
5. **Area and metadata:** appropriate area, type, priority, effort, and milestone.
6. **Additional context:** relevant designs, data constraints, dependencies, or linked decisions.

Bug issues should include reproduction steps, expected and actual behavior, environment, and safe supporting evidence. Remove credentials, restricted intelligence, customer data, employee data, and internal operational details before posting.

## Branch naming

Create branches from the current target branch using:

```text
<category>/<issue-number>-<short-description>
```

Examples:

```text
feat/12-threat-graph
feat/18-industry-explorer
fix/31-node-selection
docs/42-opencti-boundary
chore/55-ci-foundation
```

Use `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, or `infra`. One branch should serve one issue unless a documented decision groups tightly related work.

## Pull requests

Open a pull request when the branch has a reviewable vertical slice. Draft status is appropriate while acceptance criteria or local checks remain incomplete.

The pull request must:

- use the repository template;
- state the outcome and important changes;
- link the issue and use `Closes #<issue>` when merge should close it;
- list exact checks run and their results;
- include screenshots for meaningful visual changes;
- identify documentation updates and known limits;
- avoid unrelated changes.

At least one appropriate reviewer should approve significant work. Data-boundary, security, accessibility, and deployment changes should receive review from someone familiar with that area.

## Issue linking

Use GitHub's development link or a closing keyword in the pull request description. Prefer:

```text
Closes #12
```

Use `Refs #12` when the pull request contributes to an issue but should not close it. Follow-up work receives its own issue rather than remaining only in a review comment.

## CI relationship

GitHub Actions is planned to verify formatting, ESLint, TypeScript, unit and component tests, and the production build. Playwright and container checks will be added when those layers exist.

Main branch protection should require current CI checks and review before merge after the workflow is established. Checks must run with least-privilege permissions and without production secrets. A pull request is not ready to merge when a required check is skipped, stale, or failing.

## Example issue lifecycle

1. A contributor creates feature issue `#12` for the normalized graph transformer, with acceptance criteria and `v0.3 Graph` milestone.
2. The issue receives `type: feature` and `area: visualization`, plus Priority `P1 High` and Effort `M`.
3. After scope review, the issue moves from Backlog to Ready.
4. The contributor creates `feat/12-threat-graph` and moves the issue to In Progress.
5. Focused commits add transformation behavior, tests, and documentation.
6. The contributor opens a pull request with `Closes #12`, records checks, and moves the item to In Review.
7. Review verifies the normalized model boundary, stable IDs, relationship semantics, tests, and documentation. CI passes.
8. The pull request merges. GitHub closes the issue, and the project item moves to Done.

See [Development](DEVELOPMENT.md) for coding and review expectations and [Contributing](../.github/CONTRIBUTING.md) for the short contributor path.
