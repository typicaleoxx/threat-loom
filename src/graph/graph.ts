// transforms normalized Threat Loom records and manages graph focus state.

import type cytoscape from "cytoscape";
import type { Relationship, ThreatEntity } from "../domain/models";

/** A Cytoscape element produced only inside the graph visualization layer. */
export type ThreatGraphElement =
  cytoscape.NodeDefinition | cytoscape.EdgeDefinition;

/**
 * Convert normalized entities and relationships into graph-ready elements.
 *
 * @param entities - Normalized entities supplied by a Threat Loom repository.
 * @param relationships - Normalized relationships supplied by the repository.
 * @returns Cytoscape definitions that preserve normalized identity and semantics.
 */
export function toGraphElements(
  entities: readonly ThreatEntity[],
  relationships: readonly Relationship[],
): readonly ThreatGraphElement[] {
  const nodes: readonly cytoscape.NodeDefinition[] = entities.map((entity) => ({
    group: "nodes",
    data: {
      id: entity.id,
      label: entity.name,
      entityType: entity.type,
    },
  }));

  const edges: readonly cytoscape.EdgeDefinition[] = relationships.map(
    (relationship) => ({
      group: "edges",
      data: {
        id: relationship.id,
        source: relationship.sourceId,
        target: relationship.targetId,
        label: relationship.type.replaceAll("-", " "),
        relationshipType: relationship.type,
      },
    }),
  );

  return [...nodes, ...edges];
}

/**
 * Apply graph focus classes for one selected node or clear the current focus.
 *
 * @param graph - Cytoscape instance owned by the graph component.
 * @param selectedNodeId - Stable entity ID to focus, or `undefined` to clear.
 * @returns Nothing. Element classes are updated in place.
 */
export function applyGraphSelection(
  graph: cytoscape.Core,
  selectedNodeId?: string,
): void {
  const elements = graph.elements();
  elements.removeClass("is-selected is-connected is-muted");

  if (selectedNodeId === undefined) {
    return;
  }

  const selectedNode = graph.getElementById(selectedNodeId);
  if (!selectedNode.isNode()) {
    return;
  }

  elements.addClass("is-muted");
  selectedNode
    .closedNeighborhood()
    .removeClass("is-muted")
    .addClass("is-connected");
  selectedNode.removeClass("is-connected").addClass("is-selected");
}
