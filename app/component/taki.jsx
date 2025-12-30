"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function CenteredHoverCarousel() {
  const originalImages = [
    "https://plus.unsplash.com/premium_photo-1661429571803-32c647db5a14?w=1200",
    "https://plus.unsplash.com/premium_photo-1666700698946-fbf7baa0134a?w=1200",
    "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=1200",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200",
  ];

  const images = [
    originalImages[originalImages.length - 1],
    ...originalImages,
    originalImages[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [cardWidth, setCardWidth] = useState(600);

  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  /* ✅ Resize-safe card width */
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      setCardWidth(Math.min(w * 0.5, 600));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ✅ Auto slide */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((p) => p + 1);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  /* ✅ Slider movement */
  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return;

    const gap = 30;
    const containerWidth = containerRef.current.clientWidth;
    const offset = (containerWidth - cardWidth) / 2;

    sliderRef.current.style.transition =
      "transform 0.8s cubic-bezier(.4,0,.2,1)";
    sliderRef.current.style.transform = `translateX(${offset - currentIndex * (cardWidth + gap)
      }px)`;

    if (currentIndex === images.length - 1) {
      setTimeout(() => setCurrentIndex(1), 800);
    }
    if (currentIndex === 0) {
      setTimeout(() => setCurrentIndex(images.length - 2), 800);
    }
  }, [currentIndex, cardWidth, images.length]);

  const cardHeight = cardWidth * 0.75;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={sliderRef}
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {images.map((src, i) => {
            const isCenter = i === currentIndex;

            return (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius: "48px",
                  overflow: "hidden",
                  background: "#f3f3f3",
                  transform: isCenter ? "scale(1.05)" : "scale(0.88)",
                  opacity: isCenter ? 1 : 0.6,
                  transition: "all 0.6s ease",
                  boxShadow: isCenter
                    ? "0 40px 80px rgba(0,0,0,0.35)"
                    : "0 12px 30px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  width={600}
                  height={450}
                  unoptimized
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>

        <button onClick={() => setCurrentIndex((p) => p - 1)} style={arrowStyle("left")}>←</button>
        <button onClick={() => setCurrentIndex((p) => p + 1)} style={arrowStyle("right")}>→</button>
      </div>
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "40px",
  transform: "translateY(-50%)",
  width: 64,
  height: 64,
  borderRadius: "50%",
  border: "none",
  background: "white",
  fontSize: 28,
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,.3)",
  zIndex: 10,
});
