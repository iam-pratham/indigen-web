"use client";
import "./contact.css";
import { useEffect, useRef } from "react";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";

const Page = () => {
  const screensaverRef = useRef(null);
  const animationIdRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existingScreensavers = container.querySelectorAll(".screensaver");
    existingScreensavers.forEach((el) => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    const config = {
      speed: 3,
      size: window.innerWidth < 1000 ? 150 : 300,
      changeDirectionDelay: 20,
      edgeOffset: -40,
    };

    const imagePaths = [
      "/objects/obj-0.webp",
      ...Array.from({ length: 9 }, (_, i) => `/objects/obj-${i + 2}.webp`),
    ];

    let screensaverElement = null;

    const preloadedImages = [];
    const preloadImages = () => {
      return new Promise((resolve) => {
        let loadedCount = 0;

        imagePaths.forEach((path) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            if (loadedCount === imagePaths.length) {
              resolve();
            }
          };
          img.onerror = () => {
            // Handle error or just proceed if one fails to avoid blocking
            loadedCount++;
            if (loadedCount === imagePaths.length) {
              resolve();
            }
          }
          img.src = path;
          preloadedImages.push(img);
        });
      });
    };

    const stopAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (screensaverElement && screensaverElement.parentNode) {
        screensaverElement.parentNode.removeChild(screensaverElement);
        screensaverElement = null;
      }

      if (screensaverRef.current && screensaverRef.current.parentNode) {
        screensaverRef.current.parentNode.removeChild(screensaverRef.current);
        screensaverRef.current = null;
      }

      const leftoverScreensavers =
        container?.querySelectorAll(".screensaver") || [];
      leftoverScreensavers.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };

    const startAnimation = async () => {
      stopAnimation();

      await preloadImages();

      stopAnimation();

      screensaverElement = document.createElement("div");
      screensaverElement.classList.add("screensaver");
      screensaverElement.setAttribute("data-timestamp", Date.now().toString());
      container.appendChild(screensaverElement);
      screensaverRef.current = screensaverElement;

      // Update size based on current width in case of resize
      const currentSize = window.innerWidth < 1000 ? 150 : 300;
      config.size = currentSize;

      const containerRect = container.getBoundingClientRect();
      let posX = containerRect.width / 2 - config.size / 2;
      let posY = containerRect.height / 2 - config.size / 2;

      let velX = (Math.random() > 0.5 ? 1 : -1) * config.speed;
      let velY = (Math.random() > 0.5 ? 1 : -1) * config.speed;

      let currentImageIndex = 0;

      screensaverElement.style.width = `${config.size}px`;
      screensaverElement.style.height = `${config.size}px`;
      screensaverElement.style.backgroundImage = `url(${imagePaths[currentImageIndex]})`;
      screensaverElement.style.left = `${posX}px`;
      screensaverElement.style.top = `${posY}px`;

      const changeImage = () => {
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
        screensaverElement.style.backgroundImage = `url(${imagePaths[currentImageIndex]})`;
      };

      let canChangeDirection = true;

      const animate = () => {
        if (
          !screensaverElement ||
          !screensaverElement.parentNode ||
          (container &&
            container.getElementsByClassName("screensaver").length > 1)
        ) {
          stopAnimation();
          return;
        }

        const containerRect = container.getBoundingClientRect();

        posX += velX;
        posY += velY;

        const leftEdge = config.edgeOffset;
        const rightEdge =
          containerRect.width - config.size + Math.abs(config.edgeOffset);
        const topEdge = config.edgeOffset;
        const bottomEdge =
          containerRect.height - config.size + Math.abs(config.edgeOffset);

        if (posX <= leftEdge || posX >= rightEdge) {
          if (canChangeDirection) {
            velX = -velX;
            changeImage();
            posX = posX <= leftEdge ? leftEdge : rightEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        if (posY <= topEdge || posY >= bottomEdge) {
          if (canChangeDirection) {
            velY = -velY;
            changeImage();
            posY = posY <= topEdge ? topEdge : bottomEdge;

            canChangeDirection = false;
            setTimeout(() => {
              canChangeDirection = true;
            }, config.changeDirectionDelay);
          }
        }

        screensaverElement.style.left = `${posX}px`;
        screensaverElement.style.top = `${posY}px`;

        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      // Restart animation on resize to recalculate bounds and size
      startAnimation();
    };

    window.addEventListener("resize", handleResize);

    startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="contact screensaver-container" ref={containerRef}>
      <div className="contact-copy">
        <div className="contact-col">
          <Copy delay={0.8}>
            <h2>Let's Build Something Great Together</h2>
          </Copy>
        </div>

        <div className="contact-col">
          <div className="contact-group">
            <Copy delay={0.8}>
              <p className="sm">Focus</p>
              <p>AI Development</p>
              <p>SaaS Engineering</p>
              <p>Automation Systems</p>
              <p>Full-Stack Solutions</p>
            </Copy>
          </div>

          <div className="contact-group">
            <Copy delay={1.2}>
              <p className="sm">Base</p>
              <p>Nashik, Maharashtra</p>
            </Copy>
          </div>

          <div className="contact-mail">
            <Button delay={1.3} href="/">
              support@indigenservices.com
            </Button>
          </div>

          <div className="contact-group">
            <Copy delay={1.4}>
              <p className="sm">Credits</p>
              <p>Indigen Services</p>
              <p>Founded 2019</p>
            </Copy>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <div className="container">
          <Copy delay={1.6} animateOnScroll={false}>
            <p className="sm">Built with Innovation</p>
          </Copy>

          <div className="contact-socials">
            <Copy delay={1.7} animateOnScroll={false}>
              <a
                className="sm"
                href="https://indigenservices.com"
                target="_blank"
              >
                Website
              </a>
            </Copy>

            <Copy delay={1.8} animateOnScroll={false}>
              <a
                className="sm"
                href="mailto:support@indigenservices.com"
                target="_blank"
              >
                Email
              </a>
            </Copy>

            <Copy delay={1.9} animateOnScroll={false}>
              <a
                className="sm"
                href="https://indigenservices.com"
                target="_blank"
              >
                LinkedIn
              </a>
            </Copy>
          </div>
          <Copy delay={2} animateOnScroll={false}>
            <p className="sm">&copy; Indigen Services</p>
          </Copy>
        </div>
      </div>
    </section>
  );
};

export default Page;
