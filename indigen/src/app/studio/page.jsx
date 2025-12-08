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
      <section className="studio-header">
        <div className="container">
          <div className="studio-header-row">
            <Copy delay={0.8}>
              <h1>We are Indigen</h1>
            </Copy>
          </div>

          <div className="studio-header-row">
            <Copy delay={0.95}>
              <h1>We are Innovation</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="studio-copy">
        <div className="container">

          <Copy animateOnScroll={true}>
            <p className="lg">
              Indigen Services & AI SaaS Development is a next-generation technology 
              company specializing in Artificial Intelligence, SaaS platforms, automation 
              systems, and full-stack development. Founded in 2023, we've quickly grown 
              into a full-stack innovation partner for startups, enterprises, and 
              government organizations.
            </p>

            <p className="lg">
              Our core mission is simple: "Make businesses smarter, faster, and future-ready 
              using AI + technology." We build intelligent digital products, scalable SaaS 
              applications, advanced automation systems, and AI-powered business tools that 
              reduce manual work, automate processes, and accelerate business growth.
            </p>
          </Copy>
        </div>
      </section>

      <TeamCards />

      <Spotlight />

      <CTACard />

      <Footer />
    </div>
  );
};

export default Page;
