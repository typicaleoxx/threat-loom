# Threat Loom Engineering Contract

## Purpose and status

Threat Loom is an interactive cyber threat intelligence visualization platform. It is planned to expose source-supported relationships among threat actors, industries, campaigns, malware, tools, MITRE ATT&CK techniques, infrastructure, locations, and reports.

The repository is currently in its planning and foundation stage. Do not describe planned behavior as implemented.

## Required architecture

Preserve this boundary throughout development:

```text
data source -> source adapter or repository -> normalized domain models -> visualization and UI
```

Early work will use clearly labeled mock data. OpenCTI Community Edition integration is planned for a later phase through its GraphQL API. Raw OpenCTI response types must remain inside the OpenCTI adapter and must not enter React components, graph components, or general domain logic.

Use Cytoscape.js for the main relationship graph. Use D3.js only when a specialized visualization materially benefits from it. Do not introduce abstractions, dependencies, services, or deployment components before a current requirement needs them.

See [Architecture](docs/ARCHITECTURE.md) and [Data Model](docs/DATA_MODEL.md).

## Coding standards

- Use TypeScript with explicit domain types at data and component boundaries.
- Prefer small, focused modules and native platform features.
- Reuse existing project patterns before adding a new one.
- Keep source-specific mapping in adapters and presentation-specific mapping near the visualization layer.
- Validate untrusted data at its boundary. Do not rely on display components to repair invalid records.
- Avoid unrelated refactors and speculative framework code.
- Follow the configured ESLint, Prettier, type-checking, and test commands once they exist.
- Add dependencies only when the platform or existing dependencies do not meet a demonstrated need.

## Documentation and comments

Repository prose must be clear, factual, and professional.

- Do not use em dashes.
- Do not use inflated claims, vague buzzwords, or claims about unimplemented behavior.
- Do not present mock threat intelligence as factual intelligence.
- Begin each meaningful source file with one concise first-line comment describing its purpose, where the language supports comments.
- Document every meaningful function with the language-appropriate convention. Include purpose, parameters, return value, and important behavior or constraints when needed.
- Give public types, interfaces, adapters, and transformation functions especially clear documentation.
- Add concise comments before non-obvious logic. Explain intent or constraints, not syntax.
- Keep documentation updated in the same change as behavior or architecture.

## Testing and quality

Tests should follow risk and behavior boundaries.

- Unit test normalization, graph transformation, filtering, stable identifiers, and other non-trivial domain logic with Vitest.
- Test user-visible component behavior with React Testing Library.
- Add Playwright coverage when end-to-end flows are introduced.
- Include accessibility checks in component and end-to-end coverage where practical.
- Mock external boundaries. Do not require a live OpenCTI instance for frontend unit or component tests.
- Before merge, run the configured lint, format check, type check, tests, and production build.
- Add a regression test for each corrected defect when the behavior can be reproduced reliably.

## Engineering workflow

Initial repository documentation and foundation may be prepared on `main`. After that foundation is stable:

1. Create or select a GitHub Issue before significant work.
2. Use a focused branch tied to the issue, such as `feat/12-threat-graph` or `fix/31-node-selection`.
3. Make small conventional-style commits that each represent one logical change.
4. Open a pull request, reference the issue, and use `Closes #<issue>` when the merge should close it.
5. Complete review and all required checks before merge.

Do not combine unrelated work. Do not commit generated output, local configuration, secrets, or environment files. See [Development](docs/DEVELOPMENT.md) and [GitHub Workflow](docs/GITHUB_WORKFLOW.md).

## Security and data handling

- Public deployments must use approved public or appropriately licensed intelligence unless a documented approval allows another source.
- Never display internal incidents, internal infrastructure, customer data, employee information, credentials, restricted intelligence, or sensitive operations.
- Never commit credentials, API keys, tokens, connector secrets, or populated `.env` files.
- Preserve provenance and source references through normalization.
- Treat source labels, descriptions, and URLs as untrusted input. Sanitize rendered content and validate external links.
- Keep OpenCTI and connector credentials server-side and outside browser bundles.
- Maintain a clear separation between approved application data and internal systems.

See [Security](docs/SECURITY.md).

## Visual and interaction standards

Threat Loom should feel like a focused intelligence visualization product, not a generic administrative dashboard.

- Use a dark neutral foundation, generous spacing, strong typography, and restrained semantic color.
- Let color communicate entity type, state, or relationship meaning.
- Prioritize one strong hero visualization over collections of small cards.
- Maintain readability at 1920x1080 and 3840x2160 while supporting normal desktop development.
- Keep interaction touch-friendly where possible and preserve keyboard access, visible focus, contrast, and reduced-motion behavior.
- Use subtle transitions that clarify changes. Avoid continuous decorative motion.
- Do not use Matrix backgrounds, fake terminals, random glowing shapes, excessive neon, meaningless attack lines, flashing widgets, heavy glass effects, or decorative elements without information value.

See [Design System](docs/DESIGN_SYSTEM.md).

## Contributor rules

- Read the relevant specification before changing a boundary or user flow.
- Trace definitions and usages before editing shared code.
- Keep the smallest change that fully satisfies the current requirement.
- Preserve stable domain identifiers and explicit relationship semantics.
- Keep paid services optional.
- Record architectural decisions and rationale when a change alters a documented boundary.
- Update tests and documentation with the code they describe.
- Stop at the approved phase. Do not begin later roadmap work without approval.
