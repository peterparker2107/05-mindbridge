import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Wind,
  Eye,
  Hand,
  Ear,
  Flower2,
  Coffee,
  CheckCircle,
  Compass
} from 'lucide-react';
import { playGentleChime } from '../lib/cbtData';

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';
type Technique = '478' | 'box' | 'grounding54321';

interface PhaseConfig {
  name: BreathingPhase;
  label: string;
  duration: number; // in seconds
  instruction: string;
  color: string;
  targetScale: number;
}

const CONFIG_478: PhaseConfig[] = [
  {
    name: 'inhale',
    label: 'Inhale deeply',
    duration: 4,
    instruction: 'Inhale through your nose, filling your belly and lungs.',
    color: '#527C60', // Sage green
    targetScale: 1.45
  },
  {
    name: 'hold',
    label: 'Hold breath',
    duration: 7,
    instruction: 'Hold gently without straining. Relax your shoulders.',
    color: '#D97858', // Soft terracotta
    targetScale: 1.45
  },
  {
    name: 'exhale',
    label: 'Exhale slowly',
    duration: 8,
    instruction: 'Exhale steadily through your mouth with a whooshing sound.',
    color: '#3B6852',
    targetScale: 1.0
  }
];

const CONFIG_BOX: PhaseConfig[] = [
  {
    name: 'inhale',
    label: 'Inhale',
    duration: 4,
    instruction: 'Inhale slowly through your nose.',
    color: '#527C60',
    targetScale: 1.4
  },
  {
    name: 'hold',
    label: 'Hold',
    duration: 4,
    instruction: 'Hold full breath with calm awareness.',
    color: '#C68748',
    targetScale: 1.4
  },
  {
    name: 'exhale',
    label: 'Exhale',
    duration: 4,
    instruction: 'Smoothly exhale all air.',
    color: '#3B6852',
    targetScale: 1.0
  },
  {
    name: 'rest',
    label: 'Rest',
    duration: 4,
    instruction: 'Hold empty lungs calmly before the next wave.',
    color: '#8A978E',
    targetScale: 1.0
  }
];

const GROUNDING_54321_STEPS = [
  {
    count: 5,
    sense: 'SEE',
    title: '5 things you can SEE around you',
    icon: <Eye className="w-5 h-5 text-[#527C60]" />,
    example: 'e.g. The green hostel curtains, laptop keyboard, water bottle, classmate\'s notebook, tree outside window.',
    placeholder: 'Notice specific shapes, colors, or reflections...'
  },
  {
    count: 4,
    sense: 'FEEL',
    title: '4 things you can physically TOUCH',
    icon: <Hand className="w-5 h-5 text-[#D97858]" />,
    example: 'e.g. Feet grounded against floor, texture of your cotton shirt, cool desk surface, phone screen.',
    placeholder: 'Observe textures, temperature, and physical contact...'
  },
  {
    count: 3,
    sense: 'HEAR',
    title: '3 things you can HEAR right now',
    icon: <Ear className="w-5 h-5 text-[#4D718E]" />,
    example: 'e.g. The whir of the hostel ceiling fan, distant bikes on campus road, keyboard clicks in library.',
    placeholder: 'Listen past the immediate room to subtle background layers...'
  },
  {
    count: 2,
    sense: 'SMELL',
    title: '2 things you can SMELL',
    icon: <Flower2 className="w-5 h-5 text-[#865E87]" />,
    example: 'e.g. Fresh coffee / tapri chai aroma, monsoon grass scent, pages of a textbook.',
    placeholder: 'Inhale gently and notice faint olfactory sensations...'
  },
  {
    count: 1,
    sense: 'TASTE',
    title: '1 thing you can TASTE',
    icon: <Coffee className="w-5 h-5 text-[#8D6B40]" />,
    example: 'e.g. Lingering taste of mint, water, or run your tongue along your teeth.',
    placeholder: 'Anchor into your physical presence right now.'
  }
];

