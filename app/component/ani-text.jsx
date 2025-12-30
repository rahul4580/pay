    "use client"

    import React, { useEffect, useRef } from 'react';
    import { gsap } from 'gsap';

    export const AniText = () => {
      const textRef = useRef(null);

      useEffect(() => {
        const el = textRef.current;

        // Initial: hidden below screen
        // Correct gsap.set for initial text animation appearance
        gsap.set(el, {
          position: "fixed",                // Start as fixed
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          y: "50vh",                       // Start hidden below
          scale: 3,
          opacity: 1,
          fontSize: "10vw",
          fontWeight: "bold",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 50,
        });
        const tl = gsap.timeline({
          defaults: { ease: "expo.inOut" }
        });

        // ⏸ Small pause
        tl.to({}, { duration: 1.2 });
    
        // ↑ Step 1: come UP to center
        // Animate each character one by one
        const chars = el.innerText.split('');
        el.innerHTML = chars
          .map((char, idx) => {
            const style = `display:inline-block; opacity:0; transform:translateY(100vh) scale(3);${idx !== chars.length - 1 ? 'margin-right:0.42em;' : ''}`;
            return `<span class="ani-char" style="${style}">${char}</span>`;
          })
          .join('');
        const charSpans = el.querySelectorAll('.ani-char');
        tl.to(charSpans, {
          duration: 1.2,
          y: -100,
          scale: 2.2,
          opacity: 1,
          stagger: 0.12,
          ease: "expo.inOut"
        }, 0);

        // ↑ Step 3: move UP to final top-left
        tl.to(el, {
          duration: 0.8,
          x: "-32vw",
          y: "-10vh",
          scale: 1,
          fontSize: "10vw",
          background: "transparent",
          pointerEvents: "auto",
          ease: "power3.out",
          onComplete: () => {
            // After animation, switch to absolute
            gsap.set(el, {
              position: "absolute"
            });
          }
        });

      }, []);

      return (
        <div ref={textRef}>
          PAY 
        </div>
      );
    }



