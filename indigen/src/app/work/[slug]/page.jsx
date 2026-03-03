"use client";
import React from "react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";
import "./project-details.css"; // We will create this next, based on sample-project.css

import { useParams } from "next/navigation";

const ProjectPage = () => {
    const { slug } = useParams();

    // Safety check just in case, though dynamic route usually ensures it. 
    // If slug is somehow undefined initially (loading state), project will be undefined, so handle that if needed or let notFound trigger.

    const project = projects.find((p) => p.slug === slug);
    const nextProject = project ? projects.find(p => p.slug === project.nextProject) : null;

    if (!project) {
        // If slug exists but doesn't match a project, show 404
        // However, useParams might return null/undefined during hydration/initial render in some edge cases? 
        // Usually safe in App Router client components.
        // Let's verify slug exists before calling notFound to avoid errors during hydration if slug is momentarily missing?
        // Actually, useParams is synchronous in Client Components in standard setup.
        if (slug) notFound();
        return null; // Return null if waiting for slug or if notFound triggered
    }

    const { navigateWithTransition } = useViewTransition();

    return (
        <div className="project-page">
            <section className="project-header">
                <Copy delay={0.75}>
                    <p className="lg">{project.category.join(" & ")}</p>
                    <h1>{project.name}</h1>
                </Copy>
            </section>

            <section className="project-banner-img">
                <div className="project-banner-img-wrapper">
                    <img src={project.headerImage} alt={project.name} />
                </div>
            </section>

            <section className="project-details">
                <Copy animateOnScroll={true}>
                    <div className="details">
                        <p>Concept</p>
                        <h3>{project.description}</h3>
                    </div>

                    <div className="details">
                        <p>Year</p>
                        <h3>{project.year}</h3>
                    </div>

                    <div className="details">
                        <p>Type</p>
                        <h3>{project.type}</h3>
                    </div>

                    <div className="details">
                        <p>Location</p>
                        <h3>{project.location}</h3>
                    </div>

                    <div className="details">
                        <p>Studio</p>
                        <h3>Indigen Services</h3>
                    </div>
                </Copy>
            </section>

            {/* RENDER EXTRA IMAGES IF AVAILABLE */}
            {project.images && project.images.length > 0 && (
                <section className="project-images">
                    <div className="project-images-container">
                        {project.images.map((img, i) => (
                            <div className="project-img" key={i}>
                                <div className="project-img-wrapper">
                                    <img src={img} alt={`${project.name} shot ${i + 1}`} loading="lazy" />
                                </div>
                            </div>
                        ))}

                        {/* Fallback to sample images if only 1 image (itself) is present, to make the page look full? 
                    User asked to "take reference of the projects and make project pages". 
                    Since we don't have real extra images, I will re-use the main image a few times or maybe just show the main one.
                    Actually, to make it look like the sample project, I should probably put some placeholders or just duplicate the main image for now 
                    so the layout isn't empty. 
                */}
                        <div className="project-img">
                            <div className="project-img-wrapper">
                                {/* Placeholder re-using same image for demo purposes as we lack assets */}
                                <img src={project.image} alt="Detail shot" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </section>
            )}



            {nextProject && (
                <section className="next-project">
                    <div className="next-project-content" onClick={() => navigateWithTransition(`/work/${nextProject.slug}`)} style={{ cursor: 'pointer' }}>
                        <Copy animateOnScroll={true}>
                            <p style={{ marginBottom: "1rem" }}>Next Project</p>
                            <h2>Next</h2>
                        </Copy>

                        <div className="next-project-img">
                            <div className="next-project-img-wrapper">
                                <img src={nextProject.image} alt={nextProject.name} loading="lazy" />
                            </div>
                        </div>

                        <Copy animateOnScroll={true}>
                            <h3>{nextProject.name}</h3>
                        </Copy>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default ProjectPage;
