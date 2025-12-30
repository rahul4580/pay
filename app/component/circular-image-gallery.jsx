"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CircularImageGallery() {
  const containerRef = useRef(null)
  const ribbonRef = useRef(null)
  const imagesRef = useRef([])
  const [images] = useState(() => {
    // Generate random image URLs
    const imageUrls = []
    for (let i = 0; i < 8; i++) {
      const seed = Math.floor(Math.random() * 2000) + i * 100
      imageUrls.push(`https://picsum.photos/seed/${seed}/400/500`)
    }
    return imageUrls
  })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const imageElements = imagesRef.current
    const ribbon = ribbonRef.current

    // Circular arrangement parameters
    const radiusX = 350 // Horizontal radius (ellipse)
    const radiusY = 250 // Vertical radius (ellipse)
    const containerRect = container.getBoundingClientRect()
    const centerX = containerRect.width / 2
    const centerY = containerRect.height / 2
    const totalImages = images.length
    const angleStep = (2 * Math.PI) / totalImages

    // Position images in elliptical pattern
    const updateImagePositions = (scrollOffset = 0) => {
      imageElements.forEach((img, index) => {
        if (!img) return

        const angle = (index * angleStep - Math.PI / 2) + (scrollOffset * Math.PI) / 180
        const x = centerX + radiusX * Math.cos(angle) - 150 // Offset by half image width
        const y = centerY + radiusY * Math.sin(angle) - 200 // Offset by half image height
        const rotation = (angle * 180) / Math.PI + 90 // Rotate to face center

        if (scrollOffset === 0) {
          // Initial setup
          gsap.set(img, {
            x: x,
            y: y,
            rotation: rotation,
            opacity: 0,
            scale: 0,
          })
        } else {
          // Update on scroll
          gsap.to(img, {
            x: x,
            y: y,
            rotation: rotation,
            duration: 0.3,
            ease: 'power1.out',
          })
        }
      })
    }

    updateImagePositions(0)

    // Pop-up animations and hover effects for each image
    imageElements.forEach((img, index) => {
      if (!img) return

      // Pop-up animation
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.15,
        ease: 'back.out(1.7)',
      })

      // Hover effect
      img.addEventListener('mouseenter', () => {
        const currentRotation = gsap.getProperty(img, 'rotation')
        gsap.to(img, {
          scale: 1.15,
          z: 50,
          rotation: currentRotation + (Math.random() - 0.5) * 15,
          duration: 0.5,
          ease: 'power2.out',
        })
      })

      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          z: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      })
    })

    // Scroll-based rotation
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollRotation = scrollY * 0.3 // Adjust rotation speed

      updateImagePositions(scrollRotation)

      // Rotate ribbon
      if (ribbon) {
        gsap.to(ribbon, {
          rotation: scrollRotation,
          duration: 0.3,
          ease: 'power1.out',
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    // Animate ribbon text continuously
    if (ribbon) {
      const textPath = ribbon.querySelector('textPath')
      if (textPath) {
        const animate = () => {
          gsap.to(textPath, {
            attr: { startOffset: '+=100%' },
            duration: 20,
            ease: 'none',
            onComplete: () => {
              textPath.setAttribute('startOffset', '0%')
              animate()
            },
          })
        }
        animate()
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [images])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '200vh', // Taller for scroll effect
        backgroundColor: '#8B7EC8', // Purple background
        overflow: 'hidden',
      }}
    >
      {/* Ribbon wrapper */}
      <div
        ref={ribbonRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '700px',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 900 700"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 450,350 m -400,0 a 400,300 0 1,1 800,0 a 400,300 0 1,1 -800,0"
              fill="none"
            />
          </defs>
          <text
            className="ribbon-text"
            fill="white"
            fontSize="28"
            fontWeight="bold"
            letterSpacing="12"
          >
            <textPath href="#circlePath" startOffset="0%">
              PMNDRS • PMNDRS • PMNDRS • PMNDRS • PMNDRS • PMNDRS • PMNDRS •{' '}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Images */}
      {images.map((src, index) => (
        <Image
          key={index}
          ref={(el) => {
            imagesRef.current[index] = el
          }}
          src={src}
          alt={`Gallery image ${index + 1}`}
          width={300}
          height={400}
          unoptimized
          style={{
            position: 'absolute',
            objectFit: 'cover',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            transformOrigin: 'center center',
          }}
        />
      ))}

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'black',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 10,
        }}
      >
        scroll up/down ...
      </div>
    </div>
  )
}

