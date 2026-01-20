"use client";
import React, { useRef } from "react";
import "./SVGLineDraw.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// Note: DrawSVGPlugin is a Club GSAP plugin.
// If the user does not have it, we can fallback to standard stroke-dasharray animation using vanilla JS/GSAP.
// I will implement a "vanilla" DrawSVG logic using `strokeDasharray` and `strokeDashoffset` 
// to ensure it works in this public environment without requiring paid plugins.

import { isInitialLoad } from "../Preloader/Preloader";

// Register plugins if they exist, but we proceed with vanilla logic for safety
gsap.registerPlugin(useGSAP);

const SVGLineDraw = () => {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useGSAP(
        () => {
            const path = pathRef.current;
            if (!path) return;

            const length = path.getTotalLength();

            // Reset to invisible (0% drawn)
            // strokeDasharray: length length (dash is full length, gap is full length)
            // strokeDashoffset: length (means visible part is shifted away -> invisible)
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                autoAlpha: 0
            });

            const tl = gsap.timeline({
                repeat: -1,
                delay: isInitialLoad ? 3.5 : 1.5,
                defaults: { duration: 3, ease: "power1.inOut" },
            });

            // Reveal just before drawing starts
            tl.to(path, { autoAlpha: 1, duration: 0.01 });

            // Animate: 
            // 1. Draw In: offset goes from length -> 0 (Full line visible)
            // 2. Erase Out: offset goes from 0 -> -length (Full line moves away)

            // Wait, user provided snippet:
            // .from('path', { drawSVG:'0% 0%' }) -> start with segment 0 to 0 (invisible)
            // .to('path', { drawSVG:'100% 100%' }) -> end with segment 100 to 100 (invisible at end)
            // This creates a "worm" effect where the line travels along the path.

            // Vanilla equivalent for "Line traveling":
            // Start: offset = length, array = length
            // To: offset = 0 (Line fills up)
            // Then To: offset = -length (Line disappears from start to end? No, that shifts distinct dash)

            // Correct vanilla logic for DrawSVG "0% 0%" to "100% 100%" feel:
            // We actually need to manipulate strokeDashoffset to move a "gap" or segment?
            // No, drawSVG 0% 0% means start=0 end=0.
            // drawSVG 100% 100% means start=100 end=100.

            // Let's implement the visible "Stroke" traveling along the path.
            // Tweaking strokeDashoffset from `length` to `-length`.
            // At `length`: invisible (dash starts after end).
            // At `0`: visible (dash covers path).
            // At `-length`: invisible (dash has moved past).

            // BUT, to look like a small segment traveling? Or the whole line fills then un-fills?
            // The user's code `drawSVG:'100% 100%'` implies the start AND end of the dash move to the end.
            // So the line essentially "wipes" through.

            // Let's try the "Fill then Unfill" approach which is standard and elegant.
            // 1. Draw in (offset: length -> 0).
            // 2. Draw out (offset: 0 -> -length).

            tl.to(path, {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power1.inOut"
            })
                .to(path, {
                    strokeDashoffset: -length,
                    duration: 3,
                    ease: "power1.inOut"
                });

        },
        { scope: containerRef }
    );

    return (
        <div className="svg-stage-container" ref={containerRef}>
            <svg
                id="svg-stage"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-1 -1 103 103"
                fill="none"
                strokeWidth="2.2"
                style={{ opacity: 1, visibility: 'visible' }} // Handled by CSS/GSAP
            >
                <defs>
                    <linearGradient id="grad-green-stroke" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0.2" stopColor="#70FF4D" />
                        <stop offset="0.8" stopColor="#2a2a2a" />
                    </linearGradient>
                </defs>
                <path
                    ref={pathRef}
                    stroke="url(#grad-green-stroke)"
                    d="M50.5 50.5h50v50s-19.2 1.3-37.2-16.7S56 35.4 35.5 15.5C18.5-1 .5.5.5.5v50h50s25.6-.6 38-18 12-32 12-32h-50v100H.5S.2 80.7 11.8 68.2 40 49.7 50.5 50.5Z"
                />
            </svg>
        </div>
    );
};

export default SVGLineDraw;
