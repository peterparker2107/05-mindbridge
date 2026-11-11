import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  PlusCircle,
  Calendar,
  Sparkles,
  BarChart2,
  AlertTriangle
} from 'lucide-react';
import type { MoodEntry, MoodType } from '../types/cbt';

interface MoodTimelineProps {
  entries: MoodEntry[];
  onAddEntry: (entry: MoodEntry) => void;
  onDeleteEntry: (id: string) => void;
}

const MOOD_CONFIG: Record<
  MoodType,
  { score: number; label: string; emoji: string; color: string; badgeBg: string }
> = {
  Overwhelmed: { score: 1, label: 'Overwhelmed', emoji: '🌪️', color: '#B34A29', badgeBg: '#FDF0EC' },
  Anxious: { score: 2, label: 'Anxious', emoji: '⚡', color: '#D47E3B', badgeBg: '#FEF6EE' },
  Neutral: { score: 3, label: 'Neutral', emoji: '🍃', color: '#828E82', badgeBg: '#F3F5F3' },
  Relieved: { score: 4, label: 'Relieved', emoji: '🌤️', color: '#578B68', badgeBg: '#EFF7F2' },
  Confident: { score: 5, label: 'Confident', emoji: '✨', color: '#387850', badgeBg: '#E7F5EC' }
};

const MOOD_Y_TICKS = [
  { val: 1, label: 'Overwhelmed' },
  { val: 2, label: 'Anxious' },
  { val: 3, label: 'Neutral' },
  { val: 4, label: 'Relieved' },
  { val: 5, label: 'Confident' }
];

