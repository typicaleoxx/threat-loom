// exposes the synthetic dataset through the Threat Loom repository contract.

import type { EntityId, Relationship, ThreatEntity } from "../../domain/models";
import type { RelationshipQuery, ThreatRepository } from "../repository";
import { mockThreatDataset } from "./dataset";

// ponytail: linear scans keep this tiny fixture obvious; add indexes only when scale requires them.
const entities: readonly ThreatEntity[] = [
  ...mockThreatDataset.threatActors,
  ...mockThreatDataset.industries,
  ...mockThreatDataset.attackTechniques,
  ...mockThreatDataset.campaigns,
  ...mockThreatDataset.malware,
  ...mockThreatDataset.tools,
  ...mockThreatDataset.infrastructure,
  ...mockThreatDataset.locations,
  ...mockThreatDataset.reports,
];

/**
 * Return mock relationships matching an entity, direction, and optional type.
 *
 * @param entityId - Stable entity identifier at either relationship endpoint.
 * @param query - Optional direction and relationship-type constraints.
 * @returns Matching relationships in dataset order.
 */
function findRelationships(
  entityId: EntityId,
  query: RelationshipQuery = {},
): readonly Relationship[] {
  const direction = query.direction ?? "both";

  return mockThreatDataset.relationships.filter(
    ({ sourceId, targetId, type }) =>
      (query.type === undefined || type === query.type) &&
      ((direction === "both" &&
        (sourceId === entityId || targetId === entityId)) ||
        (direction === "outgoing" && sourceId === entityId) ||
        (direction === "incoming" && targetId === entityId)),
  );
}

/** Mock repository backed by normalized, development-only records. */
export const mockThreatRepository: ThreatRepository = {
  getThreatActors: () => Promise.resolve(mockThreatDataset.threatActors),
  getIndustries: () => Promise.resolve(mockThreatDataset.industries),
  getAttackTechniques: () =>
    Promise.resolve(mockThreatDataset.attackTechniques),
  getCampaigns: () => Promise.resolve(mockThreatDataset.campaigns),
  getEntityById: (id) =>
    Promise.resolve(entities.find((entity) => entity.id === id)),
  getRelationshipsForEntity: (id, query) =>
    Promise.resolve(findRelationships(id, query)),
  getRelatedEntities: (id, query) => {
    const relatedIds = new Set(
      findRelationships(id, query).map(({ sourceId, targetId }) =>
        sourceId === id ? targetId : sourceId,
      ),
    );

    return Promise.resolve(
      entities.filter((entity) => relatedIds.has(entity.id)),
    );
  },
};
