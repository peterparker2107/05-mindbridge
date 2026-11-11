import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Heart, Copy, Check, X, AlertCircle } from 'lucide-react';
import { CRISIS_CONTACTS } from '../lib/cbtData';
import type { CrisisContact } from '../types/cbt';

export const CrisisBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  return (
    <>
      {/* Top Banner Alert Strip */}
      <aside aria-label="Crisis safety shield" className="bg-[#FAF3EE] border-b border-[#F0DCCE] px-4 py-2.5 text-xs sm:text-sm text-[#733B26]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#CB5936] animate-pulse" />
            <span className="font-semibold text-[#8B3A1E] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#CB5936]" />
              Campus Crisis Safety Shield:
            </span>
            <span className="hidden md:inline text-[#643422]">
              In acute distress or panic? You are never alone.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:01752393000"
              className="font-medium text-[#8B3A1E] hover:underline flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded border border-[#E9CBBB]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#CB5936]" />
              TIET Health Ext: <span className="font-bold">2345</span>
            </a>
            <a
              href="tel:9152987821"
              className="hidden sm:flex font-medium text-[#8B3A1E] hover:underline items-center gap-1 bg-white/70 px-2 py-0.5 rounded border border-[#E9CBBB]"
            >
              iCall: <span className="font-bold">9152987821</span>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#CB5936] hover:bg-[#B34A29] text-white px-2.5 py-1 rounded-md text-xs font-medium transition shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Immediate Help
            </button>
          </div>
        </div>
      </aside>

      {/* Emergency Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E8E2D8] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#EFEAE2]">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#FAF3EE] flex items-center justify-center text-[#CB5936]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2A372E]">Immediate Crisis Resources</h3>
                  <p className="text-xs text-[#6B7E70]">Free, non-judgmental & confidential support</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8B9B8F] hover:text-[#2A372E] p-1 rounded-lg hover:bg-[#F4F1EA] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer Callout */}
            <div className="my-4 p-3 bg-[#FAF7F0] border border-[#E6E0D3] rounded-xl flex items-start gap-2.5 text-xs text-[#5D5548] leading-relaxed">
              <AlertCircle className="w-4 h-4 text-[#8C7652] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#413B31]">Legal & Clinical Disclaimer: </strong>
                MindBridge is an autonomous, peer-designed self-reflection cognitive tool built for daily student stress management. It is <em>not</em> medical treatment, crisis psychiatric triage, or psychotherapy. If you or a friend are feeling unsafe, please reach out to one of the trained clinical helplines below or visit the campus dispensary right away.
              </div>
            </div>

            {/* Directory of Emergency Contacts */}
            <div className="space-y-3">
              {CRISIS_CONTACTS.map((contact: CrisisContact) => (
                <div
                  key={contact.name}
                  className="p-3.5 rounded-xl border border-[#EFEBE4] bg-[#FAF8F5] hover:border-[#D6CEBF] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        contact.type === 'campus'
                          ? 'bg-[#E3EFE7] text-[#2D6643]'
                          : contact.type === 'national'
                          ? 'bg-[#EAEFF8] text-[#295191]'
                          : 'bg-[#FBEBE6] text-[#A63F20]'
                      }`}>
                        {contact.type === 'campus' ? 'TIET Campus' : contact.type === 'national' ? 'National' : '24x7 Helpline'}
                      </span>
                      <h4 className="font-semibold text-sm text-[#233127]">{contact.name}</h4>
                    </div>
                    <p className="text-xs text-[#637568]">{contact.description}</p>
                    <p className="text-[11px] text-[#7A6B5B] font-medium">🕒 {contact.availability}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleCopy(contact.number)}
                      title="Copy phone number"
                      className="px-2.5 py-1.5 text-xs border border-[#D5CDC0] rounded-lg bg-white hover:bg-[#F3EFE7] text-[#474136] flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedNumber === contact.number ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`tel:${contact.number}`}
                      className="px-3 py-1.5 text-xs rounded-lg bg-[#557F62] hover:bg-[#43674E] text-white font-medium flex items-center gap-1.5 shadow-xs transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{contact.displayNumber}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-[#EFEAE2] flex justify-between items-center text-xs text-[#7B8B7F]">
              <span>TIET Patiala Campus Health Center: Near Hostel C / Dispensary</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-[#D4CDC1] bg-white hover:bg-[#F6F3ED] text-[#443D32] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
