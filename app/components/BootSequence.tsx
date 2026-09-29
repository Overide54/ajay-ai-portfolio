"use client";

import { useEffect, useState } from "react";

const bootMessages = [
  "INITIALIZING NEURAL SYSTEM...",
  "LOADING INTELLIGENCE...",
  "CONNECTING MEMORY...",
  "STARTING REASONING CORE...",
  "AGENT ONLINE",
];

export default function BootSequence() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage((current) => {
        if (current < bootMessages.length - 1) {
          return current + 1;
        }

        clearInterval(messageTimer);
        return current;
      });
    }, 500);

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2600);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  const progress = ((currentMessage + 1) / bootMessages.length) * 100;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a] transition-all duration-700 ${
        exiting
          ? "pointer-events-none scale-105 opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      <div className="w-full max-w-md px-6">
        <div className="mb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-600">
          <span>NEURAL SYSTEM</span>
          <span>v0.1</span>
        </div>

        <div className="border border-slate-800 bg-[#070a0e] p-6">
          <div className="mb-8">
            <p className="font-mono text-xs tracking-[0.25em] text-cyan-400">
              SYSTEM BOOT
            </p>

            <div className="mt-5 h-px w-full bg-slate-800">
              <div
                className="h-px bg-cyan-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="min-h-12">
            <p className="font-mono text-xs tracking-[0.18em] text-slate-300">
              {bootMessages[currentMessage]}
            </p>

            <p className="mt-3 font-mono text-[9px] tracking-[0.15em] text-slate-700">
              PROCESS {String(currentMessage + 1).padStart(2, "0")} / 05
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2">
            <Status label="MEMORY" active={currentMessage >= 2} />
            <Status label="REASONING" active={currentMessage >= 3} />
            <Status label="AGENT" active={currentMessage >= 4} />
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[9px] tracking-[0.2em] text-slate-700">
          AJAY WASNIK // AI / ML ENGINEER
        </p>
      </div>
    </div>
  );
}

function Status({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="border border-slate-800 p-3">
      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-cyan-400" : "bg-slate-700"
          }`}
        />

        <span
          className={`font-mono text-[8px] tracking-[0.15em] ${
            active ? "text-cyan-400" : "text-slate-600"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}