export const BreathingExercise: React.FC = () => {
  const [technique, setTechnique] = useState<Technique>('478');
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(CONFIG_478[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 5-4-3-2-1 Grounding state
  const [groundingChecks, setGroundingChecks] = useState<Record<number, boolean>>({});

  const activeConfig = technique === 'box' ? CONFIG_BOX : CONFIG_478;
  const currentPhase = activeConfig[phaseIndex] || activeConfig[0];

  const timerRef = useRef<number | null>(null);

  // Timer loop
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Advance phase
          const nextIndex = (phaseIndex + 1) % activeConfig.length;
          if (nextIndex === 0) {
            setCyclesCompleted((c) => c + 1);
          }
          setPhaseIndex(nextIndex);

          if (soundEnabled) {
            // Chime frequency based on phase
            const chimeFreq = nextIndex === 0 ? 528 : nextIndex === 1 ? 660 : 440;
            playGentleChime(chimeFreq, 0.9);
          }

          return activeConfig[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phaseIndex, activeConfig, soundEnabled]);

  const handleStart = () => {
    setIsActive(true);
    if (soundEnabled) {
      playGentleChime(528, 1);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setSecondsRemaining(activeConfig[0].duration);
    setCyclesCompleted(0);
  };

  const handleSwitchTechnique = (t: Technique) => {
    setIsActive(false);
    setTechnique(t);
    setPhaseIndex(0);
    if (t === 'box') {
      setSecondsRemaining(CONFIG_BOX[0].duration);
    } else if (t === '478') {
      setSecondsRemaining(CONFIG_478[0].duration);
    }
    setCyclesCompleted(0);
  };

  const toggleGroundingCheck = (count: number) => {
    setGroundingChecks((prev) => ({
      ...prev,
      [count]: !prev[count]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#ECE5D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#577D62] tracking-wider uppercase mb-1">
            <Wind className="w-3.5 h-3.5" />
            Vagus Nerve Regulation & Somatic Grounding
          </div>
          <h2 className="text-2xl font-bold text-[#222E25]">The Grounding Oasis</h2>
          <p className="text-sm text-[#5D6F62] max-w-2xl mt-0.5">
            Paced breathwork resets physiological fight-or-flight spikes within 90 seconds. Ideal before walk-in placement interviews, during viva nervousness, or midnight hostel panic.
          </p>
        </div>

        {/* Exercise Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-[#FAF7F0] p-1.5 rounded-xl border border-[#E7DFD2] shrink-0">
          <button
            onClick={() => handleSwitchTechnique('478')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              technique === '478'
                ? 'bg-white text-[#2B543A] shadow-xs border border-[#DDD5C6]'
                : 'text-[#647467] hover:text-[#233127]'
            }`}
          >
            4-7-8 Relaxing
          </button>
          <button
            onClick={() => handleSwitchTechnique('box')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              technique === 'box'
                ? 'bg-white text-[#2B543A] shadow-xs border border-[#DDD5C6]'
                : 'text-[#647467] hover:text-[#233127]'
            }`}
          >
            4-4-4-4 Box Breath
          </button>
          <button
            onClick={() => handleSwitchTechnique('grounding54321')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              technique === 'grounding54321'
                ? 'bg-white text-[#2B543A] shadow-xs border border-[#DDD5C6]'
                : 'text-[#647467] hover:text-[#233127]'
            }`}
          >
            5-4-3-2-1 Sensory
          </button>
        </div>
      </div>

      {technique !== 'grounding54321' ? (
        <div className="bg-white rounded-3xl border border-[#E9E2D5] p-8 shadow-xs max-w-2xl mx-auto flex flex-col items-center text-center space-y-8">
          {/* Technique Meta & Sound toggle */}
          <div className="w-full flex items-center justify-between text-xs text-[#6F7F72] border-b border-[#F0EBE2] pb-3">
            <span className="font-medium">
              {technique === '478' ? '🌿 4-7-8 Deep Parasympathetic Reset' : '📦 4-4-4-4 Box Breathing for Focus'}
            </span>
            <div className="flex items-center gap-4">
              <span>
                Completed Cycles: <strong className="text-[#2F5A3D]">{cyclesCompleted}</strong>
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1 text-[#627766] hover:text-[#233127] cursor-pointer"
                title="Toggle gentle chime sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 text-[#A0AEA4]" />}
                <span>{soundEnabled ? 'Chime On' : 'Muted'}</span>
              </button>
            </div>
          </div>

          {/* SVG Animated Breathing Circle */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
            {/* Soft Ambient Background Rings */}
            <motion.div
              animate={{
                scale: isActive ? currentPhase.targetScale : 1.0,
                opacity: isActive ? 0.35 : 0.2
              }}
              transition={{
                duration: currentPhase.duration,
                ease: currentPhase.name === 'hold' ? 'linear' : 'easeInOut'
              }}
              className="absolute inset-0 rounded-full border-4 border-[#78A987] bg-[#E8F3EB]/40 blur-xs"
            />

            {/* Inner Glowing Bubble */}
            <motion.div
              animate={{
                scale: isActive ? currentPhase.targetScale * 0.85 : 0.85,
                backgroundColor: currentPhase.color
              }}
              transition={{
                duration: currentPhase.duration,
                ease: currentPhase.name === 'hold' ? 'linear' : 'easeInOut'
              }}
              className="w-44 h-44 rounded-full flex flex-col items-center justify-center text-white shadow-xl p-4 transition-colors relative z-10"
            >
              <span className="text-3xl font-extrabold tracking-tight drop-shadow-xs">
                {secondsRemaining}s
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold mt-1 drop-shadow-xs">
                {currentPhase.label}
              </span>
            </motion.div>

            {/* Orbiting Ripple Ring */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-[#EBE4D7] fill-transparent"
                strokeWidth="4"
              />
              {isActive && (
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-[#527C60] fill-transparent transition-all"
                  strokeWidth="6"
                  strokeDasharray="800"
                  strokeDashoffset={
                    800 - (800 * (currentPhase.duration - secondsRemaining)) / currentPhase.duration
                  }
                  strokeLinecap="round"
                />
              )}
            </svg>
          </div>

          {/* Prompt Cues */}
          <div className="space-y-2 max-w-md">
            <h3 className="text-lg font-bold text-[#243026]">
              {isActive ? currentPhase.label : 'Ready to ground your body?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5D6F61] leading-relaxed">
              {isActive
                ? currentPhase.instruction
                : 'Find a comfortable seated posture. Lower your shoulders, unclench your jaw, and press Start.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#527C60] hover:bg-[#3F634A] text-white font-semibold text-sm transition shadow-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Breathing Cycle
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#D97858] hover:bg-[#C26546] text-white font-semibold text-sm transition shadow-sm cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-current" />
                Pause
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-3 rounded-2xl border border-[#D5CDC1] bg-white hover:bg-[#F7F4EE] text-[#554C3F] transition cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Medical Science Note */}
          <div className="text-[11px] text-[#7A6C5C] max-w-md bg-[#FAF7F0] p-3 rounded-xl border border-[#E9DFCF] leading-relaxed">
            💡 <strong>Why this works:</strong> Prolonging the exhale to 8 seconds physically forces your heart rate to decelerate through the baroreceptor reflex, stimulating parasympathetic acetylcholine release.
          </div>
        </div>
      ) : (
        /* 5-4-3-2-1 Sensory Grounding Space */
        <div className="bg-white rounded-3xl border border-[#E9E2D5] p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="border-b border-[#F0EBE2] pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8C5E32] uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              Emergency Somatic Panic Defusal
            </div>
            <h3 className="text-xl font-bold text-[#243026]">
              5-4-3-2-1 Sensory Grounding Technique
            </h3>
            <p className="text-xs text-[#5D6F61] mt-1">
              When thoughts are spinning out of control, anchor directly back into your physical sensory reality in the current room.
            </p>
          </div>

          <div className="space-y-4">
            {GROUNDING_54321_STEPS.map((step) => {
              const isChecked = !!groundingChecks[step.count];
              return (
                <div
                  key={step.count}
                  onClick={() => toggleGroundingCheck(step.count)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-[#F2F8F4] border-[#527C60] shadow-xs'
                      : 'bg-[#FAF9F6] border-[#E9E2D6] hover:border-[#CBDCD1]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-white border border-[#E0D7C9] shrink-0">
                    {step.icon}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#233127]">{step.title}</h4>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div
                        className="accent-[#527C60] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-[#637568]">{step.example}</p>
                    <p className="text-[11px] text-[#867563] italic pt-0.5">{step.placeholder}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Celebration */}
          {Object.values(groundingChecks).filter(Boolean).length === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-[#EDF8F1] border border-[#BDE0C8] rounded-2xl text-center space-y-1 text-xs text-[#2A5C3C]"
            >
              <div className="font-bold text-sm flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                All 5 Sensory Anchors Completed
              </div>
              <p>
                Take a long, deep breath. You are safe in this physical moment, right here on campus.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
