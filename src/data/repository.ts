// defines the domain-facing data access contract used by Threat Loom features.

import type {
  AttackTechnique,
  Campaign,
  EntityId,
  Industry,
  Relationship,
  RelationshipType,
  ThreatActor,
  ThreatEntity,
} from "../domain/models";

/** Direction used when querying relationships around an entity. */
export type RelationshipDirection = "incoming" | "outgoing" | "both";

/** Optional domain-level constraints for relationship and neighbor queries. */
export interface RelationshipQuery {
  /** Endpoint direction to match. Defaults to `both`. */
  readonly direction?: RelationshipDirection;

  /** Exact normalized relationship type to match. */
  readonly type?: RelationshipType;
}

/** Async data-access boundary returning only normalized Threat Loom models. */
export interface ThreatRepository {
  /** Return every available threat actor. */
  getThreatActors(): Promise<readonly ThreatActor[]>;

  /** Return every available industry. */
  getIndustries(): Promise<readonly Industry[]>;

  /** Return every available attack technique. */
  getAttackTechniques(): Promise<readonly AttackTechnique[]>;

  /** Return every available campaign. */
  getCampaigns(): Promise<readonly Campaign[]>;

  /** Return an entity by stable ID, or `undefined` when it does not exist. */
  getEntityById(id: EntityId): Promise<ThreatEntity | undefined>;

  /** Return relationships touching an entity and matching optional constraints. */
  getRelationshipsForEntity(
    id: EntityId,
    query?: RelationshipQuery,
  ): Promise<readonly Relationship[]>;

  /** Return unique entities connected through matching relationships. */
  getRelatedEntities(
    id: EntityId,
    query?: RelationshipQuery,
  ): Promise<readonly ThreatEntity[]>;
}
