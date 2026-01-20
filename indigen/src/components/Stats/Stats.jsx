"use client";
import React, { useRef } from "react";
import "./Stats.css";
import Button from "../Button/Button";
import Copy from "../Copy/Copy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdWeb, MdSmartphone, MdTimer, MdPeople } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statsData = [
    {
        id: 1,
        number: 589,
        suffix: "+",
        title: "Website Projects",
        icon: MdWeb,
    },
    {
        id: 2,
        number: 129,
        suffix: "+",
        title: "Mobile Apps",
        icon: MdSmartphone,
    },
    {
        id: 3,
        number: 551,
        suffix: "+",
        title: "Happy Clients",
        icon: MdPeople,
    },
    {
        id: 4,
        number: 7,
        suffix: "+",
        title: "Years Experience",
        icon: MdTimer,
    },
];

const Stats = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(
        () => {
            // Animate Cards Stagger
            const cards = cardsRef.current;

            gsap.set(cards, { opacity: 0, y: 60 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            tl.to(cards, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Count Up Animation
            cards.forEach((card, index) => {
                const numberEl = card.querySelector(".stat-number-value");
                const targetValue = statsData[index].number;

                // Ensure starting from 0 by resetting innerText momentarily
                // or just letting GSAP handle the object property interpolation
                const counter = { val: 0 };

                gsap.to(counter, {
                    val: targetValue,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        once: true,
                    },
                    onUpdate: () => {
                        if (numberEl) {
                            numberEl.innerText = Math.round(counter.val);
                        }
                    },
                });
            });

            // Tilt Effect (Mouse Move)
            cards.forEach((card) => {
                if (!card) return;

                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const xPct = (x / rect.width - 0.5) * 20; // -10 to 10 deg
                    const yPct = (y / rect.height - 0.5) * 20;

                    gsap.to(card, {
                        rotationY: xPct,
                        rotationX: -yPct,
                        transformPerspective: 1000,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        rotationY: 0,
                        rotationX: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section className="stats-section" ref={containerRef}>
            <div className="container">
                <div className="stats-container">
                    {/* Left Content */}
                    <div className="stats-content">
                        <div className="stats-label-wrapper">
                            <span className="stats-label">NUMBERS SPEAK!</span>
                        </div>

                        <Copy>
                            <h2 className="stats-heading">Our Valuable Clients</h2>
                        </Copy>

                        <Button href="/contact" variant="light">
                            Start Your Project
                        </Button>
                    </div>

                    {/* Right Grid */}
                    <div className="stats-grid">
                        {statsData.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.id}
                                    className="stat-card"
                                    ref={(el) => (cardsRef.current[index] = el)}
                                >
                                    <div className="stat-icon-wrapper">
                                        <Icon />
                                    </div>
                                    <div className="stat-info">
                                        <div className="stat-number">
                                            <span className="stat-number-value">0</span>
                                            <span className="stat-suffix">{stat.suffix}</span>
                                        </div>
                                        <div className="stat-title">{stat.title}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
