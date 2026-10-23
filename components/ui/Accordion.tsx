"use client";

import React, { useState } from "react";

export interface AccordionItemData {
  question: string;
  answer: string;
  category?: string;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-border-subtle bg-white transition-all overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-navy-midnight hover:text-navy-light focus:outline-none transition-colors"
            >
              <span className="text-base sm:text-lg pr-4">{item.question}</span>
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full bg-ivory-warm border border-border-subtle flex items-center justify-center text-sm font-bold transition-transform duration-200 ${
                  isOpen ? "rotate-180 bg-navy-midnight text-white border-navy-midnight" : "text-navy-midnight"
                }`}
              >
                ↓
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-border-subtle/50 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
