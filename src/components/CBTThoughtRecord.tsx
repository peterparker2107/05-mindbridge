import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flame,
  Split,
  Sparkles,
  Repeat,
  Brain,
  HeartPulse,
  Filter,
  AlertCircle,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Trash2,
  Plus,
  ArrowDownRight,
  Sparkle,
  BookOpen,
  Calendar,
  Tag,
  Lightbulb,
  HeartHandshake
} from 'lucide-react';
import type { CBTThoughtRecord, DistortionId } from '../types/cbt';
import { COGNITIVE_DISTORTIONS } from '../lib/cbtData';

interface CBTThoughtRecordProps {
  records: CBTThoughtRecord[];
  onSaveRecord: (record: CBTThoughtRecord) => void;
  onDeleteRecord: (id: string) => void;
}

const DISTORTION_ICONS: Record<string, React.ReactNode> = {
  catastrophizing: <Flame className="w-5 h-5 text-red-600" />,
  all_or_nothing: <Split className="w-5 h-5 text-amber-600" />,
  fortune_telling: <Sparkles className="w-5 h-5 text-purple-600" />,
  overgeneralization: <Repeat className="w-5 h-5 text-blue-600" />,
  mind_reading: <Brain className="w-5 h-5 text-indigo-600" />,
  emotional_reasoning: <HeartPulse className="w-5 h-5 text-rose-600" />,
  mental_filter: <Filter className="w-5 h-5 text-emerald-600" />,
  should_statements: <AlertCircle className="w-5 h-5 text-orange-600" />,
  personalization: <UserCheck className="w-5 h-5 text-teal-600" />
};

const TIET_TEMPLATES = [
  {
    label: '💼 Placement OA Rejection',
    category: 'Placements' as const,
    situation: 'Did not clear round 1 Online Assessment for an on-campus company despite solving 2/3 questions.',
    automaticThought: 'I will remain completely unplaced; all the fees and 4 years of hard work are ruined.',
    distressBefore: 90,
    selectedDistortions: ['catastrophizing', 'all_or_nothing', 'fortune_telling'] as DistortionId[],
    rationalReframe: 'Tech hiring has high variance. Hundreds of companies hire throughout the academic year. Solving 2 questions under timed pressure proves my core algorithms are solid; I just need to brush up on graph recursion.'
  },
  {
    label: '📚 Low MST Exam Score',
    category: 'Academics' as const,
    situation: 'Scored 14/25 in Mid-Semester Test (MST) while aiming for 20+.',
    automaticThought: 'My CGPA is completely sabotaged and professors think I lack capability.',
    distressBefore: 80,
    selectedDistortions: ['mind_reading', 'overgeneralization'] as DistortionId[],
    rationalReframe: 'MST is only 25% of the total semester grade. The class median was 13.5. With the end-semester exams and lab evaluations still ahead, I have ample room to secure an A- or B grade.'
  },
  {
    label: '⏳ 75% Attendance Crunch',
    category: 'Attendance' as const,
    situation: 'Webkiosk portal flagged attendance at 72.8% in a 4-credit course.',
    automaticThought: 'I am getting detained, will receive an auxiliary grade, and lose an entire semester.',
    distressBefore: 85,
    selectedDistortions: ['catastrophizing', 'fortune_telling'] as DistortionId[],
    rationalReframe: 'I did the math: attending 6 consecutive upcoming classes brings me safely above 76%. Panic will not help; putting 3 phone alarms and coordinating with wing-mates will.'
  }
];

