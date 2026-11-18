import { Fragment } from "react";
import type { Project } from "@/content/projects";
import type { Lang } from "@/lib/i18n";

/** Schéma en couches : chaque couche est une rangée de blocs, reliée à la suivante par un flux nommé. */
export function Diagram({ arch, lang }: { arch: Project["architecture"]; lang: Lang }) {
  return (
    <figure className="diagram">
      <div className="layers">
        {arch.layers.map((layer, i) => (
          <Fragment key={i}>
            <div className="layer">
              <span className="layer-label">{layer.label[lang]}</span>
              <div className="nodes">
                {layer.nodes.map((n) => (
                  <div key={n.name} className="node">
                    <strong>{n.name}</strong>
                    <span>{n.detail[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
            {arch.flows[i] && (
              <div className="flow">
                <span>{arch.flows[i][lang]}</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <figcaption>{arch.caption[lang]}</figcaption>
    </figure>
  );
}
