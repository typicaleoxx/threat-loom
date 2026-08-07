# Security Principles

## Status and scope

Threat Loom is in the planning stage. This document defines project-specific security requirements for development, integration, and deployment. It is not a claim that deployment controls already exist.

## Approved data policy

Public deployments must use approved public or appropriately licensed threat intelligence unless another data set receives explicit documented approval. Approval must cover collection, processing, display, licensing, and retention.

Threat Loom must never expose:

- internal incidents or case data;
- internal infrastructure or network details;
- customer or partner data;
- employee information;
- credentials, API keys, tokens, or connector secrets;
- restricted intelligence or source material without display rights;
- sensitive operational indicators or active investigative details.

Frontend filtering is not an acceptable control for separating public and restricted data.

## Secrets and environment files

- Never commit credentials, API keys, access tokens, private certificates, or populated `.env` files.
- `.env` and `.env.*` files remain ignored. A future `.env.example` may contain names and safe placeholders only.
- Browser-exposed environment variables must be treated as public.
- OpenCTI and connector credentials belong in server-side secret storage or deployment-time secret injection.
- Logs, screenshots, test fixtures, issue descriptions, and CI output must not contain secrets.
- Suspected exposure requires immediate credential rotation and repository history review through the approved response process.

## Data provenance

Every displayed entity and relationship should retain source provenance sufficient to identify its origin. Adapters must preserve source references, relevant markings, license or access constraints, and confidence when the source provides it.

Do not turn weak association into attribution, infer missing relationships, or present stale data as live. Mock data must be clearly labeled as development or test data. Conflicting source claims should remain traceable rather than being silently collapsed.

## OpenCTI separation strategy

The preferred public deployment uses a dedicated OpenCTI instance, tenant, or rigorously isolated collection containing only approved data. A least-privilege application account should have read access only to the required objects and relationships.

The Threat Loom server will be the only planned OpenCTI client for the application. Browsers must not connect directly to OpenCTI. Network controls should prevent client networks from reaching OpenCTI administration or internal systems.

Before live integration, the team must verify:

- the approved data boundary and object markings;
- account and token scope;
- GraphQL query limits and timeouts;
- audit logging without sensitive response bodies;
- server-side filtering and mapping behavior;
- failure behavior when unauthorized or malformed records appear.

## Connector and API secret handling

- Store connector and API secrets in the platform's approved secret mechanism.
- Give each integration a distinct, least-privilege credential.
- Rotate credentials on a defined schedule and after suspected exposure.
- Do not pass source credentials through client requests or browser bundles.
- Do not log authorization headers, tokens, full sensitive responses, or secret-bearing URLs.
- Set outbound timeouts, response-size limits, and allowlists where practical.
- Disable or remove unused connectors.

Paid or hosted integrations must remain optional and follow the same boundary.

## Safe external content and URLs

Threat intelligence text, labels, report content, and URLs are untrusted input.

- Render text as text. Do not execute source-provided HTML or scripts.
- Sanitize any explicitly supported rich content with a reviewed policy.
- Accept only expected URL schemes, normally HTTPS and approved HTTP exceptions.
- Reject script, data, file, and other unsafe schemes.
- Prevent source URLs from becoming server-side request targets without strict validation and network controls.
- Mark external navigation clearly and use safe browser relationship attributes where applicable.
- Do not embed third-party pages by default.
- Avoid copying report content beyond its license and display rights.

## Application and deployment controls

Planned controls include secure HTTP headers, content security policy, server-side validation, safe error responses, dependency scanning, non-root containers where practical, network segmentation, health checks, and least-privilege CI permissions.

Public deployments should expose only intended read-only routes. Administrative controls, diagnostics, source configuration, and detailed errors must not be available from the public interface.

## Dependency hygiene

- Prefer platform capabilities and existing dependencies before adding packages.
- Review package maintenance, license, transitive risk, and browser impact.
- Commit and enforce the selected lockfile after application initialization.
- Keep dependencies current through small reviewed updates.
- Run planned vulnerability and license checks in CI without treating scanner output as the only review.
- Pin GitHub Actions to reviewed versions and keep workflow permissions minimal.
- Remove unused dependencies and integrations.

## Security review triggers

Require focused security review when a change introduces or alters:

- OpenCTI queries, adapters, markings, or credentials;
- external URL fetching or rich content rendering;
- approved versus internal data boundaries;
- authentication, authorization, or administrative routes;
- logging, analytics, telemetry, exports, or persistence;
- container privileges, network paths, or deployment secrets;
- a new external service or connector.

## Reporting process

A private vulnerability reporting channel and response owner will be documented before public deployment. Until then, do not place sensitive vulnerability details in a public issue. Contact the repository owner through an established private channel and include the affected component, impact, reproduction conditions, and any known exposure without including live credentials or restricted data.

This section must be updated with a verified contact method and response expectations before a public release.
