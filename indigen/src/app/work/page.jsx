"use client";
import "./work.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewTransition } from "@/hooks/useViewTransition";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

import { projects } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WorkPage = () => {
  const containerRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();

  useGSAP(
    () => {
      // Project Items Animation
      const projects = gsap.utils.toArray(".project-item");
      projects.forEach((project) => {
        gsap.from(project, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="work-page" ref={containerRef}>
      <div className="work-container">
        <div className="work-copy">
          <div className="work-col">
            <Copy delay={0.1}>
              <h1>Selected Work</h1>
            </Copy>
          </div>

        </div>

        <ul className="project-list">
          {projects.map((project, index) => (
            <li key={index} className="project-item">
              <div className="project-info">
                <div className="project-index">
                  <span>{project.index} / {projects.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="project-title">
                  <h2>{project.name}</h2>
                </div>
                <div className="project-tags">
                  {project.category.map((cat, i) => (
                    <span key={i} className="project-tag">
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="project-button">
                  <Button
                    variant="light"
                    href={`/work/${project.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithTransition(`/work/${project.slug}`);
                    }}
                  >
                    View Project
                  </Button>
                </div>
              </div>

              <div
                className="project-image-container"
                onClick={() => navigateWithTransition(`/work/${project.slug}`)}
              >
                <div className="project-overlay"></div>
                <img
                  src={project.image}
                  alt={`${project.name} Preview`}
                  className="project-image"
                  loading="lazy"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkPage;
