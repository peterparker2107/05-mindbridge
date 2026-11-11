import type { CognitiveDistortion, CBTThoughtRecord, MoodEntry, CrisisContact } from '../types/cbt';

export const COGNITIVE_DISTORTIONS: CognitiveDistortion[] = [
  {
    id: 'catastrophizing',
    name: 'Catastrophizing',
    tagline: 'Expecting the worst-case scenario',
    description: 'Blowing negative outcomes drastically out of proportion and assuming an inevitable domino effect of disaster.',
    tietExample: '"I didn\'t clear round 1 OA for Microsoft. I will remain unplaced, my ₹30 Lakh degree is squandered, and I will be a burden forever."',
    antidoteQuestion: 'Even if the worst happened, would it realistically end my entire future? What is the most realistic middle ground?',
    iconName: 'Flame'
  },
  {
    id: 'all_or_nothing',
    name: 'All-or-Nothing Thinking',
    tagline: 'Black-and-white, zero or hundred',
    description: 'Viewing situations in polarized categories: absolute perfection or total failure, with zero recognition of nuanced progress.',
    tietExample: '"If my CGPA dips below 8.5 in 5th semester, all my past hard work is completely invalidated."',
    antidoteQuestion: 'Can I find an 80/20 balance? Is someone with an 8.2 CGPA incapable of doing extraordinary engineering?',
    iconName: 'Split'
  },
  {
    id: 'fortune_telling',
    name: 'Fortune Telling',
    tagline: 'Predicting a negative future as certainty',
    description: 'Treating catastrophic future predictions as established facts before events have even unfolded.',
    tietExample: '"I know for certain tomorrow\'s Operating Systems MST will be absurdly hard and I am going to blank out and fail."',
    antidoteQuestion: 'Do I possess a magical crystal ball? What evidence do I have that my preparation won\'t help me at all?',
    iconName: 'Sparkles'
  },
  {
    id: 'overgeneralization',
    name: 'Overgeneralization',
    tagline: 'One failure equals a permanent pattern',
    description: 'Taking a single negative data point and expanding it into a permanent rule of defeat using words like "always" or "never".',
    tietExample: '"I stumbled in this one DSA mock interview on Dynamic Programming; that proves I can never clear any tech interview."',
    antidoteQuestion: 'Is this one isolated instance or an unalterable universal law? Does one flawed attempt define my permanent ceiling?',
    iconName: 'Repeat'
  },
  {
    id: 'mind_reading',
    name: 'Mind Reading',
    tagline: 'Assuming others think poorly of you',
    description: 'Convinced you know what others are thinking negatively about you without any explicit verification.',
    tietExample: '"The professor paused and frowned when I asked a doubt during lecture; everyone in LT-101 thinks I am foolish."',
    antidoteQuestion: 'Did anyone actually say that? Could the professor have just been tired or thinking through the derivation?',
    iconName: 'Brain'
  },
  {
    id: 'emotional_reasoning',
    name: 'Emotional Reasoning',
    tagline: 'Feeling it must make it true',
    description: 'Treating raw emotional anxiety as objective physical proof of actual external reality ("I feel like an imposter, therefore I am one").',
    tietExample: '"I have a knot of dread in my stomach right now before visiting the Placement Cell, so bad news is definitely coming."',
    antidoteQuestion: 'Are my feelings objective facts or temporary neurochemical responses to stress?',
    iconName: 'HeartPulse'
  },
  {
    id: 'mental_filter',
    name: 'Mental Filter',
    tagline: 'Fixating on the single negative detail',
    description: 'Dwell exclusively on one criticism or flaw while systematically discounting a sea of positive feedback and achievements.',
    tietExample: '"I scored 24/25 in the Capstone evaluation, but the mentor pointed out one formatting nitpick and now I feel worthless."',
    antidoteQuestion: 'Am I zooming in with a microscope on one pixel while ignoring the entire beautiful painting?',
    iconName: 'Filter'
  },
  {
    id: 'should_statements',
    name: '“Should” & “Must” Traps',
    tagline: 'Punishing expectations and self-berating rules',
    description: 'Holding yourself to rigid, perfectionist standards that induce guilt, shame, and burnout when reality deviates.',
    tietExample: '"I should be solving 5 LeetCode problems every single night like the Day-0 placement seniors, I have no right to rest."',
    antidoteQuestion: 'Who authored this arbitrary rule? Would I ever demand this uncompromising harshness from my best friend in hostel?',
    iconName: 'AlertCircle'
  },
  {
    id: 'personalization',
    name: 'Personalization & Blame',
    tagline: 'Taking sole blame for collective setbacks',
    description: 'Assuming unilateral responsibility for negative outcomes that were influenced by external market factors or group dynamics.',
    tietExample: '"Our team capstone project got downgraded on the deadline; it is entirely my personal fault even though others delayed their modules."',
    antidoteQuestion: 'What other external variables and systemic conditions contributed to this outcome?',
    iconName: 'UserCheck'
  }
];

