# Product Specification

## Status

Threat Loom is in the planning and repository foundation stage. This document defines intended product behavior and does not describe implemented functionality.

## Problem statement

Cyber threat intelligence is distributed across reports, structured platforms, and disconnected records. Lists and dense administrative screens can hide how threat actors, targets, campaigns, techniques, malware, tools, infrastructure, locations, and reports connect.

## Product vision

Threat Loom will provide an interactive view of approved threat intelligence centered on explicit, source-supported relationships. Users should be able to understand and follow those relationships without needing to understand the underlying CTI platform.

## Primary audiences

- Security analysts exploring relationships across loaded intelligence.
- Security leaders and educators explaining threat relationships.
- Researchers and other users working with public threat intelligence.
- Developers and operators maintaining a self-hosted visualization experience.

Threat Loom is not planned as an incident response console or a replacement for OpenCTI analyst workflows.

## Primary exploration use case

A user selects a threat actor, industry, or ATT&CK technique, explores its relationship graph, opens concise contextual details, and follows provenance links to public reports. Selection and filtering preserve enough context to understand how the visible entities connect.

## Product goals

- Make threat relationships understandable through one primary graph experience.
- Support exploration by threat actor, industry, and ATT&CK technique.
- Present only relationships supported by loaded intelligence.
- Preserve provenance so users can distinguish evidence from presentation.
- Provide a polished large-screen idle experience that becomes interactive immediately.
- Keep the frontend independent of raw OpenCTI response structures.
- Remain deployable with open-source software, self-hosted infrastructure, and free or public CTI sources.
- Maintain desktop usability, accessibility, and sufficient contrast.

## Non-goals

The initial MVP will not:

- replace OpenCTI for ingestion, enrichment, case management, or analyst administration;
- visualize internal incidents or operational telemetry;
- provide attack simulation, threat scoring, automated attribution, or predictive claims;
- include a general-purpose dashboard with many unrelated charts;
- require paid data, hosted services, or proprietary infrastructure;
- support unrestricted editing of intelligence from the exploration interface;
- infer geographic activity when sources do not support it.

## Exploration experiences

### Threat actor exploration

A user will be able to select a threat actor and view:

- a concise profile and source context;
- an interactive relationship graph;
- associated industries, campaigns, malware, and tools;
- ATT&CK techniques attributed by loaded intelligence;
- related reports;
- infrastructure, locations, or geographic context only when supported by sources.

Selecting a graph entity should update contextual details without losing the user's place. Filters should make dense relationships manageable while preserving clear evidence paths.

### Industry exploration

A user will be able to select an industry such as healthcare, education, finance, government, technology, telecommunications, energy, or manufacturing. The experience will show source-supported actors, common techniques, campaigns, and malware or tools associated with that industry. The interface must not imply that an absent relationship means no threat exists.

### ATT&CK technique exploration

A user will be able to inspect a technique's identifier, name, concise description, related actors, associated campaigns, and relevant industries. Technique relationships must identify their provenance and must not be inferred solely for visual completeness.

### Optional idle display mode

Idle mode will cycle through curated, meaningful entities and relationships with restrained motion and readable pacing. It must:

- avoid random or unsupported connections;
- provide enough time to read labels and context;
- stop immediately on interaction;
- avoid trapping keyboard or touch input;
- respect reduced-motion preferences where available;
- support a configurable return to idle behavior;
- remain suitable for 1920x1080 and 3840x2160 landscape displays.

## Functional requirements

The initial MVP is planned to:

1. Load clearly labeled mock data through a repository or adapter boundary.
2. Normalize all supported entities into stable Threat Loom domain models.
3. Represent source-supported connections as explicit relationships.
4. Render a primary interactive relationship graph.
5. Support selection, focus, filtering, and contextual detail for graph entities.
6. Provide threat actor, industry, and ATT&CK technique entry points.
7. Link reports and provenance where safe public URLs are available.
8. Distinguish entity categories consistently through labels, shape, color, or other redundant cues.
9. Provide empty, loading, and error states without inventing content.
10. Support an idle presentation that yields immediately to interaction.
11. Keep raw source response structures outside UI components.

## Non-functional requirements

- **Readability:** primary labels and controls must work at common viewing distances on 1080p and 4K displays.
- **Responsiveness:** layouts must remain useful on normal desktop screens.
- **Accessibility:** keyboard access, visible focus, semantic controls, contrast, reduced-motion support, and non-color cues are required.
- **Performance:** interactions should remain responsive for the approved MVP data set. Data-size budgets will be measured and set during graph implementation.
- **Reliability:** malformed or partial records must fail safely at the data boundary and produce understandable UI states.
- **Maintainability:** domain, source adapter, graph transformation, and presentation concerns must remain separated.
- **Testability:** frontend tests must run without a live OpenCTI instance.
- **Deployability:** the planned system must support self-hosted Docker deployment.

## Privacy and security constraints

- Publicly displayed data must come from approved public or appropriately licensed sources unless another use is explicitly approved.
- Internal incidents, infrastructure, customer data, employee information, credentials, restricted intelligence, and sensitive operational information are prohibited.
- Provenance must remain attached through normalization and display.
- External text and URLs are untrusted and must be handled safely.
- OpenCTI and connector secrets must never be sent to the browser.
- Geographic context must be source-supported and presented without implying unsupported precision.

See [Security](SECURITY.md) for engineering requirements.

## MVP scope

The MVP includes the normalized entity and relationship model, mock repository, primary relationship graph, actor exploration, industry exploration, technique exploration, contextual report references, responsive layouts, accessibility fundamentals, and optional idle display behavior.

The MVP excludes live OpenCTI integration. That integration is planned for v1.0 after the frontend boundary is proven with mock data.

## Future possibilities

Possible later work includes live OpenCTI integration, additional public CTI connectors, richer timelines where D3.js adds clear value, saved exploration sequences, configurable idle playlists, multilingual presentation, and optional local intelligence assistance. Any assistance feature must use approved data, expose provenance, avoid unsupported conclusions, and remain optional.

## Initial MVP acceptance criteria

The initial MVP will be accepted when:

- actor, industry, and technique entry points operate against normalized mock data;
- the graph shows explicit entity and relationship semantics with stable identifiers;
- selection, focus, filtering, and detail views behave consistently;
- reports and provenance are visible for supported relationships;
- no React component depends on a raw OpenCTI GraphQL response type;
- idle mode cycles through curated content and stops immediately on interaction;
- representative layouts are usable at 1920x1080, 3840x2160, and a normal desktop viewport;
- core controls are keyboard accessible, contrast is sufficient, and reduced motion is respected;
- malformed data and unavailable relationships produce safe, clear states;
- lint, formatting, type checking, unit tests, component tests, and the production build pass;
- documentation accurately describes the implemented architecture and known limits;
- a review confirms that publicly displayed content contains no prohibited internal or sensitive data.
