'use client';

import { motion } from 'motion/react';

interface DNAHelixProps {
  className?: string;
  size?: number;
}

export function DNAHelix({ className = "", size = 60 }: DNAHelixProps) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ willChange: 'transform' }}
    >
      <svg width={size} height={size} viewBox="0 0 60 60">
        {/* Fios da hélice */}
        <motion.path
          d="M15 5 Q30 15 45 5 Q30 25 15 15 Q30 35 45 25 Q30 45 15 35 Q30 55 45 45"
          stroke="#38bdf8" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M45 5 Q30 15 15 5 Q30 25 45 15 Q30 35 15 25 Q30 45 45 35 Q30 55 15 45"
          stroke="#06b6d4" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        {/* “Degraus” da hélice */}
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={15 + i*5} y1={10 + i*8}
            x2={45 - i*5} y2={10 + i*8}
            stroke="#94a3b8" strokeWidth="1"
          />
        ))}
      </svg>
    </motion.div>
  );
}