export const CBTThoughtRecordComponent: React.FC<CBTThoughtRecordProps> = ({
  records,
  onSaveRecord,
  onDeleteRecord
}) => {
  const [isCreating, setIsCreating] = useState(false);
  type CBTStep = 1 | 2 | 3;
  const [currentStep, setCurrentStep] = useState<CBTStep>(1);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  // Form State
  const [category, setCategory] = useState<CBTThoughtRecord['category']>('Placements');
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [emotion, setEmotion] = useState('Anxious');
  const [distressBefore, setDistressBefore] = useState(80);
  const [selectedDistortions, setSelectedDistortions] = useState<DistortionId[]>([]);
  const [distortionReflection, setDistortionReflection] = useState('');
  const [rationalReframe, setRationalReframe] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [distressAfter, setDistressAfter] = useState(35);

  const resetForm = () => {
    setCurrentStep(1);
    setCategory('Placements');
    setSituation('');
    setAutomaticThought('');
    setEmotion('Anxious');
    setDistressBefore(80);
    setSelectedDistortions([]);
    setDistortionReflection('');
    setRationalReframe('');
    setActionPlan('');
    setDistressAfter(35);
    setIsCreating(false);
  };

  const handleApplyTemplate = (tmpl: typeof TIET_TEMPLATES[0]) => {
    setCategory(tmpl.category);
    setSituation(tmpl.situation);
    setAutomaticThought(tmpl.automaticThought);
    setDistressBefore(tmpl.distressBefore);
    setSelectedDistortions(tmpl.selectedDistortions);
    setRationalReframe(tmpl.rationalReframe);
  };

  const toggleDistortion = (id: DistortionId) => {
    if (selectedDistortions.includes(id)) {
      setSelectedDistortions(selectedDistortions.filter((d) => d !== id));
    } else {
      setSelectedDistortions([...selectedDistortions, id]);
    }
  };

  const handleFinishReframe = () => {
    if (!situation.trim() || !automaticThought.trim() || !rationalReframe.trim()) {
      alert('Please fill in the situation, automatic thought, and rational reframe.');
      return;
    }

    const reliefDelta = Math.max(0, distressBefore - distressAfter);

    const newRecord: CBTThoughtRecord = {
      id: 'cbt-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category,
      situation,
      automaticThought,
      emotion,
      distressBefore,
      selectedDistortions,
      distortionReflection,
      rationalReframe,
      actionPlan,
      distressAfter,
      reliefDelta
    };

    onSaveRecord(newRecord);

    // Fire Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#5E9E74', '#D97858', '#E6C687', '#3C664C']
      });
    } catch {
      // safe fallback
    }

    resetForm();
  };

  const filteredRecords = filterCategory === 'All'
    ? records
    : records.filter((r) => r.category === filterCategory);

  return (
    <div className="space-y-8">
      {/* Header and Call to Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#ECE5D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#577D62] tracking-wider uppercase mb-1">
            <Sparkle className="w-3.5 h-3.5" />
            Evidence-Based Cognitive Restructuring
          </div>
          <h2 className="text-2xl font-bold text-[#222E25]">3-Step CBT Thought Record</h2>
          <p className="text-sm text-[#5D6F62] max-w-2xl mt-0.5">
            Break the spiral of placement anxiety, academic dread, and self-doubt. Uncover mental distortions and forge rational, compassionate counter-thoughts.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#527C60] hover:bg-[#41644D] text-white font-medium text-sm transition shadow-sm cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Thought Record
          </button>
        )}
      </div>

      {/* Creation Wizard */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border-2 border-[#D8E6DC] p-6 sm:p-8 shadow-md"
          >
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#EBE5DB] pb-6 mb-6">
              <div className="flex items-center gap-3 sm:gap-6 w-full max-w-xl">
                {[
                  { step: 1, title: '1. What Happened?' },
                  { step: 2, title: '2. Catch Distortions' },
                  { step: 3, title: '3. Rational Reframe' }
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`flex items-center gap-2 cursor-pointer transition ${
                      currentStep === s.step
                        ? 'text-[#3D664B] font-bold'
                        : currentStep > s.step
                        ? 'text-[#64846F]'
                        : 'text-[#A0AFA4]'
                    }`}
                    onClick={() => setCurrentStep(s.step as CBTStep)}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep === s.step
                          ? 'bg-[#527C60] text-white shadow-xs'
                          : currentStep > s.step
                          ? 'bg-[#E0EFE5] text-[#3D664B]'
                          : 'bg-[#EAE6DF] text-[#787E7A]'
                      }`}
                    >
                      {currentStep > s.step ? '✓' : s.step}
                    </span>
                    <span className="hidden sm:inline text-xs sm:text-sm">{s.title}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={resetForm}
                className="text-xs text-[#87968B] hover:text-[#333E35] px-3 py-1.5 rounded-lg border border-[#E0D9CD] hover:bg-[#F7F4EE] transition"
              >
                Cancel
              </button>
            </div>

            {/* Step 1: What Happened? */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Presets Bar */}
                <div className="p-3.5 bg-[#FAF7F0] border border-[#E9E2D4] rounded-xl">
                  <div className="text-xs font-semibold text-[#665D4F] mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-[#B27838]" />
                    Quick Student Scenarios (Click to Pre-fill):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TIET_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.label}
                        type="button"
                        onClick={() => handleApplyTemplate(tmpl)}
                        className="text-xs bg-white hover:bg-[#F2EDE2] border border-[#DDD4C5] text-[#4F4638] px-3 py-1.5 rounded-lg transition text-left cursor-pointer"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                      Campus Context / Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CBTThoughtRecord['category'])}
                      className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl px-3.5 py-2 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                    >
                      <option value="Placements">Placements & Hiring Rounds</option>
                      <option value="Academics">Academics, MSTs & ESTs</option>
                      <option value="Attendance">Attendance (75% Criteria)</option>
                      <option value="Financial/Fees">Fee Burden & Family Expectations</option>
                      <option value="Hostel/Social">Hostel Life, Wingmates & Isolation</option>
                      <option value="Personal">Personal & Well-being</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                      Dominant Emotion
                    </label>
                    <input
                      type="text"
                      value={emotion}
                      onChange={(e) => setEmotion(e.target.value)}
                      placeholder="e.g., Panicked, Paralyzed, Ashamed, Inadequate"
                      className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl px-3.5 py-2 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                    The Triggering Event (What actually happened?)
                  </label>
                  <textarea
                    rows={2}
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder="Stick to objective facts, e.g., 'Received an email stating I did not qualify for Round 2 technical interview.'"
                    className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl p-3 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                    Automatic Negative Thought (What did your brain whisper?)
                  </label>
                  <textarea
                    rows={3}
                    value={automaticThought}
                    onChange={(e) => setAutomaticThought(e.target.value)}
                    placeholder="e.g., 'I am never getting placed. Everyone in my hostel wing is smarter. My parents spent 30 Lakhs on me for nothing.'"
                    className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl p-3 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                  />
                </div>

                {/* Distress Slider */}
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E9E1D2]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5B5041] uppercase tracking-wider">
                      Initial Distress Level:
                    </span>
                    <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                      distressBefore >= 75 ? 'bg-red-100 text-red-800' : distressBefore >= 45 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {distressBefore}% — {distressBefore >= 75 ? 'Acute Anxiety' : distressBefore >= 45 ? 'Moderate Strain' : 'Manageable'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={distressBefore}
                    onChange={(e) => setDistressBefore(Number(e.target.value))}
                    className="w-full accent-[#CB5936] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#8C7D6B] mt-1">
                    <span>Mild Discomfort (10%)</span>
                    <span>Heavy Pressure (50%)</span>
                    <span>Paralyzing Spiral (100%)</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      if (!situation.trim() || !automaticThought.trim()) {
                        alert('Please fill out the triggering situation and automatic thought.');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#527C60] hover:bg-[#41644D] text-white font-medium text-sm transition cursor-pointer"
                  >
                    Next: Identify Distortions
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Identify Cognitive Distortions */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-base font-bold text-[#2A372E]">
                    Step 2: Unmask Your Cognitive Traps
                  </h3>
                  <p className="text-xs text-[#627567] mt-0.5">
                    Our minds use mental shortcuts under stress. Select which thinking errors match your automatic thought:
                  </p>
                </div>

                {/* Selected thought reminder */}
                <div className="p-3 bg-[#F4F8F5] border border-[#CFDFD4] rounded-xl text-xs text-[#2A4935] flex items-start gap-2">
                  <span className="font-bold shrink-0">Your Thought:</span>
                  <span className="italic">“{automaticThought}”</span>
                </div>

                {/* Distortion Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {COGNITIVE_DISTORTIONS.map((d) => {
                    const isSelected = selectedDistortions.includes(d.id);
                    return (
                      <div
                        key={d.id}
                        onClick={() => toggleDistortion(d.id)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#F2F7F4] border-[#527C60] shadow-xs'
                            : 'bg-[#FAF9F6] border-[#E8E2D6] hover:border-[#CBDCD1]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              {DISTORTION_ICONS[d.id] || <Brain className="w-4 h-4 text-emerald-600" />}
                              <span className="font-bold text-xs text-[#263529]">{d.name}</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // handled by parent div
                              className="accent-[#527C60] rounded w-4 h-4"
                            />
                          </div>

                          <p className="text-[11px] font-medium text-[#7D7060] mb-1.5">{d.tagline}</p>
                          <p className="text-xs text-[#4F5E53] leading-relaxed mb-2">{d.description}</p>
                        </div>

                        <div className="pt-2 border-t border-[#EAE3D6] text-[11px]">
                          <span className="font-semibold text-[#8B4E36]">TIET Example: </span>
                          <span className="text-[#645B4E] italic">{d.tietExample}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Antidote Exploration */}
                {selectedDistortions.length > 0 && (
                  <div className="bg-[#FAF6EC] border border-[#E9DFCE] rounded-xl p-4">
                    <h4 className="text-xs font-bold text-[#6D5432] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-[#B87D39]" />
                      Antidote Questions for Selected Distortions:
                    </h4>
                    <ul className="space-y-2 text-xs text-[#524637]">
                      {selectedDistortions.map((id) => {
                        const dist = COGNITIVE_DISTORTIONS.find((d) => d.id === id);
                        if (!dist) return null;
                        return (
                          <li key={id} className="flex items-start gap-2">
                            <span className="text-[#B87D39] font-bold shrink-0">•</span>
                            <div>
                              <strong className="text-[#3F362A]">{dist.name}:</strong> {dist.antidoteQuestion}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                    What does spotting these distortions reveal to you? (Optional reflection)
                  </label>
                  <input
                    type="text"
                    value={distortionReflection}
                    onChange={(e) => setDistortionReflection(e.target.value)}
                    placeholder="e.g., 'I realized I am catastrophizing 1 test into an entire unplaced future.'"
                    className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl px-3.5 py-2 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D5CDC1] bg-white hover:bg-[#F6F3ED] text-[#443D32] text-sm font-medium transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (selectedDistortions.length === 0) {
                        alert('Please pick at least one cognitive distortion to reframe.');
                        return;
                      }
                      setCurrentStep(3);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#527C60] hover:bg-[#41644D] text-white font-medium text-sm transition cursor-pointer"
                  >
                    Next: Rational Reframe
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Rational Reframe */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-base font-bold text-[#2A372E]">
                    Step 3: Construct Your Rational Reframe
                  </h3>
                  <p className="text-xs text-[#627567] mt-0.5">
                    Replace the distorted thought with an evidence-based, compassionate, and realistic perspective.
                  </p>
                </div>

                {/* Context comparison pill */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#FDF2F0] border border-[#F2D4CE] rounded-xl text-xs">
                    <span className="font-bold text-[#A63A23] block mb-1">Old Automatic Thought:</span>
                    <p className="text-[#64281B] italic">“{automaticThought}”</p>
                  </div>
                  <div className="p-3 bg-[#F2F7F4] border border-[#CDE1D4] rounded-xl text-xs">
                    <span className="font-bold text-[#2A5C3C] block mb-1">Identified Traps:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedDistortions.map((id) => (
                        <span key={id} className="bg-white px-2 py-0.5 rounded-md text-[10px] font-semibold text-[#3D664B] border border-[#BBD4C4]">
                          {COGNITIVE_DISTORTIONS.find((d) => d.id === id)?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guided Reframe Input */}
                <div>
                  <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Balanced Rational Reframe</span>
                    <span className="text-[#7F9485] font-normal normal-case">What would you tell a friend facing this?</span>
                  </label>
                  <textarea
                    rows={3}
                    value={rationalReframe}
                    onChange={(e) => setRationalReframe(e.target.value)}
                    placeholder="e.g., 'Rejections are standard variance in tech hiring. I solved 2 out of 3 problems correctly. That proves my algorithmic skills work under pressure. Hundreds of campus drives happen through March.'"
                    className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl p-3 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                  />
                </div>

                {/* Micro Action Plan */}
                <div>
                  <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                    Concrete Micro-Action (Next 24 Hours)
                  </label>
                  <input
                    type="text"
                    value={actionPlan}
                    onChange={(e) => setActionPlan(e.target.value)}
                    placeholder="e.g., 'Solve 2 LeetCode graph traversal problems and sleep for 7 hours tonight.'"
                    className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl px-3.5 py-2 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
                  />
                </div>

                {/* Post-Reframe Distress Slider */}
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E9E1D2]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[#5B5041] uppercase tracking-wider">
                      Distress Level After Reframe:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#7B8B7F]">
                        Before: <strong className="text-red-700">{distressBefore}%</strong>
                      </span>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        After: {distressAfter}% (-{Math.max(0, distressBefore - distressAfter)}% Relief!)
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={distressAfter}
                    onChange={(e) => setDistressAfter(Number(e.target.value))}
                    className="w-full accent-[#527C60] cursor-pointer"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D5CDC1] bg-white hover:bg-[#F6F3ED] text-[#443D32] text-sm font-medium transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleFinishReframe}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#527C60] hover:bg-[#41644D] text-white font-semibold text-sm transition shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Lock Reframe & Celebrate Relief
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thought Records History & Insights */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E1D5]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#527C60]" />
            <h3 className="text-lg font-bold text-[#243026]">Your Thought Records Library</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E5F0E8] text-[#336142]">
              {records.length} reframed
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['All', 'Placements', 'Academics', 'Attendance', 'Financial/Fees', 'Hostel/Social'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg border transition whitespace-nowrap cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#527C60] text-white border-[#527C60] font-semibold'
                    : 'bg-white text-[#56685B] border-[#DDD5C7] hover:bg-[#F7F4EE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of cards */}
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-[#D6CDBC]">
            <Brain className="w-10 h-10 text-[#A2B5A8] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#48574C]">No thought records in this category yet</p>
            <p className="text-xs text-[#7B8B7F] mt-1">
              Click “New Thought Record” above to restructure an anxious automatic thought.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredRecords.map((record) => {
              const isExpanded = expandedRecordId === record.id;
              const dateFormatted = new Date(record.createdAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={record.id}
                  className="bg-white rounded-2xl border border-[#E6E0D4] p-5 shadow-xs hover:border-[#CBDCD1] transition space-y-3"
                >
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF3EE] text-[#93472C] border border-[#F0DACE]">
                        {record.category}
                      </span>
                      <span className="text-xs text-[#7F8F83] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dateFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#EDF7F0] text-[#2F6D44] border border-[#C6E6D1]">
                        ↓ {record.reliefDelta}% Distress Drop
                      </span>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="p-1 text-[#A0AEA4] hover:text-red-600 transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Situation & Automatic thought */}
                  <div>
                    <h4 className="text-sm font-bold text-[#233127]">{record.situation}</h4>
                    <p className="text-xs text-[#844431] bg-[#FAF5F2] p-2.5 rounded-xl border border-[#F3E2DA] mt-2 italic">
                      “{record.automaticThought}”
                    </p>
                  </div>

                  {/* Identified Distortions */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-semibold text-[#6A7B6F] flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Distortions:
                    </span>
                    {record.selectedDistortions.map((id) => (
                      <span
                        key={id}
                        className="text-[11px] bg-[#F1EFEA] text-[#473E31] px-2 py-0.5 rounded-md font-medium"
                      >
                        {COGNITIVE_DISTORTIONS.find((d) => d.id === id)?.name || id}
                      </span>
                    ))}
                  </div>

                  {/* Reframe Box */}
                  <div className="p-3.5 bg-[#F4F9F6] border border-[#CDE4D6] rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-[#2A5C3C] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#3C8255]" />
                      Rational Reframe:
                    </div>
                    <p className="text-xs sm:text-sm text-[#274431] leading-relaxed">
                      {record.rationalReframe}
                    </p>
                    {record.actionPlan && (
                      <div className="pt-2 border-t border-[#D9ECE0] text-xs text-[#396347] flex items-center gap-1.5">
                        <ArrowDownRight className="w-3.5 h-3.5 text-[#3C8255]" />
                        <strong>Micro-Step:</strong> {record.actionPlan}
                      </div>
                    )}
                  </div>

                  {/* Expand toggle */}
                  <div className="flex justify-between items-center pt-1 text-xs text-[#7B8B7F]">
                    <span>
                      Distress: <strong className="text-red-700">{record.distressBefore}%</strong> →{' '}
                      <strong className="text-green-700">{record.distressAfter}%</strong>
                    </span>
                    <button
                      onClick={() => setExpandedRecordId(isExpanded ? null : record.id)}
                      className="text-[#4E765C] hover:underline font-medium"
                    >
                      {isExpanded ? 'Show less' : 'View full reflection'}
                    </button>
                  </div>

                  {isExpanded && record.distortionReflection && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#E9E3D6] rounded-xl text-xs text-[#5C5346] mt-2 animate-in fade-in">
                      <strong className="block font-semibold text-[#3D362B] mb-0.5">Distortion Reflection:</strong>
                      {record.distortionReflection}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
