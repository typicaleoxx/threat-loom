# Normalized Data Model

## Status and intent

This document defines the initial Threat Loom domain model implemented in [`src/domain/models.ts`](../src/domain/models.ts). It is a source-neutral contract for exploration and visualization, not a complete CTI ontology, and remains smaller than the source schemas it may map.

## Shared expectations

Every entity is expected to include:

- `id`: stable internal identifier;
- `type`: stable Threat Loom entity category;
- `name`: primary display name;
- `description`: optional source-supported summary;
- `aliases`: optional alternate names;
- `sourceRefs`: provenance references to source systems or reports;
- `createdAt` and `updatedAt`: optional source timestamps where meaningful.

Optional data stays absent when it is unknown. The adapter must not invent dates, locations, attribution, industries, techniques, or relationships.

The initial model does not include a generic metadata bag. New fields should be typed and added only when a current domain requirement needs them.

## Entity definitions

### ThreatActor

**Purpose:** Represents a named or tracked adversary, intrusion set, or threat group as described by approved sources.

Likely core fields:

- shared entity fields;
- `actorKind`, when a supported distinction is needed;
- `firstSeen` and `lastSeen`, when sources provide them;
- `motivations`, when source-supported;
- `confidence`, if the source provides a meaningful confidence value.

The model must preserve aliases without assuming that similarly named actors are identical.

### Industry

**Purpose:** Represents an economic or organizational sector used to explore targeting relationships.

Likely core fields:

- shared entity fields;
- `sectorCode`, when using an approved taxonomy;
- `parentIndustryId`, only if a hierarchy is required.

Industry relationships describe source-supported targeting or relevance. They do not imply that every organization in the sector was targeted.

### AttackTechnique

**Purpose:** Represents a MITRE ATT&CK technique or sub-technique used to explain observed adversary behavior.

Likely core fields:

- shared entity fields;
- `externalId`, such as an ATT&CK technique identifier;
- `isSubTechnique`;
- `parentTechniqueId`, when applicable;
- `tactics`, when source-supported;
- `referenceUrl` to an approved ATT&CK page.

ATT&CK version context may be added if integration proves it necessary.

### Campaign

**Purpose:** Represents a source-defined grouping of malicious activity over a period or around an objective.

Likely core fields:

- shared entity fields;
- `firstSeen` and `lastSeen`;
- `objective`, when explicitly supported;
- `confidence`, when provided by the source.

Campaign names and boundaries are source-dependent and must retain provenance.

### Malware

**Purpose:** Represents malicious software associated with actors, campaigns, techniques, or infrastructure.

Likely core fields:

- shared entity fields;
- `malwareTypes`, when source-supported;
- `isFamily`, when a source distinguishes families from instances;
- `platforms`, when known.

### Tool

**Purpose:** Represents legitimate or dual-use software used in threat activity.

Likely core fields:

- shared entity fields;
- `toolTypes`, when useful;
- `platforms`, when known;
- `referenceUrl`, when an approved canonical reference exists.

Tools remain distinct from malware so the interface does not label legitimate software as inherently malicious.

### Infrastructure

**Purpose:** Represents infrastructure used to support campaigns or malicious activity, such as domains, hosting, or command-and-control resources.

Likely core fields:

- shared entity fields;
- `infrastructureTypes`;
- `firstSeen` and `lastSeen`;
- `status`, if a source supports a safe lifecycle state.

Infrastructure data requires careful review before public display. Sensitive internal indicators and active operational details are prohibited.

### Location

**Purpose:** Represents source-supported geographic context for actors, campaigns, infrastructure, or targeted areas.

Likely core fields:

- shared entity fields;
- `locationType`, such as country or region;
- `countryCode`, when applicable;
- `region`, when applicable.

Location does not imply attribution or origin unless the relationship and source explicitly state it.

Coordinates and other visualization-specific fields are not part of the initial domain model.

### Report

**Purpose:** Represents a public or appropriately licensed intelligence publication that supplies context or provenance.

