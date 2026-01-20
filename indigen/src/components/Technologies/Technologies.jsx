"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Copy/Copy";
import "./Technologies.css";
import {
    FaReact,
    FaAngular,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaPython,
    FaShopify,
    FaNodeJs
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiTypescript,
    SiOpenai,
    SiFlutter,
    SiMongodb,
    SiPostgresql,
    SiTailwindcss,
    SiGraphql
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const techData = [
    { name: "React", icon: FaReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Angular", icon: FaAngular },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Python", icon: FaPython },
    { name: "OpenAI", icon: SiOpenai },
    { name: "Shopify", icon: FaShopify },
    { name: "Flutter", icon: SiFlutter },
    { name: "HTML5", icon: FaHtml5 },
    { name: "CSS3", icon: FaCss3Alt },
    { name: "JavaScript", icon: FaJs },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "GraphQL", icon: SiGraphql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
];

const Technologies = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);

    useGSAP(() => {
        // Fade in the whole section
        gsap.fromTo(wrapperRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: sectionRef });

    // Double the data for seamless loop
    const marqueeData = [...techData, ...techData, ...techData];

    return (
        <section className="tech-section" ref={sectionRef}>
            <div className="container-fluid"> {/* Full width for marquee */}
                <div className="tech-header">
                    <Copy animateOnScroll={true} delay={0.2}>
                        <h2 className="tech-title">Technologies</h2>
                    </Copy>
                    <Copy animateOnScroll={true} delay={0.3}>
                        <p className="tech-desc">
                            Powering your solutions with a cutting-edge stack.
                        </p>
                    </Copy>
                </div>

                <div className="tech-marquee-wrapper" ref={wrapperRef}>
                    <div className="tech-marquee">
                        {marqueeData.map((tech, index) => (
                            <div className="tech-item" key={index}>
                                <tech.icon className="tech-icon" />
                                <span className="tech-label">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Technologies;
