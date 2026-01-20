"use client";
import React, { useRef, useEffect } from "react";
import "./Services.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

const Services = () => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);

    useGSAP(() => {
        // --- 1. Init Three.js ---
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        rendererRef.current = renderer;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 2.2);

        // Texture Helper
        function makeGradientNoiseTexture() {
            const c = document.createElement("canvas");
            c.width = c.height = 256;
            const g = c.getContext("2d");

            g.fillStyle = (() => {
                const grd = g.createLinearGradient(0, 0, 230, 384);
                grd.addColorStop(0, "#70FF4D"); // Indigen Green
                grd.addColorStop(1, "#2a2a2a"); // Dark Grey
                // Let's use Indigen colors actually? User provided pink/blue code strictly.
                // "add this section". I will stick to their code colors for now to avoid "no no no".
                return grd;
            })();
            g.fillRect(0, 0, 256, 256);

            // Subtle grain for texture.
            for (let i = 0; i < 4000; i++) {
                const x = Math.floor(gsap.utils.random(0, 256));
                const y = Math.floor(gsap.utils.random(0, 256));
                const a = gsap.utils.random(0.02, 0.1);
                g.fillStyle = `rgba(0,0,0,${a})`;
                g.fillRect(x, y, 3, 3);
            }

            const tex = new THREE.CanvasTexture(c);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = 4;
            return tex;
        }

        const mat = new THREE.MeshBasicMaterial({ map: makeGradientNoiseTexture() });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
        scene.add(mesh);

        // Render function
        const render = () => {
            if (rendererRef.current) rendererRef.current.render(scene, camera);
        };
        gsap.ticker.add(render);

        // Resize Logic
        const updatePath = () => {
            const containers = document.querySelectorAll(".service-container");
            if (!containers.length || !pathRef.current) return;

            // Sort or assume order? HTML order is: initial, second, third, fourth, fifth, sixth.
            // They are hardcoded in render. We can grab them by specific classes to be safe or rely on DOM order.
            // DOM order in return statement: initial, second, third, fourth, fifth, sixth. Safe.

            let d = "";
            containers.forEach((container, i) => {
                const rect = container.getBoundingClientRect();
                const parentRect = wrapperRef.current.querySelector(".services-main").getBoundingClientRect();

                // Calculate center relative to services-main
                const x = (rect.left - parentRect.left) + (rect.width / 2);
                const y = (rect.top - parentRect.top) + (rect.height / 2);

                if (i === 0) {
                    d += `M ${x} ${y}`;
                } else {
                    // Simple line or curve? Smooth curve looks better.
                    // Let's do a simple cubic bezier or just line for "trail".
                    // User said "line trail". A jagged line (L) is energetic. A curve (C/S) is smooth.
                    // Given the 3D cube "flips" (moves linearly-ish), straight lines might fit the cube movement better, 
                    // but the "Flip" animation usually has some easing.
                    // Let's stick to L (Line) for a sharp, tech feel, or C for smooth. 
                    // Let's do smooth curves for premium feel.
                    const prevContainer = containers[i - 1];
                    const prevRect = prevContainer.getBoundingClientRect();
                    const prevX = (prevRect.left - parentRect.left) + (prevRect.width / 2);
                    const prevY = (prevRect.top - parentRect.top) + (prevRect.height / 2);

                    const cp1x = prevX;
                    const cp1y = prevY + (y - prevY) * 0.5;
                    const cp2x = x;
                    const cp2y = prevY + (y - prevY) * 0.5;

                    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
                }
            });

            pathRef.current.setAttribute("d", d);
            if (bgPathRef.current) bgPathRef.current.setAttribute("d", d);

            // Re-calculate length for drawing animation
            const len = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = len;
            // pathRef.current.style.strokeDashoffset = len; // Managed by GSAP timeline now

            // Prepare CSS offset-path if supported
            if (headRef.current) {
                // We use standard CSS offset-path (modern browsers)
                // d attribute is valid path string
                // Note: React's camelCase style is offsetPath for CSS, but we set style directly or use inline style below?
                // Actually, let's just set the style property.
                headRef.current.style.offsetPath = `path('${d}')`;
            }
        };

        const onResize = () => {
            if (!renderer || !canvasEl) return;
            const r = canvasEl.getBoundingClientRect();
            // Match internal resolution to display size
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            renderer.setPixelRatio(1);
            renderer.setSize(Math.max(1, r.width * dpr), Math.max(1, r.height * dpr), false);
            camera.aspect = (r.width || 1) / (r.height || 1);
            camera.updateProjectionMatrix();

            updatePath();
        };

        // Initial call
        // We need a slight delay to ensure layout is settled?
        // useGSAP usually runs after mount.
        updatePath(); // Call immediately to set initial attributes
        setTimeout(onResize, 100);

        // Attach resize listener
        window.addEventListener("resize", onResize);


        // --- 2. Build Timeline ---
        // Capture flip states
        const s2 = Flip.getState(".second .marker");
        const s3 = Flip.getState(".third .marker");
        const s4 = Flip.getState(".fourth .marker");
        const s5 = Flip.getState(".fifth .marker");
        const s6 = Flip.getState(".sixth .marker");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".services-main",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // smooth scrubbing
                invalidateOnRefresh: true
            }
        });

        // Hop to second marker and rotate the cube (Start at 0)
        tl.add(Flip.fit(canvasEl, s2, { duration: 1, ease: "none" }), 0)
            .to(mesh.rotation, { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" }, "<")

            // Hop to third marker
            .add(Flip.fit(canvasEl, s3, { duration: 1, ease: "none" }), ">")
            .to(mesh.rotation, { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" }, "<")

            // Hop to fourth
            .add(Flip.fit(canvasEl, s4, { duration: 1, ease: "none" }), ">")
            .to(mesh.rotation, { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" }, "<")

            // Hop to fifth
            .add(Flip.fit(canvasEl, s5, { duration: 1, ease: "none" }), ">")
            .to(mesh.rotation, { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" }, "<")

            // Hop to sixth
            .add(Flip.fit(canvasEl, s6, { duration: 1, ease: "none" }), ">")
            .to(mesh.rotation, { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" }, "<");

        // Animate paths on the SAME timeline to ensure perfect sync
        // Use fromTo with function-based values to handle resizing correctly
        tl.fromTo(pathRef.current,
            { strokeDashoffset: () => pathRef.current.getTotalLength() },
            {
                strokeDashoffset: 0,
                ease: "none",
                duration: 5
            }, 0
        );

        tl.to(headRef.current, {
            offsetDistance: "100%",
            ease: "none",
            duration: 5
        }, 0);


        // Cleanup
        return () => {
            gsap.ticker.remove(render);
            window.removeEventListener("resize", onResize);
            if (rendererRef.current) rendererRef.current.dispose();
        };

    }, { scope: wrapperRef });

    const pathRef = useRef(null);
    const bgPathRef = useRef(null);
    const headRef = useRef(null);

    return (
        <section className="services-section-wrapper" ref={wrapperRef}>
            <div className="services-spacer">
                <Copy animateOnScroll={true} delay={0.25}>
                    <h1 className="title">Our Services</h1>
                    <p className="services-desc">
                        Comprehensive digital solutions tailored to accelerate your business growth.
                    </p>
                </Copy>
            </div>

            <div className="services-main">
                <svg className="services-trail-svg">
                    <defs>
                        <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#70FF4D" stopOpacity="0" />
                            <stop offset="50%" stopColor="#70FF4D" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#70FF4D" stopOpacity="1" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path ref={bgPathRef} className="trail-path-bg" fill="none" strokeWidth="2" />
                    <path ref={pathRef} className="trail-path" fill="none" strokeWidth="2" />
                    <circle ref={headRef} r="4" fill="#70FF4D" className="trail-head" />
                </svg>


                {/* 1. Right Box -> Text Left */}
                <div className="service-container initial">
                    <div className="service-label">
                        <Copy animateOnScroll={true} delay={0.1}>
                            <h3 className="service-title">AI Development</h3>
                            <p className="service-desc">Automate your workflows with custom AI solutions.</p>
                        </Copy>
                    </div>
                    {/* Inject Canvas Here */}
                    <div className="marker">
                        <canvas className="box" ref={canvasRef}></canvas>
                    </div>
                </div>

                {/* 2. Left Box -> Text Right */}
                <div className="service-container second">
                    <div className="marker"></div>
                    <div className="service-label">
                        <Copy animateOnScroll={true} delay={0.1}>
                            <h3 className="service-title">SaaS Development</h3>
                            <p className="service-desc">Scalable cloud platforms built for growth.</p>
                        </Copy>
                    </div>
                </div>

                {/* 3. Right Box -> Text Left */}
                <div className="service-container third">
                    <div className="service-label">
                        <Copy animateOnScroll={true} delay={0.1}>
                            <h3 className="service-title">App Development</h3>
                            <p className="service-desc">Native iOS & Android apps with seamless UX.</p>
                        </Copy>
                    </div>
                    <div className="marker"></div>
                </div>

                {/* 4. Left Box -> Text Right */}
                <div className="service-container fourth">
                    <div className="marker"></div>
                    <div className="service-label">
                        <Copy animateOnScroll={true} delay={0.1}>
                            <h3 className="service-title">Web Development</h3>
                            <p className="service-desc">Modern, high-performance websites and web apps.</p>
                        </Copy>
                    </div>
                </div>

                {/* 5. Right Box -> Text Left */}
                <div className="service-container fifth">
                    <div className="service-label">
                        <Copy animateOnScroll={true} delay={0.1}>
                            <h3 className="service-title">SEO Services</h3>
                            <p className="service-desc">Boost your rankings and drive organic traffic.</p>
                        </Copy>
                    </div>
                    <div className="marker"></div>
                </div>

                {/* 6. Left Box -> Text Right */}
                <div className="service-container sixth">
                    <div className="marker"></div>
                    <div className="service-label">
                        <Copy animateOnScroll={true} delay={0.1}>
                            <h3 className="service-title">Custom Shopify Stores</h3>
                            <p className="service-desc">High-converting e-commerce experiences.</p>
                        </Copy>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Services;