Likely core fields:

- shared entity fields;
- `publishedAt`;
- `publisher`;
- `url`, after URL validation;
- `reportTypes`, when useful;
- `license`, access, or redistribution notes when required.

Report content must respect licensing and should normally link to the source rather than reproduce restricted material.

### Relationship

**Purpose:** Represents an explicit, directed, source-supported connection between two entities.

Likely core fields:

- `id`: stable relationship identifier;
- `sourceId`: stable source entity ID;
- `targetId`: stable target entity ID;
- `type`: normalized relationship type;
- `description`: optional source-supported context;
- `firstSeen` and `lastSeen`, when applicable;
- `confidence`, when provided;
- `sourceRefs`: provenance references.

Relationships must refer to existing entity IDs. Direction must remain meaningful even if the visualization renders an undirected visual treatment for a particular view.

## Relationship semantics

The implemented initial vocabulary stays small and should be extended only for real source mappings. Its normalized semantics are:

- `targets`: threat actor or campaign targets an industry or location;
- `uses`: threat actor or campaign uses malware, a tool, infrastructure, or an ATT&CK technique;
- `attributed-to`: campaign or malware is attributed to a threat actor;
- `part-of`: an entity belongs to a larger campaign or technique hierarchy;
- `associated-with`: a source states an association that is not safely represented by a stronger type;
- `describes`: a report provides intelligence about an entity or relationship;
- `located-at`: infrastructure has source-supported geographic context.

Adapters must not promote a weak source association into stronger attribution or causation.

## Example relationships

These examples describe model shape only and are not threat intelligence claims:

```text
development-actor-a --uses--> development-technique-a
development-campaign-a --targets--> development-industry-a
development-actor-a --uses--> development-tool-a
development-report-a --describes--> development-campaign-a
development-infrastructure-a --located-at--> development-location-a
```

Mock identifiers and labels must make their development or test purpose obvious.

## Stable identifier expectations

- IDs remain stable across reloads and must not depend on array position or graph layout.
- Entity IDs are unique across entity categories, or are paired with an explicit type where uniqueness cannot be guaranteed.
- Relationship IDs remain stable for the same normalized source, target, type, and provenance identity.
- Source-native IDs may be retained in provenance but should not leak source conventions into components.
- A deterministic namespaced ID strategy is preferred when a source lacks a suitable stable identifier.
- Changes to identity rules require migration and deduplication consideration before integration.

## Provenance and source expectations

Each entity and relationship retains source references that identify where the information came from. The initial source reference includes a source name and may include a source-native identifier, public URL, publication or retrieval time, marking, and license.

The model must distinguish source-provided facts from normalized labels. Conflicting sources should remain traceable rather than being silently merged into one unsupported claim.

## Mock-data expectations

- Label all fixtures and display content as development or test data.
- Use invented neutral names that cannot be mistaken for current intelligence claims.
- Exercise every planned entity category and important relationship direction with the smallest useful data set.
- Include missing optional fields, duplicate aliases, and invalid records in tests where needed.
- Keep fixtures behind the mock repository. Components must not import them directly.
- Do not copy restricted report text or real sensitive indicators into fixtures.

## OpenCTI mapping considerations

OpenCTI mapping is planned for v1.0. The adapter will need to consider STIX domain objects, cyber observables, OpenCTI-specific entities, relationship direction, external references, object markings, confidence, timestamps, pagination, and schema version changes.

Mapping rules should:

- preserve OpenCTI IDs as source references when useful;
- map only fields needed by Threat Loom experiences;
- enforce approved markings and application data policy before returning records;
- translate source-specific relationship types into the small normalized vocabulary without losing important meaning;
- keep unsupported source fields inside the adapter;
- reject or quarantine malformed records rather than inventing defaults;
- preserve enough source context to investigate mapping errors.

The exact field map should be written against the deployed OpenCTI schema during the integration phase, not guessed during planning.
