import React from 'react';
import { Check, X } from 'lucide-react';

export const FeatureCheck = ({ val, accent = false }) => {
  if (val === true) {
    return (
      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${accent ? 'bg-[#11b1d0] text-white font-bold' : 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400'}`}>
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
    );
  }

  if (val === false || val === '-' || val === undefined) {
    return (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/15 text-rose-500 dark:text-rose-400">
        <X className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
    );
  }

  // Format any currency string in Indian standard (en-IN)
  const displayVal = typeof val === 'string'
    ? val.replace(/₹\s*([0-9,]+)/g, (match, numStr) => {
        const rawNumber = Number(numStr.replace(/,/g, ''));
        return !isNaN(rawNumber) ? `₹${rawNumber.toLocaleString('en-IN')}` : match;
      })
    : val;

  // If string value
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${accent ? 'bg-[#11b1d0]/20 text-[#11b1d0] border border-[#11b1d0]/30' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60'}`}>
      {displayVal}
    </span>
  );
};
