# Architecture

## Status

Threat Loom currently has a minimal Next.js application shell, source-neutral domain model contracts, a normalized development-only dataset, and a mock repository implementation. Visualization, OpenCTI, production adapter, and deployment architecture remain planned and are not implemented.

## Architecture principles

1. **Normalize at the source boundary.** Source-specific schemas end at their adapter.
2. **Keep relationships explicit.** The graph renders supported entities and relationships rather than inventing visual connections.
3. **Design for replacement of the data source.** Mock data and OpenCTI should satisfy the same frontend-facing repository contract.
4. **Keep presentation independent.** React and visualization code consume Threat Loom domain models, not GraphQL records.
5. **Prefer one primary visualization.** Cytoscape.js owns the main relationship graph. D3.js is reserved for specialized cases, such as a timeline whose needs Cytoscape.js does not meet.
6. **Keep secrets server-side.** Browsers never receive OpenCTI or connector credentials.
7. **Separate approved application data from internal operations.** Public deployments do not query or expose internal data.
8. **Remain self-hostable.** Core operation must not depend on paid services.
9. **Add infrastructure only when required.** Early work should prove the product boundary with mock data before adding OpenCTI or deployment complexity.

## Development architecture

```text
clearly labeled mock records
           |
           v
    mock repository
           |
           v
 normalized Threat Loom models
           |
           +-------------------+
           |                   |
           v                   v
 graph transformation     view models
           |                   |
           v                   v
 Cytoscape.js graph       React interface
```

The mock repository returns normalized domain entities and relationships from the synthetic dataset. React components must depend on the repository contract and must not import fixtures directly. The graph transformation and view-model layers remain planned.

Mock records must be labeled as development or test data. They must not be presented as current threat intelligence.

## Planned OpenCTI architecture

```text
approved OpenCTI Community Edition
              |
              | GraphQL over an authenticated server connection
              v
      OpenCTI integration service
              |
      query, pagination, mapping,
      validation, provenance policy
              |
              v
 normalized Threat Loom models
              |
              +-------------------+
              |                   |
              v                   v
     graph transformation     React interface
              |
              v
       Cytoscape.js graph
```

The exact Next.js server boundary and caching approach will be decided during foundation and integration work. The invariant is that OpenCTI credentials and raw GraphQL response structures remain outside browser-facing components.

## Frontend responsibilities

The planned frontend will:

- provide actor, industry, and ATT&CK technique entry points;
- manage selection, filters, navigation, focus, and idle-state transitions;
- transform normalized entities and relationships into Cytoscape.js elements;
- render contextual details and provenance;
- provide safe loading, empty, partial-data, and error states;
- support large landscape displays and normal desktop layouts;
- preserve keyboard access, touch-friendly targets, contrast, and reduced-motion behavior.

The frontend will not ingest CTI feeds, store connector secrets, perform analyst case management, or infer unsupported relationships.

## Data adapter and repository boundary

The async repository contract is implemented in [`src/data/repository.ts`](../src/data/repository.ts), with the development implementation in [`src/data/mock/repository.ts`](../src/data/mock/repository.ts). It supports focused queries to:

- retrieve an entity by stable ID;
- list entities by supported category;
- retrieve relationships for an entity or exploration context;
- retrieve related entities with optional direction and relationship-type filters.

Missing entity lookups return `undefined`. Relationship direction defaults to both incoming and outgoing connections. The async contract allows a later remote implementation without changing feature-facing method signatures.

Adapters are responsible for source validation, source-to-domain mapping, relationship direction, identifier strategy, provenance, and source-specific error translation. Components are responsible for presentation, not data repair.

## Normalized data model boundary

Normalized models are implemented in [`src/domain/models.ts`](../src/domain/models.ts) as source-neutral contracts for `ThreatActor`, `Industry`, `AttackTechnique`, `Campaign`, `Malware`, `Tool`, `Infrastructure`, `Location`, `Report`, and `Relationship`.

Every entity has a stable internal ID and type. Every relationship has a stable ID, source entity ID, target entity ID, relationship type, and provenance where available. Optional fields remain optional rather than being filled with invented values.