export const MoodTimeline: React.FC<MoodTimelineProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry
}) => {
  const [isLogging, setIsLogging] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>('Neutral');
  const [trigger, setTrigger] = useState<MoodEntry['trigger']>('Placements');
  const [note, setNote] = useState('');

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const chartData = sortedEntries.map((e) => ({
    id: e.id,
    date: new Date(e.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    score: e.score,
    mood: e.mood,
    trigger: e.trigger,
    note: e.note,
    fullTime: new Date(e.timestamp).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }));

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: MoodEntry = {
      id: 'mood-' + Date.now(),
      timestamp: new Date().toISOString(),
      dateStr: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      score: MOOD_CONFIG[selectedMood].score,
      trigger,
      note: note.trim() || `Checked in as ${selectedMood}`
    };

    onAddEntry(newEntry);
    setNote('');
    setIsLogging(false);
  };

  // Metrics computation
  const avgScore =
    entries.length > 0
      ? (entries.reduce((acc, curr) => acc + curr.score, 0) / entries.length).toFixed(1)
      : '3.0';

  // Stress trigger breakdown
  const triggerCounts: Record<string, number> = {};
  entries.forEach((entry) => {
    triggerCounts[entry.trigger] = (triggerCounts[entry.trigger] || 0) + 1;
  });
  const topTrigger = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Placements';

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#ECE5D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#577D62] tracking-wider uppercase mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Emotional Trajectory & Longitudinal Well-being
          </div>
          <h2 className="text-2xl font-bold text-[#222E25]">Mood Journey Timeline</h2>
          <p className="text-sm text-[#5D6F62] max-w-2xl mt-0.5">
            Visualize your emotional wave across the semester. Spot how exam schedules, placement interview cycles, and hostel dynamics influence your baseline.
          </p>
        </div>

        {!isLogging && (
          <button
            onClick={() => setIsLogging(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#527C60] hover:bg-[#41644D] text-white font-medium text-sm transition shadow-sm cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Log Mood Check-in
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E7E1D4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3ED] text-[#396947] flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#7B8B7E] font-medium">Average Well-being Score</div>
            <div className="text-xl font-bold text-[#233127]">
              {avgScore} <span className="text-xs text-[#6F7F72] font-normal">/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7E1D4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FBF0EB] text-[#B34A29] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#7B8B7E] font-medium">Top Campus Pressure</div>
            <div className="text-base font-bold text-[#233127] truncate max-w-[180px]">
              {topTrigger}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E7E1D4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F8F3EA] text-[#9A7032] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#7B8B7E] font-medium">Check-ins Logged</div>
            <div className="text-xl font-bold text-[#233127]">{entries.length} reflections</div>
          </div>
        </div>
      </div>

      {/* Inline Logging Form */}
      {isLogging && (
        <form
          onSubmit={handleSaveEntry}
          className="bg-white p-6 rounded-2xl border-2 border-[#D8E6DC] shadow-md space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE2]">
            <h3 className="font-bold text-base text-[#243026]">How are you feeling right now?</h3>
            <button
              type="button"
              onClick={() => setIsLogging(false)}
              className="text-xs text-[#808F83] hover:text-[#233127]"
            >
              Cancel
            </button>
          </div>

          {/* Mood Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {(Object.keys(MOOD_CONFIG) as MoodType[]).map((moodKey) => {
              const cfg = MOOD_CONFIG[moodKey];
              const isSelected = selectedMood === moodKey;
              return (
                <button
                  key={moodKey}
                  type="button"
                  onClick={() => setSelectedMood(moodKey)}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    isSelected
                      ? 'border-[#527C60] bg-[#F1F8F4] text-[#243F2E] font-bold shadow-xs'
                      : 'border-[#EAE3D6] bg-[#FAF8F5] text-[#556458] hover:border-[#CBDCD1]'
                  }`}
                >
                  <span className="text-2xl">{cfg.emoji}</span>
                  <span className="text-xs">{cfg.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                Primary Trigger / Campus Arena
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value as MoodEntry['trigger'])}
                className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl px-3.5 py-2 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
              >
                <option value="Placements">Placements & Hiring Drives</option>
                <option value="Academics & MSTs">Academics, MSTs & CGPA</option>
                <option value="Attendance 75%">Attendance (75% Cutoff Pressure)</option>
                <option value="Fee Burden & Career">Fee Burden (₹30L) & Family Aspirations</option>
                <option value="Hostel & Social">Hostel Life & Peer Comparison</option>
                <option value="Health & Sleep">Sleep Deprivation & Health</option>
                <option value="General">General / Routine</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#48574C] uppercase tracking-wider mb-1.5">
                Brief Context / Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Just walked back from library, feeling clearer after coding."
                className="w-full bg-[#FAF9F6] border border-[#DDD6C8] rounded-xl px-3.5 py-2 text-sm text-[#243026] focus:outline-none focus:ring-2 focus:ring-[#527C60]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsLogging(false)}
              className="px-4 py-2 rounded-xl border border-[#D5CDC1] bg-white text-xs font-medium text-[#4B4438] hover:bg-[#F6F3ED]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#527C60] hover:bg-[#41644D] text-white text-xs font-semibold shadow-xs"
            >
              Save Mood Check-in
            </button>
          </div>
        </form>
      )}

      {/* Main Interactive Recharts Line Graph */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE5D8] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#243026]">Timeline Trajectory</h3>
            <p className="text-xs text-[#6C7E71]">
              Scale: 1 (Overwhelmed) → 3 (Neutral) → 5 (Confident)
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#6F7F72]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#527C60]" /> Well-being Line
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-[#CBDCD0]" /> Baseline (Neutral = 3.0)
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE2" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#8A9A8D"
                tick={{ fill: '#728275', fontSize: 11 }}
                dy={8}
              />
              <YAxis
                domain={[0.8, 5.2]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="#8A9A8D"
                tick={{ fill: '#728275', fontSize: 11 }}
                tickFormatter={(val) => {
                  const item = MOOD_Y_TICKS.find((t) => t.val === val);
                  return item ? item.label : '';
                }}
              />
              <ReferenceLine y={3} stroke="#CAD9CF" strokeDasharray="4 4" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const moodCfg = MOOD_CONFIG[data.mood as MoodType];
                    return (
                      <div className="bg-white p-3.5 rounded-xl border border-[#DDD6C8] shadow-lg text-xs space-y-1.5 max-w-xs">
                        <div className="flex items-center justify-between gap-2 border-b border-[#F0EBE3] pb-1">
                          <span className="font-bold text-[#222E25] flex items-center gap-1">
                            <span>{moodCfg?.emoji}</span> {data.mood}
                          </span>
                          <span className="text-[10px] text-[#7E8F81]">{data.fullTime}</span>
                        </div>
                        <div className="text-[11px] text-[#55675A]">
                          <strong className="text-[#36443A]">Trigger:</strong> {data.trigger}
                        </div>
                        {data.note && (
                          <div className="text-[11px] text-[#695D4F] italic bg-[#FAF8F4] p-1.5 rounded-md border border-[#EFEAE0]">
                            “{data.note}”
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#527C60"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: '#FFFFFF',
                  stroke: '#527C60',
                  strokeWidth: 2
                }}
                activeDot={{
                  r: 7,
                  fill: '#CB5936',
                  stroke: '#FFFFFF',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Entries Log */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE5D8] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#243026] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#527C60]" />
          Recent Mood Check-ins
        </h3>

        <div className="divide-y divide-[#F0EBE3]">
          {sortedEntries
            .slice()
            .reverse()
            .map((entry) => {
              const cfg = MOOD_CONFIG[entry.mood];
              return (
                <div key={entry.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-[#FAF9F6] border border-[#EAE3D6]">
                      {cfg.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#233127]">{entry.mood}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#8C5237] border border-[#EFE3D5]">
                          {entry.trigger}
                        </span>
                      </div>
                      <p className="text-xs text-[#5D6F61] mt-0.5">{entry.note}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-[#8B9B8F]">
                      {new Date(entry.timestamp).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-xs text-[#A0AEA4] hover:text-red-600 px-1 py-0.5"
                      title="Delete log"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
