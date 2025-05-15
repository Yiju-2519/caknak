"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StarryBackground = () => {
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mounting before showing stars
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate consistent stars (you can also use a seeded random if needed)
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 23 % 100)}%`, // Pseudo-random but consistent
      top: `${(i * 37 % 100)}%`,
      size: (i % 3) + 2,
      opacity: 0.2 + (i % 5) * 0.1,
      delay: (i % 30) * 0.1,
      duration: 2 + (i % 4),
    }));
  };

  const stars = generateStars(60);

  // Don't render on server-side
  if (!mounted) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "#ffffc5",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: star.opacity,
            scale: 1,
          }}
          transition={{ 
            duration: 0.7,
            delay: star.delay,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "#ffffc5",
            }}
            animate={{ 
              scale: [1, 3, 1],
              opacity: [star.opacity, star.opacity * 0.8, star.opacity]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}

      {/* Larger feature stars - fixed positions */}
      <motion.div
        className="absolute rounded-full"
        style={{ 
          top: "15%", 
          left: "8%", 
          width: "10px", 
          height: "10px",
          backgroundColor: "#ffffc5",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.6,
          scale: 1,
        }}
        transition={{ 
          duration: 0.8,
          delay: 0.5,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "#ffffc5",
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.2, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        className="absolute rounded-full"
        style={{ 
          top: "25%", 
          right: "12%", 
          width: "12px", 
          height: "12px",
          backgroundColor: "#ffffc5",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.7,
          scale: 1,
        }}
        transition={{ 
          duration: 0.8,
          delay: 1,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "#ffffc5",
          }}
          animate={{ 
            scale: [1, 1.6, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        className="absolute rounded-full"
        style={{ 
          top: "60%", 
          left: "15%", 
          width: "8px", 
          height: "8px",
          backgroundColor: "#ffffc5",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.5,
          scale: 1,
        }}
        transition={{ 
          duration: 0.8,
          delay: 1.5,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "#ffffc5",
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        className="absolute rounded-full"
        style={{ 
          top: "75%", 
          right: "20%", 
          width: "11px", 
          height: "11px",
          backgroundColor: "#ffffc5",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.6,
          scale: 1,
        }}
        transition={{ 
          duration: 0.8,
          delay: 2,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "#ffffc5",
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.2, 0.6]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default StarryBackground;