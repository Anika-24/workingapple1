import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistant from '@/components/assistant/AIAssistant';

export default function AppShell() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <div className="flex h-screen bg-[#f5f5f7] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header onToggleAssistant={() => setAssistantOpen((o) => !o)} />
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          <div className="pointer-events-none fixed inset-0 -z-0 opacity-70 bg-[radial-gradient(circle_at_80%_10%,rgba(46,125,122,0.07),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(22,163,74,0.05),transparent_25%)]" />
          <div className="relative z-10"><Outlet /></div>
        </main>
      </div>
      <AIAssistant open={assistantOpen} onToggle={() => setAssistantOpen((open) => !open)} />
    </div>
  );
}
