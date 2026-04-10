"use client";

import Image from "next/image";
import React from "react";

interface MobileNavDrawerProps<TSectionId extends string> {
  isOpen: boolean;
  navItems: readonly { id: TSectionId; label: string }[];
  activeSection: TSectionId;
  closeDurationClass: string;
  drawerRef: React.MutableRefObject<HTMLDivElement | null>;
  closeButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onNavigate: (sectionId: TSectionId) => void;
}

export default function MobileNavDrawer<TSectionId extends string>({
  isOpen,
  navItems,
  activeSection,
  closeDurationClass,
  drawerRef,
  closeButtonRef,
  onClose,
  onNavigate,
}: MobileNavDrawerProps<TSectionId>) {
  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      ref={drawerRef}
      className={`fixed inset-0 z-50 md:hidden ${closeDurationClass} transition-opacity ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <button
        type="button"
        aria-label="Close menu backdrop"
        className={`absolute inset-0 bg-black/70 ${closeDurationClass} transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`relative ml-auto flex h-full w-full max-w-[320px] min-[380px]:max-w-[340px] flex-col border-l border-white/10 bg-[#07080c] px-5 pb-6 pt-4 shadow-[0_24px_80px_rgba(0,0,0,0.72)] ${closeDurationClass} transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/LOGO.png"
              alt="Accugeo Logo"
              width={48}
              height={48}
              sizes="48px"
              className="h-12 w-12"
            />
            <p className="text-sm font-semibold tracking-wide text-white/95">ACTMC</p>
          </div>
          <button
            ref={closeButtonRef}
            aria-label="Close menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 focus-visible:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="mb-4 text-xs text-white/65">Engineering and Materials Testing</p>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={activeSection === item.id ? "page" : undefined}
              className={`min-h-12 rounded-lg border-l-2 px-3 py-2 text-left text-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand-red ${
                activeSection === item.id
                  ? "border-l-[#C41E3A] bg-[#c41e3a]/22 text-white"
                  : "border-l-transparent text-white/90 hover:bg-white/10 hover:text-white"
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
