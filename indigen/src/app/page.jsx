"use client";
import "./home.css";
import Button from "@/components/Button/Button";
import Stats from "@/components/Stats/Stats";

import Services from "@/components/Services/Services";
import Sectors from "@/components/Sectors/Sectors";
import Technologies from "@/components/Technologies/Technologies";
import ClientReviews from "@/components/ClientReviews/ClientReviews";

import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";

import SVGLineDraw from "@/components/SVGLineDraw/SVGLineDraw";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero .hero-header h1", {
      y: 50,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        ".hero .hero-footer p.lg",
        { y: 30, opacity: 0, duration: 0.6 },
        "-=0.4"
      )
      .from(
        ".hero .hero-footer .btn",
        { y: 20, opacity: 0, duration: 0.4 },
        "-=0.3"
      );
  }, []);

  return (
    <>
      <Preloader />
      <section className="hero">
        <div className="container">
          <div className="hero-content-main">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 1.9 : 0.5}>
                <h1>Make Businesses Smarter, Faster, and Future-Ready</h1>
              </Copy>
            </div>

            <SVGLineDraw />



            <div className="hero-footer-outer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 2.1 : 1.4}>
                <p className="sm">&copy; Indigen Services</p>
                <p className="sm">Nashik, Maharashtra</p>
              </Copy>
            </div>

            <div className="hero-footer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 2.0 : 0.8}>
                <p className="lg">
                  We build intelligent digital products, scalable SaaS applications,
                  advanced automation systems, and AI-powered business tools that
                  reduce manual work and accelerate growth.
                </p>
              </Copy>

              <Button delay={isInitialLoad ? 2.1 : 1.55} href="/studio">
                Visit shopify theme store
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      <Services />

      <Sectors />

      <Technologies />



      <ClientReviews />

      <CTACard />

      <Footer />
    </>
  );
};

export default Page;
