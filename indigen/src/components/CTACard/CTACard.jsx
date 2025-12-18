"use client";
import "./CTACard.css";
import Button from "../Button/Button";
import { MdArticle } from "react-icons/md";
import Copy from "../Copy/Copy";

const CTACard = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-copy">
          <div className="cta-col">
            <Copy animateOnScroll={true}>
              <p className="sm why-choose">Why Choose Indigen</p>
            </Copy>
          </div>

          <div className="cta-col">
            <Copy animateOnScroll={true}>
              <p className="lg">
                Indigen Services combines full-stack AI + SaaS engineering with business expertise. 
                We deliver 2–4x faster than traditional agencies, building scalable solutions 
                that grow with your business. From idea to deployment, we handle it all.
              </p>
            </Copy>

            <Button
              animateOnScroll={true}
              delay={0.25}
              variant="dark"
              href="/contact"
            >
              Explore Our Services
            </Button>
          </div>
        </div>

        <div className="cta-card">
          <div className="cta-card-copy">
            <div className="cta-card-col">
              <Copy animateOnScroll={true}>
                <h3>Our Approach</h3>
              </Copy>
            </div>

            <div className="cta-card-col">
              <Copy animateOnScroll={true}>
                <p>
                  We start by understanding your business challenges and goals. 
                  Then we design intelligent solutions using AI, automation, and modern 
                  full-stack development to reduce manual work and accelerate growth.
                </p>

                <p>
                  Every project is built with scalability in mind. We focus on clean code, 
                  performance optimization, and user experience that converts. From MVP 
                  to full-scale SaaS platforms, we deliver world-class technology.
                </p>
              </Copy>

              <Button
                animateOnScroll={true}
                delay={0.25}
                variant="light"
                icon={MdArticle}
                href="/studio"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTACard;
