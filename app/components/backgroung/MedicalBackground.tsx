'use client';

import { motion } from 'motion/react';
import {
  Stethoscope, Heart, Pill, Syringe, Activity, Cross,
  Thermometer, Shield, Microscope, Zap
} from 'lucide-react';
import { DNAHelix } from './DNAHelix';

const medicalIcons = [
  Stethoscope, Heart, Pill, Syringe, Activity,
  Cross, Thermometer, Shield, Microscope, Zap
];

export function MedicalBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0b1220 0%, #0e1a33 100%)' }}
    >
      {/* Partículas/ícones flutuando */}
      {Array.from({ length: 24 }).map((_, i) => {
        const Icon = medicalIcons[i % medicalIcons.length];
        const startX = Math.random() * 100;   // %
        const delay = Math.random() * 6;      // s
        const dur = 18 + Math.random() * 12;  // s
        const size = 16 + Math.random() * 16; // px
        const opacity = 0.06 + Math.random() * 0.1;

        return (
          <motion.div
            key={i}
            className="absolute text-slate-200"
            style={{ left: `${startX}%`, top: '-10%', opacity, willChange: 'transform' }}
            animate={{ y: '120vh', rotate: [0, 20, -20, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'linear' }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}

      {/* DNA no canto */}
      <motion.div
        className="absolute bottom-8 right-8 opacity-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <DNAHelix size={90} />
      </motion.div>

      {/* Cruz sutil ao centro (respiração) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Cross size={280} />
      </motion.div>
    </div>
  );
}
