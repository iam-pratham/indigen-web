"use client";
import "./Preloader.css";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(useGSAP);

export let isInitialLoad = true;

const Preloader = () => {
  const overlayRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (showPreloader) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, showPreloader]);

  useGSAP(
    () => {
      if (!showPreloader) return;

      const overlay = overlayRef.current;
      const paths = overlay.querySelectorAll(".shape-overlays__path");

      const numPoints = 10;
      const numPaths = paths.length;
      const delayPointsMax = 0.3;
      const delayPerPath = 0.25;

      // Initialize points at 100 (Bottom of screen)
      const allPoints = [];
      for (let i = 0; i < numPaths; i++) {
        const points = [];
        allPoints.push(points);
        for (let j = 0; j < numPoints; j++) {
          points.push(100);
        }
      }

      const render = () => {
        for (let i = 0; i < numPaths; i++) {
          const path = paths[i];
          const points = allPoints[i];

          // Logic for melting UP:
          // Shape defines the "liquid" remaining.
          // Anchored at TOP (V 0 H 0).
          // Bottom edge defined by points.
          // As points go 100 -> 0, bottom edge lifts, revealing content from bottom? 
          // No, revealing content from bottom as it goes up.

          let d = `M 0 ${points[0]} C`;

          for (let j = 0; j < numPoints - 1; j++) {
            const p = ((j + 1) / (numPoints - 1)) * 100;
            const cp = p - ((1 / (numPoints - 1)) * 100) / 2;
            d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
          }

          d += ` V 0 H 0 Z`;
          path.setAttribute("d", d);
        }
      };

      const tl = gsap.timeline({
        onUpdate: render,
        defaults: {
          ease: "power2.inOut",
          duration: 0.9,
        },
        onComplete: () => setShowPreloader(false),
      });

      // Animate points
      const pointsDelay = [];
      for (let i = 0; i < numPoints; i++) {
        pointsDelay[i] = Math.random() * delayPointsMax;
      }

      for (let i = 0; i < numPaths; i++) {
        const points = allPoints[i];
        // Reverse order for paths (top layer melts first or last?)
        // Usually back layer (last index) reveals first? 
        // Let's standardise: 
        // i=0 is top path in SVG order? No, usually last in DOM is on top.
        // paths[0] is behind paths[1].
        // We want front layer to melt, revealing back layer, revealing site.
        // So paths[1] moves first? Or paths[0]?
        // If paths[1] moves first (drops), we see paths[0]. Then paths[0] drops.

        // Snippet logic: delayPerPath * (isOpened ? i : (numPaths - i - 1))
        // We want separate delays.
        // Let's make the front-most layer (last index) go first?
        // Actually, if we want a "wave", they usually go close together.
        // Let's stick to a simple sequence.

        const pathDelay = delayPerPath * (numPaths - i - 1);

        for (let j = 0; j < numPoints; j++) {
          const delay = pointsDelay[j];
          tl.to(
            points,
            {
              [j]: 0, // Animate to top
              duration: 1.2, // Slightly slower feel
              ease: "power2.out"
            },
            delay + pathDelay
          );
        }
      }
    },
    { scope: overlayRef, dependencies: [showPreloader] }
  );

  if (!showPreloader) return null;

  return (
    <div className="preloader-active" ref={overlayRef}>
      <svg
        className="shape-overlays"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#70FF4D" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#70FF4D" />
          </linearGradient>
        </defs>
        <path className="shape-overlays__path" fill="url(#gradient2)" d="M 0 100 L 100 100 V 0 H 0 Z"></path>
        <path className="shape-overlays__path" fill="url(#gradient1)" d="M 0 100 L 100 100 V 0 H 0 Z"></path>
      </svg>
    </div>
  );
};

export default Preloader;
