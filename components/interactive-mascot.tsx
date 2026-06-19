"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Heart, Brain, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Emotion = "idle" | "happy" | "love" | "think" | "confused";

const containerVariants = {
  idle: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
  happy: {
    y: [0, -30, 0],
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
  },
  love: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" as const },
  },
  think: {
    rotate: [0, -10, -10, 0],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" as const },
  },
  confused: {
    x: [0, -2, 2, -2, 2, 0],
    rotate: [0, -2, 2, -2, 2, 0],
    transition: { duration: 0.2, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const emotions: { emotion: Emotion; label: string; icon: React.ReactNode }[] = [
  { emotion: "idle", label: "Idle", icon: <Sparkles /> },
  { emotion: "happy", label: "Happy", icon: <Smile /> },
  { emotion: "love", label: "Love", icon: <Heart /> },
  { emotion: "think", label: "Think", icon: <Brain /> },
  { emotion: "confused", label: "Confused", icon: <HelpCircle /> },
];

export default function InteractiveMascot() {
  const [emotion, setEmotion] = useState<Emotion>("idle");

  const renderEyes = () => {
    switch (emotion) {
      case "happy":
        return (
          <>
            <motion.circle
              cx="82"
              cy="80"
              r="7"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
              cx="118"
              cy="80"
              r="7"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
          </>
        );
      case "love":
        return (
          <>
            <motion.path
              d="M82,84 C82,84 76,78 76,75 C76,72 78,71 80,71 C81.5,71 82,72.5 82,72.5 C82,72.5 82.5,71 84,71 C86,71 88,72 88,75 C88,78 82,84 82,84Z"
              fill="#EF4444"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M118,84 C118,84 112,78 112,75 C112,72 114,71 116,71 C117.5,71 118,72.5 118,72.5 C118,72.5 118.5,71 120,71 C122,71 124,72 124,75 C124,78 118,84 118,84Z"
              fill="#EF4444"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );
      case "think":
        return (
          <>
            <motion.circle
              cx="82"
              cy="74"
              r="5"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
              cx="118"
              cy="74"
              r="5"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
          </>
        );
      case "confused":
        return (
          <>
            <motion.circle
              cx="82"
              cy="80"
              r="5"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
              cx="118"
              cy="80"
              r="3"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          </>
        );
      default:
        return (
          <>
            <motion.circle
              cx="82"
              cy="80"
              r="5"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
              cx="118"
              cy="80"
              r="5"
              fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (emotion) {
      case "happy":
        return (
          <motion.path
            d="M85,100 Q100,115 115,100"
            stroke="#1F2937"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M85,100 Q100,115 115,100",
                "M85,102 Q100,118 115,102",
                "M85,100 Q100,115 115,100",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      case "love":
        return (
          <motion.path
            d="M88,100 Q100,112 112,100"
            stroke="#1F2937"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      case "think":
        return (
          <motion.path
            d="M90,102 Q95,99 100,102 Q105,105 110,102"
            stroke="#1F2937"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M90,102 Q95,99 100,102 Q105,105 110,102",
                "M90,103 Q95,100 100,103 Q105,106 110,103",
                "M90,102 Q95,99 100,102 Q105,105 110,102",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      case "confused":
        return (
          <motion.path
            d="M85,105 Q90,98 95,105 Q100,112 105,105 Q110,98 115,105"
            stroke="#1F2937"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      default:
        return null;
    }
  };

  const renderParticles = () => {
    if (emotion === "love") {
      return Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{ opacity: 1, y: 0, x: (i - 1.5) * 30 }}
          animate={{ opacity: 0, y: -80 }}
          transition={{ duration: 1.5, delay: i * 0.3, ease: "easeOut" }}
          className="absolute text-red-500"
          style={{ left: "50%", top: "30%" }}
        >
          <Heart size={16} fill="currentColor" />
        </motion.div>
      ));
    }
    if (emotion === "think") {
      return Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 1, y: 0, x: (i - 1) * 35 }}
          animate={{ opacity: 0, y: -70 }}
          transition={{ duration: 1.5, delay: i * 0.4, ease: "easeOut" }}
          className="absolute text-yellow-500"
          style={{ left: "50%", top: "25%" }}
        >
          <Sparkles size={16} />
        </motion.div>
      ));
    }
    return null;
  };

  return (
    <div>
      <div className="relative inline-block">
        <motion.div
          data-testid="mascot-container"
          data-emotion={emotion}
          variants={containerVariants}
          animate={emotion}
        >
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            role="button"
            tabIndex={0}
            onClick={() => setEmotion("happy")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setEmotion("happy");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <defs>
              <linearGradient
                id="mascot-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <ellipse
              cx="100"
              cy="150"
              rx="60"
              ry="35"
              fill="url(#mascot-gradient)"
            />
            <circle cx="100" cy="85" r="50" fill="url(#mascot-gradient)" />
            <g data-testid="mascot-eyes">{renderEyes()}</g>
            <g data-testid="mascot-mouth">{renderMouth()}</g>
          </svg>
        </motion.div>
        <AnimatePresence>
          {(emotion === "love" || emotion === "think") && (
            <div
              data-testid="mascot-particles"
              className="absolute inset-0 pointer-events-none"
            >
              {renderParticles()}
            </div>
          )}
        </AnimatePresence>
      </div>
      <div
        data-testid="emotion-panel"
        className="flex gap-2 justify-center mt-4"
      >
        {emotions.map(({ emotion: e, label, icon }) => (
          <Button
            key={e}
            variant="outline"
            data-testid={`emotion-btn-${e}`}
            onClick={() => setEmotion(e)}
          >
            {icon}
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
