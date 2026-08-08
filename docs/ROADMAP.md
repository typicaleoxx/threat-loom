# Roadmap

## Status

This roadmap describes planned phases and completion criteria. It contains no delivery dates because none have been established. A phase is complete only when its criteria are met and the documentation reflects the implemented state.

## v0.1 Planning

### Objective

Establish the product, architecture, domain, design, security, and engineering foundation before application code begins.

### Major deliverables

- repository engineering contract and public README;
- product specification;
- planned architecture and normalized data model;
- design system direction and accessibility principles;
- development, security, roadmap, and GitHub workflow documentation;
- issue and pull request templates.

### Completion criteria

- documents use consistent terminology and link to their authoritative detail;
- planned behavior is clearly distinguished from implemented behavior;
- architecture preserves the adapter and normalized model boundary;
- approved-data restrictions and security boundaries are explicit;
- repository templates support the agreed workflow;
- documentation receives project-owner review.

## v0.2 Foundation

### Objective

Create the smallest maintainable application foundation needed for feature development.

### Current progress

The minimal Next.js application shell, normalized domain contracts, synthetic development dataset, mock repository, TypeScript, Tailwind CSS, Vitest, React Testing Library, ESLint, Prettier, GitHub Actions CI, npm scripts, and local setup documentation are initialized. Product interface work remains pending.

### Major deliverables

- Next.js, React, and TypeScript application shell;
- Tailwind CSS and initial semantic design tokens;
- normalized domain type contracts;
- mock repository and clearly labeled development data;
- baseline navigation and responsive layout regions;
- Vitest, React Testing Library, ESLint, and Prettier configuration;
- initial GitHub Actions quality workflow;
- verified local setup documentation.

### Completion criteria

- the application runs locally with documented commands;
- components receive normalized data only through the repository boundary;
- mock data cannot be mistaken for current intelligence;
- formatting, linting, type checking, tests, and production build pass in CI;
- baseline accessibility and supported viewport checks pass;
- no OpenCTI integration or unnecessary deployment services are introduced.

## v0.3 Graph

### Objective

Deliver the primary relationship graph and its data transformation boundary.

### Major deliverables

- Cytoscape.js integration;
- normalized model to graph transformation;
- semantic node and edge treatment;
- selection, focus, filtering, zoom, and clear reset behavior;
- graph legend and accessible relationship details;
- deterministic development layouts and graph states;
- focused unit and component tests.

### Completion criteria

- each visible node and edge maps to normalized source-supported data;
- stable identifiers preserve selection through compatible updates;
- graph behavior remains responsive for the agreed representative data set;
- keyboard users can reach equivalent entity and relationship details;
- empty, partial, and invalid data states are clear;
- graph tests and all repository quality gates pass.

## v0.4 Explorer

### Objective

Build complete exploration flows around the graph.

### Major deliverables

- threat actor profiles and relationship exploration;
- industry selection and relevant relationship views;
- ATT&CK technique information and relationship views;
- campaign, malware, tool, report, infrastructure, and location context where supported;
- safe provenance and report links;
- navigation and state behavior across modes.

### Completion criteria

- actor, industry, and technique entry points satisfy the product specification;
- all displayed claims and relationships retain provenance;
- unsupported or missing associations are not implied;
- selection and context remain understandable across modes;
- representative desktop and large-screen layouts are usable;
- component and integration coverage protects primary flows.

## v0.5 Display Mode

### Objective

Add polished fullscreen and passive display capabilities without changing the core exploration model.

### Major deliverables

- curated idle sequence backed by loaded intelligence;
- immediate interruption and reliable return-to-idle behavior;
- restrained transitions and reduced-motion mode;
- touch-friendly controls where practical;
- 1080p and 4K layout, readability, and performance refinement;
- fullscreen recovery and operational guidance;
- end-to-end coverage for idle display behavior.

### Completion criteria

- physical or representative display review confirms readability at 1920x1080 and 3840x2160;
- first interaction stops idle motion and enables exploration;
- idle content contains no random or unsupported relationships;
- keyboard, pointer, and touch paths are usable for core actions;
- reduced-motion behavior is verified;
- the display recovers safely from inactivity and expected application errors.

## v1.0 OpenCTI Integration

### Objective

Replace the mock source with an approved OpenCTI Community Edition integration without changing visualization contracts.

### Major deliverables

- server-side OpenCTI GraphQL client and adapter;
- validated mapping to normalized Threat Loom models;
- pagination, timeouts, safe errors, and measured caching where needed;
- markings, provenance, licensing, and approved-data enforcement;
- dedicated or rigorously isolated approved OpenCTI data scope;
- Docker-based deployment and operational documentation;
- integration, security, performance, and recovery testing.

### Completion criteria

- React and graph components remain independent of raw OpenCTI response types;
- application credentials are least-privilege, server-side, and injected securely;
- only approved public or appropriately licensed intelligence reaches public deployments;
- mapping behavior is tested against the deployed OpenCTI schema;
- deployment boundaries prevent direct browser access to OpenCTI and internal systems;
- mock mode remains available for development and deterministic tests;
- quality, security, and operational acceptance checks pass.

## Optional future local intelligence assistance

### Objective

Evaluate optional self-hosted assistance that helps users navigate approved loaded intelligence without replacing source evidence.

### Major deliverables

- a narrowly defined, user-reviewed use case;
- local or self-hosted processing option;
- provenance-linked responses limited to approved data;
- clear uncertainty and unsupported-request behavior;
- security, privacy, accessibility, and performance evaluation;
- an off switch with no effect on core exploration.

### Completion criteria

- the capability is optional and the core product works without it;
- outputs cite approved source records and do not invent relationships or attribution;
- no user query or intelligence leaves the approved environment unless explicitly configured and approved;
- evaluation demonstrates a material benefit over direct navigation;
- security and product reviews approve deployment.

This phase remains optional and should not begin until the core exploration and OpenCTI boundaries are stable.
