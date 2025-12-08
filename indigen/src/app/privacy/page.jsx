"use client";
import "./privacy.css";
import { useEffect } from "react";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section className="privacy">
      <div className="privacy-copy">
        <div className="privacy-col">
          <Copy delay={0.8}>
            <h1>Privacy Policy</h1>
          </Copy>
        </div>

        <div className="privacy-col">
          <div className="privacy-content">
            <Copy animateOnScroll={true} delay={0}>
              <p className="sm">Last Updated: December 2025</p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>1. Introduction</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                Indigen Services & AI SaaS Development ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website, use our services, or interact with our AI-powered solutions, SaaS platforms, and 
                automation systems.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>2. Information We Collect</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We collect information that you provide directly to us, including but not limited to:
              </p>
            </Copy>
            <Copy animateOnScroll={true} delay={0.4}>
              <ul>
                <li>Name, email address, phone number, and company information</li>
                <li>Project requirements, business goals, and technical specifications</li>
                <li>Payment and billing information for our services</li>
                <li>Communication records, including emails, messages, and support tickets</li>
                <li>Usage data and analytics from our SaaS platforms and AI tools</li>
              </ul>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>3. How We Use Your Information</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We use the collected information to:
              </p>
            </Copy>
            <Copy animateOnScroll={true} delay={0.4}>
              <ul>
                <li>Provide, maintain, and improve our AI development, SaaS engineering, and automation services</li>
                <li>Process transactions and manage your account</li>
                <li>Communicate with you about projects, updates, and support</li>
                <li>Analyze usage patterns to enhance our products and services</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>4. Data Security</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We implement industry-standard security measures to protect your data, including encryption, secure 
                authentication, and regular security audits. Our AI systems and SaaS platforms are built with security 
                as a core principle, ensuring your business data remains confidential and protected.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>5. Data Sharing and Disclosure</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We do not sell your personal information. We may share your data only with:
              </p>
            </Copy>
            <Copy animateOnScroll={true} delay={0.4}>
              <ul>
                <li>Service providers who assist in delivering our services (under strict confidentiality agreements)</li>
                <li>Legal authorities when required by law or to protect our rights</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>6. Your Rights</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                You have the right to:
              </p>
            </Copy>
            <Copy animateOnScroll={true} delay={0.4}>
              <ul>
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Object to certain data processing activities</li>
              </ul>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>7. Cookies and Tracking Technologies</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze website traffic, and 
                improve our services. You can control cookie preferences through your browser settings.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>8. Third-Party Services</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                Our services may integrate with third-party platforms (e.g., payment processors, cloud providers, 
                analytics tools). These services have their own privacy policies, and we encourage you to review them.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>9. Data Retention</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We retain your information only for as long as necessary to fulfill the purposes outlined in this 
                policy, comply with legal obligations, or resolve disputes.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>10. Changes to This Policy</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </Copy>

            <Copy animateOnScroll={true} delay={0}>
              <h2>11. Contact Us</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> support@indigenservices.com<br />
                <strong>Location:</strong> Nashik, Maharashtra, India
              </p>
            </Copy>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Page;

