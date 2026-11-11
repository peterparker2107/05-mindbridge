import React from 'react';
import {
  Building2,
  Phone,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  BookMarked,
  Info
} from 'lucide-react';

export const CampusResources: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#ECE5D8] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#577D62] tracking-wider uppercase mb-1">
          <Building2 className="w-3.5 h-3.5" />
          TIET Patiala Campus Mental Health Ecosystem
        </div>
        <h2 className="text-2xl font-bold text-[#222E25]">Campus & Peer Support Hub</h2>
        <p className="text-sm text-[#5D6F62] max-w-2xl mt-0.5">
          Break the silence and stigma around seeking emotional support. All consultations at the TIET Health Center are 100% confidential and never appear on academic transcripts or placement records.
        </p>
      </div>

      {/* Campus Health & Wellness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* TIET Health Center */}
        <div className="bg-white rounded-2xl border border-[#E7E0D3] p-6 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EB] text-[#2F6D44] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#243026]">TIET Dispensary & Counseling OPD</h3>
                <p className="text-xs text-[#7B8B7F]">Resident Medical Officers & Clinical Counselors</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#2C6940]">
              On-Campus
            </span>
          </div>

          <p className="text-xs text-[#58685C] leading-relaxed">
            Free consultation for all enrolled Thapar Institute students. Offers general health diagnosis, sleep issue support, anxiety relief medication if prescribed, and psychological counseling sessions.
          </p>

          <div className="space-y-2 text-xs text-[#5D5548] pt-2 border-t border-[#EFEAE2]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#527C60] shrink-0" />
              <span>Location: Opposite Hostel C, adjacent to Guest House road</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#527C60] shrink-0" />
              <span>OPD Hours: 9:00 AM – 1:00 PM & 4:00 PM – 7:00 PM (Emergency 24x7)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#527C60] shrink-0" />
              <span>Direct Campus Ext: <strong>2345</strong> / Phone: <strong>0175-2393000</strong></span>
            </div>
          </div>
        </div>

        {/* Dean of Student Affairs & Mentorship */}
        <div className="bg-white rounded-2xl border border-[#E7E0D3] p-6 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0EB] text-[#B34A29] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#243026]">DoSA & Faculty Advisor Network</h3>
                <p className="text-xs text-[#7B8B7F]">Academic Grievance, Attendance & Medical Leave</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#A63A23]">
              Administration
            </span>
          </div>

          <p className="text-xs text-[#58685C] leading-relaxed">
            Need guidance regarding 75% attendance shortage due to illness, semester deferrals, or fee installment arrangements? The Dean of Student Affairs (DoSA) office provides formal administrative mediation.
          </p>

          <div className="space-y-2 text-xs text-[#5D5548] pt-2 border-t border-[#EFEAE2]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#CB5936] shrink-0" />
              <span>Location: Thapar Administrative Block, 1st Floor</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#CB5936] shrink-0" />
              <span>Meeting Timings: 3:00 PM – 5:00 PM on Working Days</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CB5936] shrink-0" />
              <span>Medical certificate submission window: Within 7 days of recovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* De-stress spots on TIET campus */}
      <div className="bg-white rounded-2xl border border-[#E7E0D3] p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-[#243026] flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-[#527C60]" />
          Recommended Quiet Sanctuaries on Campus
        </h3>
        <p className="text-xs text-[#637568]">
          When hostel rooms feel suffocating or noisy during exam week, recharge at these campus spaces:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2D6] space-y-1">
            <span className="text-xs font-bold text-[#2A372E]">📖 Central Library 3rd Floor</span>
            <p className="text-[11px] text-[#637266]">
              Deep silence reading wing. Natural morning sunlight, individual carrels with charging outlets, and zero hostel distractions.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2D6] space-y-1">
            <span className="text-xs font-bold text-[#2A372E]">🌳 COS Lawns & Walkway</span>
            <p className="text-[11px] text-[#637266]">
              Ideal for a 15-minute sunset somatic walk between heavy coding sessions. Fresh outdoor greenery regulates screen fatigue.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2D6] space-y-1">
            <span className="text-xs font-bold text-[#2A372E]">☕ Nirvana Garden & Tapri</span>
            <p className="text-[11px] text-[#637266]">
              Grab a hot ginger chai and decompress with a friend without talking about placement CTCs or CGPA.
            </p>
          </div>
        </div>
      </div>

      {/* Dispelling Stigma Callout */}
      <div className="p-4 bg-[#FAF6EE] border border-[#E6DCCB] rounded-2xl flex items-start gap-3 text-xs text-[#574E41]">
        <Info className="w-5 h-5 text-[#9E6D38] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-[#3F362A] font-semibold">Addressing the "₹30 Lakh Fee Burden" Mentality:</strong>
          <p className="leading-relaxed">
            Many TIET students carry immense internalized pressure believing they owe their family an immediate 25+ LPA offer to justify institute fees. Remember: your undergraduate degree is an enduring foundational asset, not a 30-day lottery ticket. Many remarkable careers begin at normal starting packages and accelerate exponentially in years 2 to 4. Your sanity and health are non-negotiable prerequisites to high performance.
          </p>
        </div>
      </div>
    </div>
  );
};
