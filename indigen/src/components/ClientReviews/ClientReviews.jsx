"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clientReviewsData } from "./clientReviewsData";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./ClientReviews.css";

gsap.registerPlugin(useGSAP);

const ClientReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const quoteRef = useRef(null);
  const textRef = useRef(null);
  const detailsRef = useRef(null);
  const isAnimating = useRef(false);

  const handleNext = () => {
    if (isAnimating.current) return;
    changeSlide((activeIndex + 1) % clientReviewsData.length);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    changeSlide((activeIndex - 1 + clientReviewsData.length) % clientReviewsData.length);
  };

  const changeSlide = (nextIndex) => {
    isAnimating.current = true;

    // Timeline for transition
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        isAnimating.current = false;
      }
    });

    // ANIMATION OUT
    // Text flies up and fades
    tl.to([quoteRef.current, textRef.current, detailsRef.current], {
      y: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    });
  };

  // ANIMATION IN (Run whenever activeIndex changes)
  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset position for entry
    tl.set([quoteRef.current, textRef.current, detailsRef.current], {
      y: 50,
      opacity: 0
    });

    // Text floats up
    tl.to([quoteRef.current, textRef.current, detailsRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.1
    });

  }, { dependencies: [activeIndex], scope: containerRef });

  const activeItem = clientReviewsData[activeIndex];

  return (
    <section className="testimonials-section" ref={containerRef}>
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Voices</h2>
          <p className="testimonials-subtitle">Stories of impact and collaboration.</p>
        </div>

        <div className="testimonial-display">
          {/* Background Decor */}
          <div className="testimonial-bg-glow"></div>

          <div className="testimonial-content">
            <div className="testimonial-glass-panel">
              {/* Giant Watermark Quote */}
              <div className="quote-watermark" ref={quoteRef}>“</div>

              <h3 className="testimonial-text" ref={textRef}>
                "{activeItem.review}"
              </h3>

              <div className="testimonial-details" ref={detailsRef}>
                <div className="client-info">
                  <p className="client-name">{activeItem.clientName}</p>
                  <p className="client-role">{activeItem.clientCompany}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons placed nicely around */}
          <div className="testimonial-nav">
            <button onClick={handlePrev} className="nav-btn prev" aria-label="Previous">
              <FaArrowLeft />
            </button>

            {/* Progress Indicators */}
            <div className="nav-dots">
              {clientReviewsData.map((_, idx) => (
                <span
                  key={idx}
                  className={`nav-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => !isAnimating.current && changeSlide(idx)}
                />
              ))}
            </div>

            <button onClick={handleNext} className="nav-btn next" aria-label="Next">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
