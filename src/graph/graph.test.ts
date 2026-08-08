// verifies graph transformation and focus behavior against normalized repository data.

import cytoscape from "cytoscape";
import { describe, expect, it } from "vitest";
import { mockThreatRepository } from "../data/mock/repository";
import { applyGraphSelection, toGraphElements } from "./graph";

const actorId = "development:threat-actor:atlas";

/** Return all normalized graph data from the development repository. */
async function getGraphData() {
  const [entities, relationships] = await Promise.all([
    mockThreatRepository.getEntities(),
    mockThreatRepository.getRelationships(),
  ]);

  return { entities, relationships };
}

describe("toGraphElements", () => {
  it("transforms entities into category-aware graph nodes", async () => {
    const { entities, relationships } = await getGraphData();
    const elements = toGraphElements(entities, relationships);
    const actorNode = elements.find(
      ({ group, data }) => group === "nodes" && data.id === actorId,
    );

    expect(actorNode).toEqual({
      group: "nodes",
      data: {
        id: actorId,
        label: "Development Actor Atlas",
        entityType: "threat-actor",
      },
    });
    expect(elements.filter(({ group }) => group === "nodes")).toHaveLength(10);
    expect(toGraphElements(entities, relationships)).toEqual(elements);
  });

  it("transforms relationships into typed graph edges", async () => {
    const { entities, relationships } = await getGraphData();
    const elements = toGraphElements(entities, relationships);
    const relationshipId = "development:relationship:actor-uses-technique";
    const relationshipEdge = elements.find(
      ({ group, data }) => group === "edges" && data.id === relationshipId,
    );

    expect(relationshipEdge).toEqual({
      group: "edges",
      data: {
        id: relationshipId,
        source: actorId,
        target: "development:attack-technique:cascade",
        label: "uses",
        relationshipType: "uses",
      },
    });
    expect(elements.filter(({ group }) => group === "edges")).toHaveLength(11);
  });
});

describe("applyGraphSelection", () => {
  it("focuses a selected node neighborhood and clears the focus", async () => {
    const { entities, relationships } = await getGraphData();
    const graph = cytoscape({
      elements: [...toGraphElements(entities, relationships)],
      headless: true,
    });
    const connectedNode = graph.getElementById(
      "development:attack-technique:cascade",
    );
    const connectedEdge = graph.getElementById(
      "development:relationship:actor-uses-technique",
    );
    const unrelatedNode = graph.getElementById("development:location:west");

    applyGraphSelection(graph, actorId);

    expect(graph.getElementById(actorId).hasClass("is-selected")).toBe(true);
    expect(connectedNode.hasClass("is-connected")).toBe(true);
    expect(connectedEdge.hasClass("is-connected")).toBe(true);
    expect(unrelatedNode.hasClass("is-muted")).toBe(true);

    applyGraphSelection(graph);

    expect(
      graph.elements(".is-selected, .is-connected, .is-muted"),
    ).toHaveLength(0);
    graph.destroy();
  });
});
