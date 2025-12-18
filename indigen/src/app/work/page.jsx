"use client";
import "./work.css";
import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(useGSAP);

const Page = () => {
  const { navigateWithTransition } = useViewTransition();
  const workPageContainer = useRef(null);

  const workItems = useMemo(
    () => [
      {
        index: "01",
        name: "Shabari Naturals Government Initiative",
        href: "/sample-project",
        variant: "variant-1",
        images: [
          "/work/work_1_1.png",
          "/work/work_1_2.png",
          "/work/work_1_3.png",
        ],
      },
      {
        index: "02",
        name: "BTwardrobe Clothing Store",
        href: "/sample-project",
        variant: "variant-2",
        images: [
          "/work/work_2_1.png",
          "/work/work_2_2.png",
          "/work/work_2_3.png",
        ],
      },
      {
        index: "03",
        name: "Volter Beauty Store",
        href: "/sample-project",
        variant: "variant-2",
        images: [
          "/work/work_3_1.png",
          "/work/work_3_2.png",
          "/work/work_3_3.png",
        ],
      },
      {
        index: "04",
        name: "Secret Girl Clothing Store",
        href: "/sample-project",
        variant: "variant-3",
        images: [
          "/work/work_4_1.png",
          "/work/work_4_2.png",
          "/work/work_4_3.png",
        ],
      },
      {
        index: "05",
        name: "Okist Cookies Store",
        href: "/sample-project",
        variant: "variant-1",
        images: [
          "/work/work_5_1.png",
          "/work/work_5_2.png",
          "/work/work_5_3.png",
        ],
      },
      {
        index: "06",
        name: "Tulips Skin Care Store",
        href: "/sample-project",
        variant: "variant-2",
        images: [
          "/work/work_6_1.png",
          "/work/work_6_2.png",
          "/work/work_6_3.png",
        ],
      },
    ],
    []
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(workPageContainer);
      const folderLinks = q("a");
      const folders = q(".folder");
      const folderWrappers = q(".folder-wrapper");

      let isMobile = window.innerWidth < 1000;

      const setInitialPositions = () => {
        gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
      };

      const mouseEnterHandlers = new Map();
      const mouseLeaveHandlers = new Map();

      folders.forEach((folder, index) => {
        const folderLink = folderLinks[index];
        const previewImages = folder.querySelectorAll(".folder-preview-img");

        const onEnter = () => {
          if (isMobile) return;

          folders.forEach((siblingFolder) => {
            if (siblingFolder !== folder) {
              siblingFolder.classList.add("disabled");
            }
          });

          gsap.to(folderWrappers[index], {
            y: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
          });

          previewImages.forEach((img, imgIndex) => {
            let rotation;
            if (imgIndex === 0) {
              rotation = gsap.utils.random(-20, -10);
            } else if (imgIndex === 1) {
              rotation = gsap.utils.random(-10, 10);
            } else {
              rotation = gsap.utils.random(10, 20);
            }

            gsap.to(img, {
              y: "-100%",
              rotation,
              duration: 0.25,
              ease: "back.out(1.7)",
              delay: imgIndex * 0.025,
            });
          });
        };

        const onLeave = () => {
          if (isMobile) return;

          folders.forEach((siblingFolder) => {
            siblingFolder.classList.remove("disabled");
          });

          gsap.to(folderWrappers[index], {
            y: 25,
            duration: 0.25,
            ease: "back.out(1.7)",
          });

          previewImages.forEach((img, imgIndex) => {
            gsap.to(img, {
              y: "0%",
              rotation: 0,
              duration: 0.25,
              ease: "back.out(1.7)",
              delay: imgIndex * 0.05,
            });
          });
        };

        if (folderLink) {
          mouseEnterHandlers.set(folderLink, onEnter);
          mouseLeaveHandlers.set(folderLink, onLeave);
          folderLink.addEventListener("mouseenter", onEnter);
          folderLink.addEventListener("mouseleave", onLeave);
        }
      });

      const handleResize = () => {
        const currentBreakpoint = window.innerWidth < 1000;
        if (currentBreakpoint !== isMobile) {
          isMobile = currentBreakpoint;
          setInitialPositions();

          folders.forEach((folder) => {
            folder.classList.remove("disabled");
          });
          const allPreviewImages = q(".folder-preview-img");
          gsap.set(allPreviewImages, { y: "0%", rotation: 0 });
        }
      };

      window.addEventListener("resize", handleResize);
      setInitialPositions();

      return () => {
        window.removeEventListener("resize", handleResize);
        folderLinks.forEach((link) => {
          const onEnter = mouseEnterHandlers.get(link);
          const onLeave = mouseLeaveHandlers.get(link);
          if (onEnter) link.removeEventListener("mouseenter", onEnter);
          if (onLeave) link.removeEventListener("mouseleave", onLeave);
        });
      };
    },
    { scope: workPageContainer }
  );

  return (
    <>
      <section className="folders" ref={workPageContainer}>
        {[0, 1, 2].map((rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {workItems.slice(rowIndex * 2, rowIndex * 2 + 2).map((item) => (
              <a
                key={item.index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(item.href);
                }}
              >
                <div className={`folder ${item.variant}`}>
                  <div className="folder-preview">
                    {item.images.map((src, i) => (
                      <div
                        className="folder-preview-img"
                        key={`${item.index}-img-${i}`}
                      >
                        <img src={src} alt={`Preview ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="folder-wrapper">
                    <div className="folder-index">
                      <p>{item.index}</p>
                    </div>
                    <div className="folder-name">
                      <h1>{item.name}</h1>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};

export default Page;
