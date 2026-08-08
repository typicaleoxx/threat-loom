// defines the source-neutral entities and relationships used inside Threat Loom.

/** Stable identifier for a normalized Threat Loom entity. */
export type EntityId = string;

/** Stable identifier for a normalized relationship. */
export type RelationshipId = string;

/** ISO 8601 timestamp supplied by an approved source. */
export type IsoTimestamp = string;

/** Discriminator for every normalized entity category. */
export type EntityType =
  | "threat-actor"
  | "industry"
  | "attack-technique"
  | "campaign"
  | "malware"
  | "tool"
  | "infrastructure"
  | "location"
  | "report";

/** Normalized semantics for explicit, directed relationships. */
export type RelationshipType =
  | "targets"
  | "uses"
  | "attributed-to"
  | "part-of"
  | "associated-with"
  | "describes"
  | "located-at";

/**
 * Identifies where normalized information originated.
 *
 * URLs and source-provided values remain untrusted until validated by an adapter.
 */
export interface SourceReference {
  readonly sourceName: string;
  readonly sourceId?: string;
  readonly url?: string;
  readonly publishedAt?: IsoTimestamp;
  readonly retrievedAt?: IsoTimestamp;
  readonly marking?: string;
  readonly license?: string;
}

/** Shared fields carried by every normalized entity. */
export interface EntityBase<TType extends EntityType> {
  readonly id: EntityId;
  readonly type: TType;
  readonly name: string;
  readonly description?: string;
  readonly aliases?: readonly string[];
  readonly sourceRefs: readonly SourceReference[];
  readonly createdAt?: IsoTimestamp;
  readonly updatedAt?: IsoTimestamp;
}

/** A named or tracked adversary described by approved sources. */
export interface ThreatActor extends EntityBase<"threat-actor"> {
  readonly actorKind?: string;
  readonly firstSeen?: IsoTimestamp;
  readonly lastSeen?: IsoTimestamp;
  readonly motivations?: readonly string[];
  readonly confidence?: number;
}

/** An economic or organizational sector used for targeting context. */
export interface Industry extends EntityBase<"industry"> {
  readonly sectorCode?: string;
  readonly parentIndustryId?: EntityId;
}

/** A MITRE ATT&CK technique or sub-technique. */
export interface AttackTechnique extends EntityBase<"attack-technique"> {
  readonly externalId: string;
  readonly isSubTechnique: boolean;
  readonly parentTechniqueId?: EntityId;
  readonly tactics?: readonly string[];
  readonly referenceUrl?: string;
}

/** A source-defined grouping of malicious activity. */
export interface Campaign extends EntityBase<"campaign"> {
  readonly firstSeen?: IsoTimestamp;
  readonly lastSeen?: IsoTimestamp;
  readonly objective?: string;
  readonly confidence?: number;
}

/** Malicious software associated with threat activity. */
export interface Malware extends EntityBase<"malware"> {
  readonly malwareTypes?: readonly string[];
  readonly isFamily?: boolean;
  readonly platforms?: readonly string[];
}

/** Legitimate or dual-use software used in threat activity. */
export interface Tool extends EntityBase<"tool"> {
  readonly toolTypes?: readonly string[];
  readonly platforms?: readonly string[];
  readonly referenceUrl?: string;
}

/** Infrastructure used to support campaigns or malicious activity. */
export interface Infrastructure extends EntityBase<"infrastructure"> {
  readonly infrastructureTypes?: readonly string[];
  readonly firstSeen?: IsoTimestamp;
  readonly lastSeen?: IsoTimestamp;
  readonly status?: string;
}

/** Source-supported geographic context for another entity. */
export interface Location extends EntityBase<"location"> {
  readonly locationType: string;
  readonly countryCode?: string;
  readonly region?: string;
}

/** A public or appropriately licensed intelligence publication. */
export interface Report extends EntityBase<"report"> {
  readonly publishedAt?: IsoTimestamp;
  readonly publisher?: string;
  readonly url?: string;
  readonly reportTypes?: readonly string[];
  readonly license?: string;
}

/** Any normalized entity available through a Threat Loom repository. */
export type ThreatEntity =
  | ThreatActor
  | Industry
  | AttackTechnique
  | Campaign
  | Malware
  | Tool
  | Infrastructure
  | Location
  | Report;

/** An explicit, directed, source-supported connection between two entities. */
export interface Relationship {
  readonly id: RelationshipId;
  readonly sourceId: EntityId;
  readonly targetId: EntityId;
  readonly type: RelationshipType;
  readonly description?: string;
  readonly firstSeen?: IsoTimestamp;
  readonly lastSeen?: IsoTimestamp;
  readonly confidence?: number;
  readonly sourceRefs: readonly SourceReference[];
}
