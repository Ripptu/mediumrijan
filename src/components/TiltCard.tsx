import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", containerClassName = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize motion values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Initialize motion values for the spotlight glow position
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  // Configure smooth spring physics for the tilt angles
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  // Soft elastic transitions for the light reflections
  const springConfigGlow = { damping: 25, stiffness: 250 };
  const springGlowX = useSpring(glowX, springConfigGlow);
  const springGlowY = useSpring(glowY, springConfigGlow);
  const springGlowOpacity = useSpring(glowOpacity, springConfigGlow);

  // Track cursor position on movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse positions (range from -0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);

    // Calculate pixel coordinates for the glow effect
    const pxX = e.clientX - rect.left;
    const pxY = e.clientY - rect.top;

    glowX.set(pxX);
    glowY.set(pxY);
    glowOpacity.set(1);
  };

  // Reset rotation and hide glow on leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  // Construct radial gradient style based on mouse position
  const glowStyle = useTransform(
    [springGlowX, springGlowY, springGlowOpacity],
    ([gx, gy, go]) => {
      return {
        background: `radial-gradient(400px circle at ${gx}px ${gy}px, rgba(225, 224, 204, 0.08), transparent 80%)`,
        opacity: go as number,
      };
    }
  );

  return (
    <div
      style={{ perspective: "1000px" }}
      className={`w-full h-full ${containerClassName}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full w-full rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/5 hover:border-primary/20 transition-colors duration-500 overflow-hidden group select-none shadow-2xl hover:shadow-[0_20px_50px_rgba(225,224,204,0.04)] ${className}`}
      >
        {/* Mouse follow spotlight glow element */}
        <motion.div
          style={glowStyle}
          className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
        />

        {/* Content container inside the 3D space */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
