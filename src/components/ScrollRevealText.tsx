import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

export function AnimatedLetter({ char, index, totalChars, progress }: AnimatedLetterProps) {
  const start = index / totalChars - 0.1;
  const end = index / totalChars + 0.05;
  
  // Use useTransform to map scroll progress to character opacity [0.2 to 1]
  const opacity = useTransform(
    progress,
    [Math.max(0, start), Math.min(1, end)],
    [0.2, 1]
  );

  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll progress of the text block relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, index) => (
        <AnimatedLetter
          key={index}
          char={char}
          index={index}
          totalChars={totalChars}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