export const INITIAL_CBT_RECORDS: CBTThoughtRecord[] = [
  {
    id: 'tiet-rec-1',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    category: 'Placements',
    situation: 'Rejected from Day-1 On-Campus Placement OA round after clearing 2 out of 3 algorithmic problems.',
    automaticThought: 'I am completely inadequate. My family invested ₹30L into my TIET degree and I will end up without any placement offer.',
    emotion: 'Devastated, Panic, Ashamed',
    distressBefore: 90,
    selectedDistortions: ['catastrophizing', 'all_or_nothing', 'fortune_telling'],
    distortionReflection: 'I jumped straight from one OA round to an apocalyptic future where I never get a job. Tech hiring has high variance and hundreds of companies visit campus until March.',
    rationalReframe: 'Missing 1 out of 3 edge cases in a 60-minute test is standard variance in tech hiring, not a verdict on my worth. I solved 2 hard questions cleanly and identified graph recursion as my one review area. Over 180 companies will visit TIET through the placement season.',
    actionPlan: 'Review Graph BFS/DFS patterns tonight; mock interview with roommate on Friday.',
    distressAfter: 35,
    reliefDelta: 55
  },
  {
    id: 'tiet-rec-2',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    category: 'Academics',
    situation: 'Scored 14/25 in Mid-Semester Test (MST) for Computer Networks.',
    automaticThought: 'My CGPA is going to collapse. All the faculty know I am falling behind in this semester.',
    emotion: 'Anxious, Overwhelmed',
    distressBefore: 75,
    selectedDistortions: ['mind_reading', 'overgeneralization'],
    distortionReflection: 'The class average was 13.8 due to tricky subnetting questions. Faculty don\'t sit around judging my character over one test.',
    rationalReframe: 'MST accounts for only 25% of the total grade. The class average was 13.8, so I am right on track with the curve. There is still 50% weightage in EST and 25% in lab evaluations where I typically excel.',
    actionPlan: 'Schedule a 20-minute doubt session with the teaching assistant on Thursday.',
    distressAfter: 30,
    reliefDelta: 45
  },
  {
    id: 'tiet-rec-3',
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    category: 'Attendance',
    situation: 'Webkiosk attendance showed 73.5% in DBMS with 3 weeks remaining.',
    automaticThought: 'I am going to get detained from the final exam and lose an entire semester credit.',
    emotion: 'Frustrated, Panicked',
    distressBefore: 85,
    selectedDistortions: ['catastrophizing', 'fortune_telling'],
    distortionReflection: 'I panicked without calculating the exact math. I only need to attend 5 out of the next 7 classes to cross the 75% threshold.',
    rationalReframe: '73.5% is easily recoverable. If I attend all DBMS lectures for the next 2 weeks without skipping, my attendance climbs to 77.2%. I also have medical certificate provisions if genuine illness occurred.',
    actionPlan: 'Set 7:30 AM alarms and coordinate with hostel wing-mates to walk to LP class together.',
    distressAfter: 25,
    reliefDelta: 60
  }
];

