import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import GTA from "./image/bg.png";
import Girl from "./image/gtachar.png";
import Sky from "./image/sky.png";
import Logo from "./image/vi.webp";
import Playstation from "./image/ps5.png";
import Gtaimage from "./image/imag.png";
const App = () => {
  let [content, showContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to("#clipText", {
      rotate: 10,
      duration: 2,
      ease: "power2.easeInOut",
      transformOrigin: "50% 50%",
    }).to("#clipText", {
      scale: 60,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          showContent(true);
          this.kill();
        }
      },
    });
  });
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const humRef = useRef(null);
  useGSAP(() => {
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });
    if (!content) return;

    const main = mainRef.current;
    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .textgta", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".main .gtasky", {
        x: xMove,
      });
      gsap.to(".main .bggta", {
        x: xMove * 1.7,
      });
    };

    main.addEventListener("mousemove", handleMouseMove);

    return () => {
      main.removeEventListener("mousemove", handleMouseMove);
    };
  }, [content]);
  useGSAP(() => {
    const image = imageRef.current;
    if (!image) return;
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.5,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1.2,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };
    image.addEventListener("mouseenter", handleMouseEnter);
    image.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      image.removeEventListener("mouseenter", handleMouseEnter);
      image.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [content]);
  useGSAP(()=>{
    const heading = headingRef.current;
    gsap.from(heading,{
      y:-400,
      delay:0.3,
      duration:0.5,
      ease:"power2.out"
    })
    gsap.from(humRef.current,{
      y:-400,
      delay:0.4,
      duration:0.5,
      ease:"power2.out"
    })
  },[content])
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black text-white">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="clipText">
              <text
                x="50%"
                y="50%"
                fontSize="500"
                textAnchor="middle"
                fontFamily="Arial"
                fontWeight="bold"
                dominantBaseline="middle"
              >
                VI
              </text>
            </clipPath>
          </defs>

          {/* Background for contrast */}
          <rect width="100%" height="100%" fill="#000" />

          {/* Image clipped inside the text */}
          <image
            href="./src/image/bg.png"
            width="100%"
            height="100%"
            clipPath="url(#clipText)"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      </div>
      {content && (
        <div ref={mainRef} className="main rotate-[-10deg] h-screen w-full">
          <div className="navbar h-20 w-full absolute top-0 left-0 z-[999]">
            <div className="logo flex items-center h-20 w-screen justify-between">
              <h1 ref={headingRef} className="font-[GTA6] text-5xl h-auto w-auto hover:text-yellow-100 cursor-pointer relative left-16">
                VI
              </h1>
              <div ref={humRef} className="lines relative right-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  cursor="pointer"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </div>
            </div>
          </div>
          <div className="imagediv relative h-screen w-screen overflow-hidden">
            <div className="mainscreen">
              <img
                className="absolute gtasky scale-[1.4] top-0 left-0 w-full h-full object-cover"
                src={Sky}
                alt="GTA sky"
              />
              <img
                className="absolute bggta scale-[1.2] top-0 left-0 w-full h-full object-cover"
                src={GTA}
                alt="GTA6"
              />
              <div className="textgta absolute flex flex-col gap-2 top-6 left-1/2 transform -translate-x-1/2">
                <h1 className="text-[10rem] leading-none relative right-20 font-[PriceDown]">
                  grand
                </h1>
                <h1 className="text-[10rem] leading-none font-[PriceDown] relative left-20">
                  theft
                </h1>
                <h1 className="text-[10rem] leading-none font-[PriceDown] relative right-20">
                  auto
                </h1>
              </div>
              <img
                className="absolute -bottom-[20%] top-0 left-1/2 scale-[0.7] transform -translate-x-1/2 object-cover"
                src={Girl}
                alt="GTA Girl"
              />
            </div>
            <div className="bottom h-16 absolute w-full bg-gradient-to-t from-black to-transparent bottom-0 left-0">
              <div className="scrollinglogo absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="currentColor"
                >
                  <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="timeline h-screen w-screen bg-[#111117] flex flex-col items-center justify-around">
            <div className="image">
              <img
                className="h-52 w-auto relative left-1/2 transform -translate-x-1/2"
                src={Logo}
                alt="Gtalogo"
              />
            </div>
            <div className="text text-7xl uppercase text-center font-[GTA6] text-[#EA6D8B] pointer-events-none">
              <h1>Coming</h1>
              <h1>May 26</h1>
              <h1>2026</h1>
            </div>
            <div className="playstation">
              <img className="h-20" src={Playstation} alt="Playstation" />
            </div>
          </div>
          <div className="third w-screen flex items-center justify-center h-screen bg-black">
            <div className="cont w-full flex items-center justify-evenly h-[80%] relative top-1/2 transform -translate-y-1/2">
              <div className="limage relative w-1/2 h-full">
                <img
                  ref={imageRef}
                  className="h-[30rem] absolute scale-[1.2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src={Gtaimage}
                  alt="GTA Image"
                />
              </div>
              <div className="right">
                <h1 className="text-4xl tracking-tight text-nowrap text-[#EA6D8B] font-[GTA6]">
                  Vice City, USA. <br /> Jason and Lucia have always known the
                  deck is stacked <br /> against them. But when an easy score
                  goes wrong, they <br />
                  find themselves on the darkest side of the sunniest place in{" "}
                  <br />
                  America, in the middle of a criminal conspiracy <br />{" "}
                  stretching across the state of Leonida — forced to rely on{" "}
                  <br /> each other more than ever if they want to make it out
                  alive.
                </h1>
                <button className="text-3xl download uppercase text-black bg-yellow-300 cursor-pointer font-[PriceDown]">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
