import React from 'react';
import { useLocation } from 'react-router-dom';
import { Save, Sun, Moon, HelpCircle, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProject } from '@/lib/ProjectContext';

const STEP_TITLES = { 1: 'Material', 2: 'Pieces', 3: 'Optimize', 4: 'Results' };

export default function Header({ onToggleAssistant }) {
  const { projectName, material, matDef, step, saveProject } = useProject();
  const [saved, setSaved] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const location = useLocation();

  const handleSave = () => {
    saveProject();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  React.useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  const isWorkspace = location.pathname === '/';

  return (
    <header className="h-[72px] shrink-0 border-b border-black/[0.06] bg-white/80 backdrop-blur-2xl flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
            {isWorkspace ? `Step ${String(step).padStart(2, '0')} · ${STEP_TITLES[step]}` : 'ScrapSmart'}
          </div>
          <div className="font-display font-semibold text-[#172B21] truncate text-sm sm:text-base">{projectName}</div>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {matDef.name} · {material.sheetWidth}×{material.sheetHeight}mm
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button onClick={handleSave} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-black/[0.04] transition">
          <Save className="w-4 h-4" /> {saved ? 'Saved' : 'Save'}
        </button>
        <button onClick={() => setDark((d) => !d)} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-black/[0.04] transition" title="Toggle theme">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-slate-500 hover:bg-black/[0.04] transition" title="Help">
          <HelpCircle className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#123D26] text-white flex items-center justify-center text-xs font-semibold shadow-sm" title="Guest">
          <User className="w-4 h-4" />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onToggleAssistant}
          className="ml-1 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-[#123D26] text-white shadow-lg shadow-[#123D26]/15"
        >
          <Sparkles className="w-4 h-4" /> <span className="hidden sm:inline">Ask AI</span>
        </motion.button>
      </div>
    </header>
  );
}
