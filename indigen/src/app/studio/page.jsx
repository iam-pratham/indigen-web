"use client";
import "./studio.css";
import TeamCards from "@/components/TeamCards/TeamCards";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/components/Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="studio-page">
      <div className="studio-copy">
        <div className="studio-col">
          <Copy delay={0.1}>
            <h1>We are Indigen</h1>
          </Copy>
        </div>

        <div className="studio-col">
          <div className="studio-content">
            <Copy animateOnScroll={true} delay={0.3}>
              <p className="lg">
                Indigen Services is a next-generation technology
                company specializing in Artificial Intelligence, SaaS platforms, automation
                systems, and full-stack development. Founded in 2019, we've quickly grown
                into a full-stack innovation partner for startups, enterprises, and
                government organizations.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0.5}>
              <p className="lg">
                Our core mission is simple: "Make businesses smarter, faster, and future-ready
                using AI + technology." We build intelligent digital products, scalable SaaS
                applications, advanced automation systems, and AI-powered business tools that
                reduce manual work, automate processes, and accelerate business growth.
              </p>
            </Copy>
          </div>
        </div>
      </div>

      <TeamCards />

      <Spotlight />

      <CTACard />

      <Footer />
    </div>
  );
};

export default Page;