export const INITIAL_MOOD_HISTORY: MoodEntry[] = [
  {
    id: 'mood-1',
    timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
    dateStr: new Date(Date.now() - 86400000 * 6).toISOString().split('T')[0],
    mood: 'Overwhelmed',
    score: 1,
    trigger: 'Placements',
    note: 'Back-to-back OA assessments scheduled on Sunday evening. Feeling drained.'
  },
  {
    id: 'mood-2',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    dateStr: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    mood: 'Anxious',
    score: 2,
    trigger: 'Academics & MSTs',
    note: 'Revision for Computer Networks test. Struggling to memorize OSI layers.'
  },
  {
    id: 'mood-3',
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
    dateStr: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    mood: 'Neutral',
    score: 3,
    trigger: 'Hostel & Social',
    note: 'Evening chai session at Cos Garden with hostel friends gave some breathing room.'
  },
  {
    id: 'mood-4',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    dateStr: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    mood: 'Overwhelmed',
    score: 1,
    trigger: 'Fee Burden & Career',
    note: 'Family called asking about placement package rumors. Heavy chest feeling.'
  },
  {
    id: 'mood-5',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    dateStr: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    mood: 'Relieved',
    score: 4,
    trigger: 'Placements',
    note: 'Completed a CBT thought reframe on OA rejection. Clearer perspective.'
  },
  {
    id: 'mood-6',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
    dateStr: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    mood: 'Neutral',
    score: 3,
    trigger: 'Attendance 75%',
    note: 'Attended all morning lectures in LT block. Attendance metric stabilizing.'
  },
  {
    id: 'mood-7',
    timestamp: new Date().toISOString(),
    dateStr: new Date().toISOString().split('T')[0],
    mood: 'Confident',
    score: 5,
    trigger: 'General',
    note: 'Did 10 minutes of 4-7-8 breathing and resolved 2 LeetCode problems calmly.'
  }
];

export const CRISIS_CONTACTS: CrisisContact[] = [
  {
    name: 'TIET Campus Health Center & Counseling',
    number: '01752393000',
    displayNumber: '0175-2393000 / Ext 2345',
    availability: '24x7 Emergency / 9 AM - 5 PM OPD',
    type: 'campus',
    description: 'On-campus doctors, emergency medical attendants, and confidential student wellness counselors.'
  },
  {
    name: 'iCall Psychosocial Helpline (TISS)',
    number: '9152987821',
    displayNumber: '9152987821',
    availability: 'Mon - Sat: 8:00 AM - 10:00 PM',
    type: 'national',
    description: 'Free, confidential, empathetic telephonic psychological support run by Tata Institute of Social Sciences.'
  },
  {
    name: 'Vandrevala Foundation for Mental Health',
    number: '9999666555',
    displayNumber: '9999 666 555',
    availability: '24x7 / 365 Days Free',
    type: 'crisis',
    description: 'Pan-India free crisis helpline with experienced clinical psychologists and counselors.'
  },
  {
    name: 'Tele-MANAS (Govt of India Helpline)',
    number: '14416',
    displayNumber: '14416 / 1800 891 4416',
    availability: '24x7 Toll-Free National Service',
    type: 'crisis',
    description: 'National Tele Mental Health Programme of India in multiple regional languages (English, Hindi, Punjabi).'
  },
  {
    name: 'AASRA Crisis Intervention',
    number: '9820466726',
    displayNumber: '+91 98204 66726',
    availability: '24x7 Volunteer Support',
    type: 'crisis',
    description: 'Non-judgmental, confidential emotional support for individuals experiencing deep distress or crisis.'
  }
];

/**
 * Clean Web Audio chime sound generator (100% client-side, zero audio assets needed)
 */
export function playGentleChime(frequency = 528, duration = 1.2, type: OscillatorType = 'sine') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    // Frequency decay for warm harmonic feel
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.98, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio autoplay restrictions gracefully
  }
}
