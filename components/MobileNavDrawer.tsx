"use client";
import React from "react";

interface MobileNavDrawerProps<TSectionId extends string> {
  isOpen: boolean;
  navItems: readonly { id: TSectionId; label: string }[];
  activeSection: TSectionId;
  closeDurationClass: string;
  onNavigate: (sectionId: TSectionId) => void;
}

export default function MobileNavDrawer<TSectionId extends string>({
  isOpen,
  navItems,
  activeSection,
  closeDurationClass,
  onNavigate,
}: MobileNavDrawerProps<TSectionId>) {
  return (
    <div
      id="mobile-nav"
      role="region"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      className={`overflow-hidden border-t border-white/10 md:hidden ${closeDurationClass} transition-all ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="px-4 pb-4 pt-3">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={activeSection === item.id ? "page" : undefined}
              className={`min-h-12 rounded-xl border px-4 py-3 text-left text-base font-medium tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-brand-red ${
                activeSection === item.id
                  ? "border-[#C41E3A]/60 bg-[#c41e3a]/22 text-white"
                  : "border-white/12 bg-white/[0.03] text-white/90 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