The model stays intentionally small until real graph and OpenCTI mapping needs justify additions. See [Data Model](DATA_MODEL.md).

## Visualization layer

Cytoscape.js is planned as the graph rendering and interaction engine. A dedicated transformation step will map normalized domain data to graph nodes, edges, styles, and layout inputs. This step must be unit-testable without a browser and must not fetch data.

Semantic entity categories will drive visual treatment. Selection, focus, filtering, and neighborhood expansion should preserve graph context. Layout choices must be deterministic enough for testing and stable enough to avoid disorienting movement.

D3.js may be added only for a specialized visualization with a clear requirement, such as a custom timeline. It should not duplicate graph behavior.

## OpenCTI integration boundary

The planned OpenCTI adapter will own:

- authenticated GraphQL requests;
- pagination and query limits;
- OpenCTI entity and relationship mapping;
- schema-version compatibility handling;
- provenance and marking checks;
- retries, timeouts, and safe error translation;
- exclusion of records outside the approved application data scope.

OpenCTI identifiers may be retained as source references, but Threat Loom stable IDs must not depend on React components understanding OpenCTI conventions.

## Deployment concept

The planned deployment is self-hosted and separates the Threat Loom application from the approved CTI backend.

```text
browser or fullscreen display
      |
      | HTTPS, no CTI credentials
      v
Threat Loom application
      |
      | authenticated server-side GraphQL
      v
approved OpenCTI instance
      |
      v
approved public or licensed sources
```

Network policy should allow only required application-to-OpenCTI communication. Client networks should not gain direct access to OpenCTI administration or internal systems.

## Docker direction

Docker configuration is planned, not present. It should eventually provide reproducible local and internal deployment for the Threat Loom application. OpenCTI Community Edition may run as a separately managed stack rather than being coupled to the frontend container lifecycle.

Planned container requirements include non-root execution where practical, minimal images, health checks, explicit configuration, immutable application images, mounted or injected secrets, and documented network boundaries. Docker files will be added only when the application foundation exists.

## Security boundaries

1. **Browser boundary:** no CTI credentials, connector secrets, or untrusted executable content.
2. **Application boundary:** validates requests, sanitizes display content, applies data approval policy, and limits outbound access.
3. **Adapter boundary:** validates source records, preserves provenance, enforces mapping rules, and rejects unsupported data.
4. **OpenCTI boundary:** restricts account permissions, network access, markings, and collections to the approved application data set.
5. **Source boundary:** accepts only approved public or appropriately licensed intelligence and validates external URLs and content.

## Approved CTI and internal data separation

The preferred strategy is a dedicated OpenCTI instance, tenant, or rigorously isolated collection for approved intelligence, with a least-privilege application account. The exact mechanism depends on the OpenCTI deployment and must be validated before integration.

Threat Loom must not query a broad internal data set and rely only on frontend filtering. Authorization and data selection belong upstream and server-side. Internal incidents, infrastructure, customer data, employee information, restricted intelligence, credentials, and operational details are prohibited in publicly displayed data.

## Architectural decisions and rationale

| Decision | Rationale |
| --- | --- |
| OpenCTI Community Edition is the planned CTI backend. | It supports a self-hosted, open-source-aligned system and provides a structured GraphQL API. |
| Mock data precedes OpenCTI integration. | It lets product and visualization work establish the domain contract without coupling UI progress to backend deployment. |
| A repository and adapter boundary isolates sources. | It prevents raw OpenCTI structures from spreading through components and keeps source replacement testable. |
| Normalized entities and explicit relationships form the core model. | The product is relationship-first and requires consistent semantics across sources and views. |
| Cytoscape.js owns the main graph. | It is designed for interactive graph visualization and avoids a custom graph engine. |
| D3.js is conditional. | It adds value for specialized visualizations but would add unnecessary overlap for the primary graph. |
| Approved application data is separated from internal data. | Frontend filtering is not an adequate security control for sensitive intelligence. |
| Core deployment remains self-hosted and paid services remain optional. | This preserves accessibility, control, and the stated operating model. |

Decisions that change these boundaries should update this document and the related issue or pull request.
