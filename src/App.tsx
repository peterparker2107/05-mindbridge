import { useState, useEffect } from 'react';
import {
  Brain,
  TrendingUp,
  Wind,
  Building2,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';
import type { CBTThoughtRecord, MoodEntry } from './types/cbt';
import { INITIAL_CBT_RECORDS, INITIAL_MOOD_HISTORY } from './lib/cbtData';
import { CrisisBanner } from './components/CrisisBanner';
import { CBTThoughtRecordComponent } from './components/CBTThoughtRecord';
import { MoodTimeline } from './components/MoodTimeline';
import { BreathingExercise } from './components/BreathingExercise';
import { CampusResources } from './components/CampusResources';

type ActiveTab = 'cbt' | 'mood' | 'grounding' | 'campus';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cbt');

  // Theme state: defaults to Light Mode
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('mindbridge_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mindbridge_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load from LocalStorage or seed with TIET initial records
  const [cbtRecords, setCbtRecords] = useState<CBTThoughtRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mindbridge_cbt_records');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CBT_RECORDS;
  });

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem('mindbridge_mood_entries');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MOOD_HISTORY;
  });

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('mindbridge_cbt_records', JSON.stringify(cbtRecords));
    } catch (e) {
      console.error('Failed to save CBT records to localStorage', e);
    }
  }, [cbtRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('mindbridge_mood_entries', JSON.stringify(moodEntries));
    } catch (e) {
      console.error('Failed to save mood entries to localStorage', e);
    }
  }, [moodEntries]);

  // Handlers for CBT Records
  const handleSaveCbtRecord = (record: CBTThoughtRecord) => {
    setCbtRecords((prev) => [record, ...prev]);
  };

  const handleDeleteCbtRecord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this thought record?')) {
      setCbtRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Handlers for Mood Entries
  const handleAddMoodEntry = (entry: MoodEntry) => {
    setMoodEntries((prev) => [...prev, entry]);
  };

  const handleDeleteMoodEntry = (id: string) => {
    setMoodEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Reset to sample TIET demo state
  const handleResetDemoData = () => {
    if (window.confirm('Reset MindBridge data to initial TIET campus demo state?')) {
      setCbtRecords(INITIAL_CBT_RECORDS);
      setMoodEntries(INITIAL_MOOD_HISTORY);
      localStorage.setItem('mindbridge_cbt_records', JSON.stringify(INITIAL_CBT_RECORDS));
      localStorage.setItem('mindbridge_mood_entries', JSON.stringify(INITIAL_MOOD_HISTORY));
    }
  };

  // Derived statistics
  const totalReframes = cbtRecords.length;
  const avgRelief =
    cbtRecords.length > 0
      ? Math.round(
          cbtRecords.reduce((acc, curr) => acc + curr.reliefDelta, 0) / cbtRecords.length
        )
      : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* 1. Permanent Top Crisis Safety Shield */}
      <CrisisBanner />

      {/* 2. Frosted SaaS Companion Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/85 backdrop-blur-md sticky top-0 z-40 shadow-xs transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-xs border border-emerald-700/30">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">MindBridge</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Campus Wellness Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Autonomous CBT Restructuring &amp; Mental Health Companion</p>
            </div>
          </div>

          {/* Quick Metrics Bento Bar & Reset Button */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-4 bg-slate-100/80 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="text-slate-600 dark:text-slate-400">
                Reframes: <strong className="text-slate-900 dark:text-white font-mono font-bold">{totalReframes}</strong>
              </div>
              <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="text-slate-600 dark:text-slate-400">
                Avg Relief: <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">↓ {avgRelief}%</strong>
              </div>
            </div>

            <button
              onClick={handleResetDemoData}
              title="Reset sample demo data"
              className="text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-700 transition shadow-xs cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-xs"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-sm border-t border-slate-200/60 dark:border-slate-800 pt-1">
          {[
            {
              id: 'cbt',
              label: '3-Step CBT Journal',
              icon: <Brain className="w-4 h-4" />
            },
            {
              id: 'mood',
              label: 'Mood Journey Timeline',
              icon: <TrendingUp className="w-4 h-4" />
            },
            {
              id: 'grounding',
              label: '4-7-8 Grounding Space',
              icon: <Wind className="w-4 h-4" />
            },
            {
              id: 'campus',
              label: 'Campus Support & Sanctuaries',
              icon: <Building2 className="w-4 h-4" />
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 px-4 py-2.5 font-medium border-b-2 text-xs sm:text-sm transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-800 font-bold bg-emerald-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'cbt' && (
          <CBTThoughtRecordComponent
            records={cbtRecords}
            onSaveRecord={handleSaveCbtRecord}
            onDeleteRecord={handleDeleteCbtRecord}
          />
        )}

        {activeTab === 'mood' && (
          <MoodTimeline
            entries={moodEntries}
            onAddEntry={handleAddMoodEntry}
            onDeleteEntry={handleDeleteMoodEntry}
          />
        )}

        {activeTab === 'grounding' && <BreathingExercise />}

        {activeTab === 'campus' && <CampusResources />}
      </main>

      {/* Footer & Compassionate Campus Disclaimer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3 mt-12 transition-colors duration-200">
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="font-semibold text-slate-700">
            🌱 MindBridge — Mental wellness &amp; CBT companion empowering university students navigating academic rigor and career pressures.
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <strong>Peer Self-Reflection Tool Disclaimer:</strong> MindBridge does not replace licensed psychological intervention, emergency medical treatment, or clinical diagnosis. If experiencing suicidal crisis or acute harm, immediately reach out to <strong>Tele-MANAS (14416)</strong>, <strong>iCall (9152987821)</strong>, or visit your campus health dispensary.
          </p>
        </div>
        <div className="pt-2 text-[11px] text-slate-400 font-mono">
          100% Client-Side &amp; Private • Zero API Keys • Data stored strictly in your browser localStorage
        </div>
      </footer>
    </div>
  );
}

export default App;
