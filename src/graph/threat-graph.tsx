// renders and controls the interactive Cytoscape relationship graph.

"use client";

import cytoscape from "cytoscape";
import type { ChangeEvent, ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { applyGraphSelection, type ThreatGraphElement } from "./graph";

interface ThreatGraphProps {
  readonly elements: readonly ThreatGraphElement[];
}

const graphStyle: cytoscape.StylesheetJson = [
  {
    selector: "node",
    style: {
      "background-color": "#8795a3",
      "border-color": "#11161c",
      "border-width": 2,
      color: "#f1f4f6",
      "font-family": "ui-sans-serif, system-ui, sans-serif",
      "font-size": 10,
      label: "data(label)",
      "min-zoomed-font-size": 8,
      "text-background-color": "#11161c",
      "text-background-opacity": 0.9,
      "text-background-padding": "3px",
      "text-margin-y": 8,
      "text-max-width": "92px",
      "text-valign": "bottom",
      "text-wrap": "wrap",
      height: 34,
      width: 34,
    },
  },
  {
    selector: 'node[entityType = "threat-actor"]',
    style: { "background-color": "#c77d89", shape: "diamond" },
  },
  {
    selector: 'node[entityType = "industry"]',
    style: { "background-color": "#d6a253", shape: "round-rectangle" },
  },
  {
    selector: 'node[entityType = "attack-technique"]',
    style: { "background-color": "#a78bce", shape: "hexagon" },
  },
  {
    selector: 'node[entityType = "campaign"]',
    style: { "background-color": "#d87e58", shape: "ellipse" },
  },
  {
    selector: 'node[entityType = "malware"]',
    style: { "background-color": "#d06773", shape: "triangle" },
  },
  {
    selector: 'node[entityType = "tool"]',
    style: { "background-color": "#7fa8c4", shape: "barrel" },
  },
  {
    selector: 'node[entityType = "infrastructure"]',
    style: { "background-color": "#7197aa", shape: "rectangle" },
  },
  {
    selector: 'node[entityType = "location"]',
    style: { "background-color": "#6fad8c", shape: "vee" },
  },
  {
    selector: 'node[entityType = "report"]',
    style: { "background-color": "#9c93bf", shape: "tag" },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      label: "data(label)",
      "font-family": "ui-sans-serif, system-ui, sans-serif",
      "font-size": 8,
      "line-color": "#53616e",
      opacity: 0.72,
      "target-arrow-color": "#53616e",
      "target-arrow-shape": "triangle",
      "text-background-color": "#11161c",
      "text-background-opacity": 0.88,
      "text-background-padding": "2px",
      "text-rotation": "autorotate",
      color: "#9da8b3",
      width: 1.5,
    },
  },
  {
    selector: 'edge[relationshipType = "uses"]',
    style: { "line-color": "#9f8ac3", "target-arrow-color": "#9f8ac3" },
  },
  {
    selector: 'edge[relationshipType = "targets"]',
    style: { "line-color": "#c28d62", "target-arrow-color": "#c28d62" },
  },
  {
    selector: 'edge[relationshipType = "describes"]',
    style: { "line-color": "#749f95", "target-arrow-color": "#749f95" },
  },
  {
    selector: 'edge[relationshipType = "located-at"]',
    style: { "line-color": "#668fa8", "target-arrow-color": "#668fa8" },
  },
  {
    selector: ".is-selected",
    style: {
      "border-color": "#f1f4f6",
      "border-width": 5,
      "overlay-color": "#86b8b1",
      "overlay-opacity": 0.12,
      "overlay-padding": 8,
      "z-index": 10,
    },
  },
  {
    selector: ".is-connected",
    style: { opacity: 1, "z-index": 5 },
  },
  {
    selector: ".is-muted",
    style: { opacity: 0.14, "text-opacity": 0 },
  },
];

/**
 * Render the repository-derived graph with fit and keyboard focus controls.
 *
 * @param props - Graph element definitions.
 * @param props.elements - Stable nodes and edges from the graph transformer.
 * @returns The interactive relationship graph.
 */
export function ThreatGraph({ elements }: ThreatGraphProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<cytoscape.Core | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const nodes = useMemo(
    () => elements.filter(({ group }) => group === "nodes"),
    [elements],
  );
  const edgeCount = elements.length - nodes.length;

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) {
      return;
    }

    const graph = cytoscape({
      boxSelectionEnabled: false,
      container,
      elements: [...elements],
      layout: {
        name: "breadthfirst",
        animate: false,
        directed: true,
        fit: true,
        padding: 48,
        spacingFactor: 1.15,
      },
      maxZoom: 2.5,
      minZoom: 0.35,
      style: graphStyle,
    });
    graphRef.current = graph;

    graph.on("tap", "node", (event) => {
      const nodeId = event.target.id();
      applyGraphSelection(graph, nodeId);
      setSelectedNodeId(nodeId);
    });
    graph.on("tap", (event) => {
      if (event.target === graph) {
        applyGraphSelection(graph);
        setSelectedNodeId("");
      }
    });

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(() => {
            graph.resize();
            graph.fit(undefined, 48);
          });
    resizeObserver?.observe(container);

    return () => {
      resizeObserver?.disconnect();
      graphRef.current = null;
      graph.destroy();
    };
  }, [elements]);

  /** Focus the selected entity from the keyboard-accessible control. */
  function handleFocusChange(event: ChangeEvent<HTMLSelectElement>): void {
    const nodeId = event.target.value;
    setSelectedNodeId(nodeId);
    const graph = graphRef.current;
    if (graph !== null) {
      applyGraphSelection(graph, nodeId || undefined);
    }
  }

  /** Fit every graph element into the current responsive viewport. */
  function fitGraph(): void {
    graphRef.current?.fit(undefined, 48);
  }

  return (
    <section aria-label="Threat relationship graph" className="graph-shell">
      <div className="graph-toolbar">
        <p>
          {nodes.length} entities, {edgeCount} relationships
        </p>
        <div className="graph-controls">
          <label htmlFor="graph-focus">Focus entity</label>
          <select
            id="graph-focus"
            onChange={handleFocusChange}
            value={selectedNodeId}
          >
            <option value="">No focused entity</option>
            {nodes.map(({ data }) => (
              <option key={data.id} value={data.id}>
                {String(data.label)}
              </option>
            ))}
          </select>
          <button onClick={fitGraph} type="button">
            Fit graph
          </button>
        </div>
      </div>
      <div
        aria-label="Interactive entity relationship canvas"
        className="graph-canvas"
        ref={containerRef}
        role="img"
      />
    </section>
  );
}
