import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Pre-process segments into a single list of words, keeping track of their className and overall index
  const wordsList: { word: string; className: string; index: number }[] = [];
  let currentIdx = 0;
  
  segments.forEach((seg) => {
    const words = seg.text.split(" ");
    words.forEach((w) => {
      if (w !== "") {
        wordsList.push({
          word: w,
          className: seg.className || "",
          index: currentIdx++,
        });
      }
    });
  });

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (customIndex: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: customIndex * 0.08,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {wordsList.map((item) => (
        <span
          key={item.index}
          className="inline-block overflow-hidden mr-[0.22em] last:mr-0 py-[0.1em]"
        >
          <motion.span
            custom={item.index}
            variants={childVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
