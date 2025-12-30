"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ImagePopup() {
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  // Generate random image URLs (using Picsum for random images)
  const getRandomImage = (index) => {
    const seed = Math.floor(Math.random() * 1000) + index
    return `https://picsum.photos/seed/${seed}/300/300`
  }

  // Generate random positions
  const getRandomPosition = (containerWidth, containerHeight) => {
    const imageSize = 200
    return {
      x: Math.random() * Math.max(0, containerWidth - imageSize),
      y: Math.random() * Math.max(0, containerHeight - imageSize),
      rotation: (Math.random() - 0.5) * 20, // Random rotation between -10 and 10 degrees
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Get container dimensions
    const containerWidth = container.offsetWidth || window.innerWidth
    const containerHeight = container.offsetHeight || window.innerHeight

    // Create 15 random images
    const imageCount = 15
    const imageElements = []

    for (let i = 0; i < imageCount; i++) {
      const img = document.createElement('img')
      img.src = getRandomImage(i)
      img.style.position = 'absolute'
      img.style.width = '200px'
      img.style.height = '200px'
      img.style.objectFit = 'cover'
      img.style.borderRadius = '12px'
      img.style.cursor = 'pointer'
      img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
      img.style.opacity = '0'
      img.style.transform = 'scale(0)'

      const pos = getRandomPosition(containerWidth, containerHeight)
      img.style.left = `${pos.x}px`
      img.style.top = `${pos.y}px`

      container.appendChild(img)
      imageElements.push(img)

      // Pop-up animation
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        rotation: pos.rotation,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'back.out(1.7)',
      })

      // Hover effect - move image on hover
      img.addEventListener('mouseenter', () => {
        const moveX = (Math.random() - 0.5) * 100
        const moveY = (Math.random() - 0.5) * 100
        const newRotation = pos.rotation + (Math.random() - 0.5) * 30

        gsap.to(img, {
          x: `+=${moveX}`,
          y: `+=${moveY}`,
          rotation: newRotation,
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out',
        })
      })

      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          x: 0,
          y: 0,
          rotation: pos.rotation,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
      })
    }

    imagesRef.current = imageElements

    // Cleanup
    return () => {
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

