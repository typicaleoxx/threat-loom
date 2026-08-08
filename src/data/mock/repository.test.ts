// verifies domain-facing behavior of the synthetic data repository.

import { describe, expect, it } from "vitest";
import { mockThreatRepository } from "./repository";

const actorId = "development:threat-actor:atlas";

describe("mockThreatRepository", () => {
  it("returns every normalized entity", async () => {
    const entities = await mockThreatRepository.getEntities();

    expect(entities).toHaveLength(10);
    expect(entities.map(({ type }) => type)).toEqual(
      expect.arrayContaining([
        "threat-actor",
        "industry",
        "attack-technique",
        "campaign",
        "malware",
        "tool",
        "infrastructure",
        "location",
        "report",
      ]),
    );
  });

  it("returns every normalized relationship", async () => {
    const relationships = await mockThreatRepository.getRelationships();

    expect(relationships).toHaveLength(11);
    expect(relationships[0]).toMatchObject({
      id: "development:relationship:actor-uses-technique",
      sourceId: actorId,
      targetId: "development:attack-technique:cascade",
      type: "uses",
    });
  });

  it("finds an entity by stable ID", async () => {
    await expect(
      mockThreatRepository.getEntityById(actorId),
    ).resolves.toMatchObject({
      id: actorId,
      type: "threat-actor",
      name: "Development Actor Atlas",
    });
  });

  it("returns undefined for a missing entity", async () => {
    await expect(
      mockThreatRepository.getEntityById("development:missing"),
    ).resolves.toBeUndefined();
  });

  it("filters relationships by direction and type", async () => {
    const relationships = await mockThreatRepository.getRelationshipsForEntity(
      actorId,
      { direction: "outgoing", type: "uses" },
    );

    expect(relationships.map(({ id }) => id)).toEqual([
      "development:relationship:actor-uses-technique",
      "development:relationship:actor-uses-malware",
      "development:relationship:actor-uses-tool",
    ]);
  });

  it("resolves related entities", async () => {
    const entities = await mockThreatRepository.getRelatedEntities(actorId, {
      direction: "outgoing",
      type: "uses",
    });

    expect(entities.map(({ id }) => id)).toEqual([
      "development:attack-technique:cascade",
      "development:malware:ember",
      "development:tool:relay",
    ]);
  });

  it("returns each related entity once", async () => {
    const entities = await mockThreatRepository.getRelatedEntities(actorId);
    const ids = entities.map(({ id }) => id);
    const expectedIds = [
      "development:industry:aurora",
      "development:attack-technique:cascade",
      "development:campaign:northstar",
      "development:malware:ember",
      "development:tool:relay",
      "development:report:overview",
    ];

    expect(ids).toEqual(expect.arrayContaining(expectedIds));
    expect(ids).toHaveLength(expectedIds.length);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
