"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "../Copy/Copy";
import "./Sectors.css";
import {
    MdLocalHospital,
    MdFlight,
    MdAttachMoney,
    MdShoppingCart,
    MdPrecisionManufacturing,
    MdSchool,
    MdAccountBalance,
    MdStore,
    MdLocalShipping
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const sectorsData = [
    { title: "Government", icon: MdAccountBalance },
    { title: "Travel & Hospitality", icon: MdFlight },
    { title: "E-commerce", icon: MdShoppingCart },
    { title: "Healthcare", icon: MdLocalHospital },
    { title: "Logistics", icon: MdLocalShipping },
    { title: "Finance & Banking", icon: MdAttachMoney },
    { title: "Manufacturing", icon: MdPrecisionManufacturing },
    { title: "Retail", icon: MdStore },
    { title: "Education", icon: MdSchool },
];

const Sectors = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".sector-card");

        // Staggered Fade In from bottom
        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, { scope: sectionRef });

    return (
        <section className="sectors-section" ref={sectionRef}>
            <div className="container">
                <div className="sectors-header">
                    <Copy animateOnScroll={true} delay={0.2}>
                        <h2 className="sectors-title">Sectors We Serve</h2>
                    </Copy>
                    <Copy animateOnScroll={true} delay={0.3}>
                        <p className="sectors-desc">
                            Delivering tailored digital solutions across diverse industries.
                        </p>
                    </Copy>
                </div>

                <div className="sectors-grid" ref={gridRef}>
                    {sectorsData.map((item, index) => (
                        <SectorCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const SectorCard = ({ item, index }) => {
    const cardRef = useRef(null);
    const Icon = item.icon;

    // Use GSAP hover context or just CSS? 
    // The CSS transition is quite complex (scale, rotate). 
    // Let's stick to pure CSS for performance and smoothness unless 3D tilt is absolutely required. 
    // User said "cards are not hitting". Pure, sharp CSS hover is often cleaner than JS tilt.
    // Let's REMOVE the JS Tilt to make it "cleaner" and less "gimmicky".
    // Rely on the CSS scale/color change.

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = (x / rect.width - 0.5) * 20; // -10 to 10 deg vertical tilt? Stats uses 20 spread?
        // Stats.jsx code:
        // const xPct = (x / rect.width - 0.5) * 20; 
        // const yPct = (y / rect.height - 0.5) * 20;
        // gsap.to(card ... rotationY: xPct, rotationX: -yPct ...

        const rotateY = (x / rect.width - 0.5) * 20;
        const rotateX = (y / rect.height - 0.5) * -20;

        gsap.to(cardRef.current, {
            rotationY: rotateY,
            rotationX: rotateX,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    return (
        <div
            className="sector-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Top: Icon (Left) & Index (Right) */}
            <div className="sector-top">
                <div className="sector-icon-display">
                    <Icon />
                </div>
                <span className="sector-index">{(index + 1).toString().padStart(2, '0')}</span>
            </div>

            {/* Bottom: Title */}
            <div className="sector-bottom">
                <h3 className="sector-name">{item.title}</h3>
                {/* Optional Arrow or detail? */}
            </div>
        </div>
    );
};

export default Sectors;
