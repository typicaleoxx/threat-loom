# Threat Loom

Threat Loom is an interactive cyber threat intelligence visualization platform.

It is planned to help users explore relationships among threat actors, industries, campaigns, malware, tools, MITRE ATT&CK techniques, infrastructure, locations, and public intelligence reports.

> Project status: planning and repository foundation. No application runtime or product functionality has been implemented.

## Purpose

Threat intelligence is often spread across reports, structured platforms, and disconnected records. Threat Loom is intended to make source-supported relationships easier to explore through one clear visual system.

Public deployments will use approved public or appropriately licensed intelligence. They must not expose internal incidents, infrastructure, customer data, employee information, credentials, or restricted intelligence.

## Planned experience

The main experience will center on an interactive relationship graph with contextual detail. The MVP is planned around four modes:

- **Threat actor exploration:** profiles, industries, campaigns, malware and tools, ATT&CK techniques, reports, and supported geographic context.
- **Industry exploration:** actors, techniques, campaigns, and malware or tools associated with a selected industry.
- **ATT&CK technique exploration:** technique details, actors, campaigns, and relevant industries.
- **Optional idle display mode:** a fullscreen sequence that highlights meaningful entities and relationships, then yields immediately to interaction.

## Planned architecture

Early development will use structured mock data behind a repository and adapter boundary:

```text
mock data -> data adapter -> normalized Threat Loom models -> visualization layer
```

The planned production integration will preserve the same frontend model boundary:

```text
OpenCTI GraphQL -> OpenCTI adapter -> normalized Threat Loom models -> visualization layer
```

React components must not depend on raw OpenCTI GraphQL response structures. See [Architecture](docs/ARCHITECTURE.md) and [Data Model](docs/DATA_MODEL.md).

## Planned technology stack

- Next.js, React, and TypeScript
- Tailwind CSS
- Cytoscape.js for the primary relationship graph
- D3.js only for specialized visualizations that materially benefit from it
- Motion or Framer Motion for restrained transitions
- Vitest and React Testing Library
- Playwright in a later phase
- ESLint and Prettier
- OpenCTI Community Edition and its GraphQL API
- Docker for local and internal deployment
- GitHub Actions for continuous integration

The project is intended to remain usable with open-source software, free or public CTI sources, and self-hosted infrastructure. Paid services may be optional integrations, not requirements.

## Repository structure

```text
.
|-- .github/                 GitHub contribution templates
|-- docs/                    Product, architecture, design, security, and workflow plans
|-- AGENTS.md                Repository engineering contract
|-- LICENSE                  Project license
`-- README.md                Project overview
```

Application directories will be documented after the application foundation is initialized.

## Development status

The repository currently contains planning documents and engineering standards only. Setup commands, application source, package manifests, Docker configuration, and CI workflows are intentionally deferred until their roadmap phases.

## Roadmap summary

1. **v0.1 Planning:** product, architecture, data, design, security, and workflow documentation.
2. **v0.2 Foundation:** application shell, normalized model contracts, mock repository, quality tooling, and CI.
3. **v0.3 Graph:** relationship graph transformation and core interactions.
4. **v0.4 Explorer:** actor, industry, and technique exploration flows.
5. **v0.5 Display Mode:** large-screen polish, fullscreen presentation, and idle behavior.
6. **v1.0 OpenCTI Integration:** approved OpenCTI adapter and deployment hardening.

Detailed completion criteria are in the [Roadmap](docs/ROADMAP.md).

## Documentation

- [Product Specification](docs/PRODUCT_SPEC.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Data Model](docs/DATA_MODEL.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Security](docs/SECURITY.md)
- [Roadmap](docs/ROADMAP.md)
- [GitHub Workflow](docs/GITHUB_WORKFLOW.md)
- [Contributing](.github/CONTRIBUTING.md)
- [Engineering Contract](AGENTS.md)
