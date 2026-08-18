'use client';

import type { JSX } from 'react';
import type { WorkItem } from './types';

/* ────────────────────────── Work ────────────────────────── */

interface WorkProps {
  work: WorkItem[];
  registerReveal: (el: HTMLElement | null) => void;
}

export function Work({ work, registerReveal }: WorkProps): JSX.Element {
  return (
    <section className="pf-section-ink" id="work" aria-label="Selected Developer Projects and Architecture">
      <div className="wrap">
        <div className="pf-section-head">
          <div>
            <span className="pf-section-eyebrow mono">Selected work</span>
            <h2 className="pf-section-title serif">Production builds & systems</h2>
          </div>
          <p className="pf-section-note">
            High-throughput backends, agentic AI pipelines, and distributed architectures.
          </p>
        </div>

        <div className="pf-work-grid" role="list">
          {work.map((w) => (
            <article
              className="pf-work-card"
              key={w.id}
              ref={registerReveal}
              role="listitem"
              itemScope
              itemType="https://schema.org/SoftwareSourceCode"
            >
              <div
                className="pf-work-thumb"
                style={{
                  background: w.gradient || 'linear-gradient(135deg, #182822, #5eead4 150%)',
                }}
              >
                {w.image ? (
                  <a
                    href={w.link || '#'}
                    target={w.link?.startsWith('http') ? '_blank' : undefined}
                    rel={w.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`View ${w.title} project`}
                  >
                    <img
                      src={w.image}
                      alt={`${w.title} — ${w.tags.join(', ')}`}
                      className="pf-work-img"
                      loading="lazy"
                      itemProp="image"
                    />
                  </a>
                ) : null}
                <span className="pf-work-thumb-label">{w.image ? 'Preview' : 'Case Study'}</span>
              </div>
              <div className="pf-work-info">
                <div className="pf-work-info-head">
                  <h3 itemProp="name">{w.title}</h3>
                  <span className="mono" itemProp="dateCreated">{w.year}</span>
                </div>
                <div className="pf-work-desc" itemProp="description">
                  {w.description.split('\n').map((line, idx) => (
                    <span key={idx} className="pf-work-desc-line">{line}</span>
                  ))}
                </div>
                <div className="pf-work-foot">
                  <div className="pf-work-tags" aria-label="Technologies used">
                    {w.tags.map((t) => (
                      <span key={t} className="mono" itemProp="programmingLanguage">
                        {t}
                      </span>
                    ))}
                  </div>
                  {w.link && (
                    <a
                      href={w.link}
                      className="pf-work-link mono"
                      target={w.link.startsWith('http') ? '_blank' : undefined}
                      rel={w.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      title={`View ${w.title} repository`}
                      itemProp="codeRepository"
                    >
                      View project →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

