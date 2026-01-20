"use client";
import { gsap } from "gsap";
import { useRouter, usePathname } from "next/navigation";


export const useViewTransition = () => {
  const router = useRouter();
  const pathname = usePathname();

  function createSVGOverlay() {
    let overlay = document.querySelector(".page-transition-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100vh"; // Changed to 100vh for safety
      overlay.style.zIndex = "9999";
      overlay.style.pointerEvents = "none";

      overlay.innerHTML = `
        <svg class="shape-overlays" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trans-gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#70FF4D" />
              <stop offset="100%" stop-color="#2a2a2a" />
            </linearGradient>
            <linearGradient id="trans-gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#2a2a2a" />
              <stop offset="100%" stop-color="#70FF4D" />
            </linearGradient>
          </defs>
          <path class="overlay__path" fill="url(#trans-gradient2)"></path>
          <path class="overlay__path" fill="url(#trans-gradient1)"></path>
        </svg>
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function slideInOut(href, onRouteChange) {
    // Lock scrollbar during transition
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = createSVGOverlay();
    const paths = overlay.querySelectorAll(".overlay__path");

    if (!paths.length) {
      document.body.style.overflow = originalOverflow;
      return;
    }

    // Animation Config
    const numPoints = 10;
    const numPaths = paths.length;
    const delayPointsMax = 0.3;
    const delayPerPath = 0.15;

    // Initialize points logic
    const allPoints = [];
    // We need separate objects for "Enter" and "Exit" or reuse?
    // We can reuse the objects.
    // Start at 0 (Top).
    for (let i = 0; i < numPaths; i++) {
      const points = [];
      allPoints.push(points);
      for (let j = 0; j < numPoints; j++) {
        points.push(0);
      }
    }

    const render = () => {
      for (let i = 0; i < numPaths; i++) {
        const path = paths[i];
        const points = allPoints[i];

        // Anchor at Top (V 0 H 0)
        let d = `M 0 ${points[0]} C`;

        for (let j = 0; j < numPoints - 1; j++) {
          const p = ((j + 1) / (numPoints - 1)) * 100;
          const cp = p - ((1 / (numPoints - 1)) * 100) / 2;
          d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
        }

        d += ` V 0 H 0 Z`; // Top Anchor
        path.setAttribute("d", d);
      }
    };

    // Random delays for organic feel
    const pointsDelay = [];
    for (let i = 0; i < numPoints; i++) {
      pointsDelay[i] = Math.random() * delayPointsMax;
    }


    const timeline = gsap.timeline({
      onUpdate: render,
      onComplete: () => {
        document.body.style.overflow = originalOverflow;
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }
    });

    // PHASE 1: MELT DOWN (Cover Screen)
    // Points 0 -> 100 (Top to Bottom)
    // Anchor is V 0 H 0 (Top), so increasing y extends the shape downwards.

    // We calculate the max time this phase takes to insert the route change correctly.
    let maxCoverTime = 0;

    for (let i = 0; i < numPaths; i++) {
      const points = allPoints[i];
      const pathDelay = delayPerPath * (numPaths - i - 1);

      for (let j = 0; j < numPoints; j++) {
        const delay = pointsDelay[j];
        const startTime = delay + pathDelay;
        const duration = 0.8;

        timeline.to(points, {
          [j]: 100,
          duration: duration,
          ease: "power2.in",
        }, startTime);

        if (startTime + duration > maxCoverTime) {
          maxCoverTime = startTime + duration;
        }
      }
    }

    // Route Change Logic
    // Trigger slightly before full cover ensures no gap, but "power2.in" is fast at end.
    // Safe to trigger exactly at completion or slightly before.
    timeline.call(() => {
      router.push(href);
      if (onRouteChange) onRouteChange();
    }, null, maxCoverTime - 0.1);

    // PHASE 2: MELT UP (Reveal New Page)
    // Points 100 -> 0 (Bottom to Top)
    // Retracts the shape upwards.
    // We add a label to sync the start of the reveal.
    timeline.addLabel("reveal", maxCoverTime + 0.1); // Small buffer for route change to process

    for (let i = 0; i < numPaths; i++) {
      const points = allPoints[i];
      const pathDelay = delayPerPath * (numPaths - i - 1); // Same delay order

      for (let j = 0; j < numPoints; j++) {
        const delay = pointsDelay[j];
        // We can use "power3.out" for a smooth lift-off
        timeline.to(points, {
          [j]: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "reveal+=" + (delay + pathDelay));
      }
    }

  }

  const navigateWithTransition = (href, onRouteChange, options = {}) => {
    // Normalize paths to ignore trailing slashes
    const currentPath = pathname.replace(/\/$/, "") || "/";
    const targetPath = href.replace(/\/$/, "") || "/";

    if (currentPath === targetPath) {
      return;
    }

    slideInOut(href, onRouteChange);
  };

  return { navigateWithTransition, router };
};
