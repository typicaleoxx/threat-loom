// provides clearly synthetic normalized records for development and tests.

import type {
  AttackTechnique,
  Campaign,
  Industry,
  Infrastructure,
  Location,
  Malware,
  Relationship,
  Report,
  SourceReference,
  ThreatActor,
  Tool,
} from "../../domain/models";

const developmentSource = {
  sourceName: "Threat Loom Development Dataset",
  sourceId: "development-dataset:v1",
  marking: "development-only",
} as const satisfies SourceReference;

/** Small normalized dataset containing no factual threat intelligence. */
export const mockThreatDataset = {
  threatActors: [
    {
      id: "development:threat-actor:atlas",
      type: "threat-actor",
      name: "Development Actor Atlas",
      description:
        "Synthetic threat actor created only to exercise Threat Loom development relationships.",
      aliases: ["DEV Atlas"],
      sourceRefs: [developmentSource],
      actorKind: "development-fixture",
    },
  ] satisfies readonly ThreatActor[],
  industries: [
    {
      id: "development:industry:aurora",
      type: "industry",
      name: "Development Industry Aurora",
      description:
        "Synthetic industry used only for development targeting relationships.",
      sectorCode: "DEV-AURORA",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:industry:beacon",
      type: "industry",
      name: "Development Industry Beacon",
      description:
        "Synthetic industry used only for development campaign relationships.",
      sectorCode: "DEV-BEACON",
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Industry[],
  attackTechniques: [
    {
      id: "development:attack-technique:cascade",
      type: "attack-technique",
      name: "Development Technique Cascade",
      description:
        "Synthetic technique that is not a MITRE ATT&CK intelligence claim.",
      externalId: "DEV-T0001",
      isSubTechnique: false,
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly AttackTechnique[],
  campaigns: [
    {
      id: "development:campaign:northstar",
      type: "campaign",
      name: "Development Campaign Northstar",
      description:
        "Synthetic campaign created only to connect the development dataset.",
      objective: "Exercise normalized campaign relationships in development.",
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Campaign[],
  malware: [
    {
      id: "development:malware:ember",
      type: "malware",
      name: "Development Malware Ember",
      description:
        "Synthetic malware label with no connection to real software or activity.",
      malwareTypes: ["remote-access"],
      isFamily: true,
      platforms: ["development-platform"],
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Malware[],
  tools: [
    {
      id: "development:tool:relay",
      type: "tool",
      name: "Development Tool Relay",
      description:
        "Synthetic dual-use tool label created only for development scenarios.",
      toolTypes: ["remote-administration"],
      platforms: ["development-platform"],
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Tool[],
  infrastructure: [
    {
      id: "development:infrastructure:harbor",
      type: "infrastructure",
      name: "Development Infrastructure Harbor",
      description:
        "Synthetic infrastructure with no real domain, address, or operational indicator.",
      infrastructureTypes: ["relay"],
      status: "development-only",
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Infrastructure[],
  locations: [
    {
      id: "development:location:west",
      type: "location",
      name: "Development Region West",
      description:
        "Synthetic geographic context that does not identify a real location.",
      locationType: "development-region",
      region: "Development Region West",
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Location[],
  reports: [
    {
      id: "development:report:overview",
      type: "report",
      name: "Development Dataset Overview",
      description:
        "Synthetic report record that documents only this development scenario.",
      publisher: "Threat Loom Development Dataset",
      url: "https://example.invalid/threat-loom/development-report",
      reportTypes: ["development-fixture"],
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Report[],
  relationships: [
    {
      id: "development:relationship:actor-uses-technique",
      sourceId: "development:threat-actor:atlas",
      targetId: "development:attack-technique:cascade",
      type: "uses",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:actor-uses-malware",
      sourceId: "development:threat-actor:atlas",
      targetId: "development:malware:ember",
      type: "uses",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:actor-uses-tool",
      sourceId: "development:threat-actor:atlas",
      targetId: "development:tool:relay",
      type: "uses",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:actor-targets-industry",
      sourceId: "development:threat-actor:atlas",
      targetId: "development:industry:aurora",
      type: "targets",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:actor-associated-campaign",
      sourceId: "development:threat-actor:atlas",
      targetId: "development:campaign:northstar",
      type: "associated-with",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:campaign-targets-industry",
      sourceId: "development:campaign:northstar",
      targetId: "development:industry:beacon",
      type: "targets",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:campaign-uses-technique",
      sourceId: "development:campaign:northstar",
      targetId: "development:attack-technique:cascade",
      type: "uses",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:campaign-associated-infrastructure",
      sourceId: "development:campaign:northstar",
      targetId: "development:infrastructure:harbor",
      type: "associated-with",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:report-describes-actor",
      sourceId: "development:report:overview",
      targetId: "development:threat-actor:atlas",
      type: "describes",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:report-describes-campaign",
      sourceId: "development:report:overview",
      targetId: "development:campaign:northstar",
      type: "describes",
      sourceRefs: [developmentSource],
    },
    {
      id: "development:relationship:infrastructure-located-at-region",
      sourceId: "development:infrastructure:harbor",
      targetId: "development:location:west",
      type: "located-at",
      sourceRefs: [developmentSource],
    },
  ] satisfies readonly Relationship[],
} as const;
