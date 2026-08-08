// renders the Threat Loom application shell and relationship graph.
import type { ReactElement } from "react";
import { mockThreatRepository } from "../data/mock/repository";
import { toGraphElements } from "../graph/graph";
import { ThreatGraph } from "../graph/threat-graph";

interface ExplorationSectionProps {
  readonly id: string;
  readonly title: string;
  readonly items: readonly {
    readonly id: string;
    readonly name: string;
  }[];
}

/**
 * Render one repository-backed exploration category.
 *
 * @param props - Exploration section content.
 * @param props.id - Stable section anchor.
 * @param props.title - Visible category label.
 * @param props.items - Normalized entities to list.
 * @returns An accessible category summary and entity list.
 */
function ExplorationSection({
  id,
  title,
  items,
}: ExplorationSectionProps): ReactElement {
  const countLabel = `${items.length} ${items.length === 1 ? "record" : "records"}`;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="exploration-section"
      id={id}
    >
      <div className="section-heading">
        <h3 id={`${id}-title`}>{title}</h3>
        <span>{countLabel}</span>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Render the repository-backed shell and relationship graph.
 *
 * @returns A promise resolving to the application shell and relationship graph.
 */
export default async function Home(): Promise<ReactElement> {
  const [threatActors, industries, attackTechniques, entities, relationships] =
    await Promise.all([
      mockThreatRepository.getThreatActors(),
      mockThreatRepository.getIndustries(),
      mockThreatRepository.getAttackTechniques(),
      mockThreatRepository.getEntities(),
      mockThreatRepository.getRelationships(),
    ]);
  const graphElements = toGraphElements(entities, relationships);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <h1>Threat Loom</h1>
          <p>Threat intelligence exploration</p>
        </div>
        <p className="data-status">
          <span aria-hidden="true" />
          Development data
        </p>
      </header>

      <main className="shell-content">
        <aside className="exploration-panel" aria-labelledby="explore-title">
          <div className="exploration-heading">
            <p className="eyebrow">Explore</p>
            <h2 id="explore-title">Intelligence index</h2>
            <p>Browse the normalized development records available now.</p>
          </div>
          <nav aria-label="Primary exploration">
            <a href="#threat-actors">Threat Actors</a>
            <a href="#industries">Industries</a>
            <a href="#attack-techniques">MITRE ATT&amp;CK Techniques</a>
          </nav>
          <div className="exploration-sections">
            <ExplorationSection
              id="threat-actors"
              items={threatActors}
              title="Threat Actors"
            />
            <ExplorationSection
              id="industries"
              items={industries}
              title="Industries"
            />
            <ExplorationSection
              id="attack-techniques"
              items={attackTechniques}
              title="MITRE ATT&CK Techniques"
            />
          </div>
        </aside>

        <section className="workspace" aria-labelledby="workspace-title">
          <div className="workspace-heading">
            <p className="eyebrow">Relationship view</p>
            <h2 id="workspace-title">Threat relationship graph</h2>
            <p>
              Explore normalized development entities and their supported
              connections. Select a node to focus its direct neighborhood.
            </p>
          </div>
          <ThreatGraph elements={graphElements} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Interactive graph foundation</p>
        <p>v0.3</p>
      </footer>
    </div>
  );
}
