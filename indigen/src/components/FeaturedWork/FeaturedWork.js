"use client";
import "./FeaturedWork.css";
import { useRef } from "react";
import { projects } from "./project.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FeaturedWork() {
  const featuredWorkContainerRef = useRef(null);

  useGSAP(
    () => {
      const createFeaturedWorkItem = (project) => {
        const featuredWorkItem = document.createElement("div");
        featuredWorkItem.className = "featured-work-item";
        const preloadValue = "metadata";
        featuredWorkItem.innerHTML = `
          <div class="featured-work-item-img">
           <div class="featured-work-item-copy">
            <h3>${project.name}</h3>
          </div>
            <video 
              src="${project.video}" 
              autoplay 
              loop 
              muted 
              playsInline
              preload="${preloadValue}"
              alt="${project.name}"
            ></video>
          </div>
      `;

        const video = featuredWorkItem.querySelector("video");
        if (video) {
          // Lazy load all videos when item enters viewport
          const videoObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const videoElement = entry.target;
                  videoElement.load();
                  videoObserver.unobserve(videoElement);
                }
              });
            },
            { rootMargin: "200px" }
          );
          videoObserver.observe(video);
        }

        return featuredWorkItem;
      };

      const workContainer = featuredWorkContainerRef.current;

      workContainer.innerHTML = "";

      for (let i = 0; i < projects.length; i += 2) {
        const row = document.createElement("div");
        row.className = "row";

        const leftItemIndex = i % projects.length;
        const rightItemIndex = (i + 1) % projects.length;
        row.appendChild(createFeaturedWorkItem(projects[leftItemIndex]));

        if (i + 1 < projects.length * 2) {
          row.appendChild(createFeaturedWorkItem(projects[rightItemIndex]));
        }

        workContainer.appendChild(row);
      }

      gsap.set(".featured-work-item", {
        y: 1000,
      });

      document.querySelectorAll(".row").forEach((row) => {
        const featuredWorkItems = row.querySelectorAll(".featured-work-item");

        featuredWorkItems.forEach((item, itemIndex) => {
          const isLeftProjectItem = itemIndex === 0;
          gsap.set(item, {
            rotation: isLeftProjectItem ? -60 : 60,
            transformOrigin: "center center",
          });
        });

        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          onEnter: () => {
            gsap.to(featuredWorkItems, {
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.25,
            });
          },
        });
      });

    },
    { scope: featuredWorkContainerRef }
  );

  return (
    <>
      <div className="featured-work-list" ref={featuredWorkContainerRef}></div>
    </>
  );
}
