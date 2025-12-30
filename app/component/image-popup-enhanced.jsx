"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ImagePopupEnhanced() {
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  // Generate random image URLs with different sizes for variety
  const getRandomImage = (index) => {
    const sizes = [250, 300, 350, 280, 320]
    const size = sizes[Math.floor(Math.random() * sizes.length)]
    const seed = Math.floor(Math.random() * 2000) + index * 100
    return `https://picsum.photos/seed/${seed}/${size}/${size}`
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const imageElements = []

    // Get container dimensions
    const updateDimensions = () => {
      return {
        width: container.offsetWidth || window.innerWidth,
        height: container.offsetHeight || window.innerHeight,
      }
    }

    const { width: containerWidth, height: containerHeight } = updateDimensions()

    // Create 20 random images for more visual impact
    const imageCount = 20
    const imageData = []

    for (let i = 0; i < imageCount; i++) {
      const img = document.createElement('img')
      const imageSize = 180 + Math.random() * 80 // Random size between 180-260px
      img.src = getRandomImage(i)
      img.style.position = 'absolute'
      img.style.width = `${imageSize}px`
      img.style.height = `${imageSize}px`
      img.style.objectFit = 'cover'
      img.style.borderRadius = '16px'
      img.style.cursor = 'pointer'
      img.style.boxShadow = '0 15px 40px rgba(0,0,0,0.25)'
      img.style.opacity = '0'
      img.style.transform = 'scale(0) rotate(0deg)'
      img.style.zIndex = '1'
      img.style.transition = 'z-index 0.3s'

      // Random position
      const x = Math.random() * Math.max(0, containerWidth - imageSize)
      const y = Math.random() * Math.max(0, containerHeight - imageSize)
      const rotation = (Math.random() - 0.5) * 25 // Random rotation between -12.5 and 12.5 degrees

      img.style.left = `${x}px`
      img.style.top = `${y}px`

      container.appendChild(img)
      imageElements.push(img)

      // Store original position and rotation
      const imageInfo = {
        element: img,
        x,
        y,
        rotation,
        size: imageSize,
      }
      imageData.push(imageInfo)

      // Set initial GSAP properties
      gsap.set(img, {
        rotation: rotation,
        transformOrigin: 'center center',
      })

      // Pop-up animation with more dramatic effect
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        rotation: rotation,
        duration: 1,
        delay: i * 0.08,
        ease: 'elastic.out(1, 0.5)',
      })

      // Enhanced hover effect
      img.addEventListener('mouseenter', () => {
        // Bring to front
        img.style.zIndex = '10'

        const moveDistance = 80 + Math.random() * 40 // 80-120px movement
        const moveX = (Math.random() - 0.5) * moveDistance
        const moveY = (Math.random() - 0.5) * moveDistance
        const newRotation = rotation + (Math.random() - 0.5) * 40

        img.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)'
        gsap.to(img, {
          x: `+=${moveX}`,
          y: `+=${moveY}`,
          rotation: newRotation,
          scale: 1.15,
          duration: 0.6,
          ease: 'power3.out',
        })
      })

      img.addEventListener('mouseleave', () => {
        // Return to original z-index
        setTimeout(() => {
          img.style.zIndex = '1'
        }, 300)

        img.style.boxShadow = '0 15px 40px rgba(0,0,0,0.25)'
        gsap.to(img, {
          x: 0,
          y: 0,
          rotation: rotation,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        })
      })

      // Add mouse move parallax effect
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const deltaX = (e.clientX - centerX) / 15

        gsap.to(img, {
          rotation: rotation + deltaX * 0.5,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    }

    imagesRef.current = imageElements

    // Handle window resize
    const handleResize = () => {
      const { width, height } = updateDimensions()
      imageData.forEach((info) => {
        const newX = Math.min(info.x, width - info.size)
        const newY = Math.min(info.y, height - info.size)
        gsap.to(info.element, {
          left: newX,
          top: newY,
          duration: 0.5,
        })
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      imageElements.forEach((img) => {
        img.remove()
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    />
  )
}

