export type MoodType = 'Overwhelmed' | 'Anxious' | 'Neutral' | 'Relieved' | 'Confident';

export interface MoodEntry {
  id: string;
  timestamp: string;
  dateStr: string; // YYYY-MM-DD
  mood: MoodType;
  score: number; // 1 to 5
  trigger: 'Placements' | 'Academics & MSTs' | 'Fee Burden & Career' | 'Hostel & Social' | 'Attendance 75%' | 'Health & Sleep' | 'General';
  note: string;
}

export type DistortionId =
  | 'catastrophizing'
  | 'all_or_nothing'
  | 'fortune_telling'
  | 'overgeneralization'
  | 'emotional_reasoning'
  | 'mental_filter'
  | 'mind_reading'
  | 'should_statements'
  | 'personalization';

export interface CognitiveDistortion {
  id: DistortionId;
  name: string;
  tagline: string;
  description: string;
  tietExample: string;
  antidoteQuestion: string;
  iconName: string;
}

export interface CBTThoughtRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: 'Placements' | 'Academics' | 'Hostel/Social' | 'Financial/Fees' | 'Attendance' | 'Personal';
  
  // Step 1: What happened?
  situation: string; // The event or trigger
  automaticThought: string; // "I'm going to end up unplaced and disappoint everyone"
  emotion: string; // e.g., "Panicked", "Ashamed", "Despairing"
  distressBefore: number; // 0 - 100%

  // Step 2: Cognitive Distortions
  selectedDistortions: DistortionId[];
  distortionReflection?: string;

  // Step 3: Rational Reframe
  rationalReframe: string; // Balanced replacement thought
  actionPlan?: string; // Next small concrete step (e.g. solve 2 LeetCode strings problems)
  distressAfter: number; // 0 - 100%
  reliefDelta: number; // distressBefore - distressAfter
}

export interface CrisisContact {
  name: string;
  number: string;
  displayNumber: string;
  availability: string;
  type: 'campus' | 'national' | 'crisis';
  description: string;
}
