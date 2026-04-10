"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MobileNavDrawer from "./MobileNavDrawer";

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const nav = document.querySelector("nav");
  const navHeight = nav ? (nav as HTMLElement).offsetHeight : 0;
  const y =
    element.getBoundingClientRect().top + window.scrollY - navHeight - 8; // 8px gap
  window.scrollTo({ top: y, behavior: "smooth" });
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof navItems)[number]["id"]>("home");
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeDurationClass = prefersReducedMotion
    ? "duration-0"
    : "duration-200";

  const handleNavigation = (sectionId: (typeof navItems)[number]["id"]) => {
    setActiveSection(sectionId);
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => scrollToSection(sectionId), prefersReducedMotion ? 0 : 120);
      return;
    }
    scrollToSection(sectionId);
  };

  // Prevent background scroll and manage focus when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current =
        document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // focus the close button once the drawer is in the DOM
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      previouslyFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id as (typeof navItems)[number]["id"]);
        }
      },
      {
        root: null,
        rootMargin: "-36% 0px -52% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Key handling: Escape to close; simple focus trap (cycle focus inside drawer)
  useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (!isOpen) return;
      if (ev.key === "Escape") {
        ev.preventDefault();
        setIsOpen(false);
        return;
      }
      if (ev.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
        );
        if (focusable.length === 0) {
          ev.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault();
          last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/65 text-white shadow-lg backdrop-blur-md">
      <div className="relative z-10 mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-20 md:px-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src="/LOGO.png"
            alt="Accugeo Logo"
            width={64}
            height={64}
            priority
            sizes="(max-width: 768px) 48px, 64px"
            className="h-12 w-12 md:h-16 md:w-16"
          />
          <div className="flex flex-col text-white">
            <div className="text-base md:text-lg font-semibold leading-tight">
              ACTMC
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <button
            ref={toggleButtonRef}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="mr-1 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 focus-visible:outline-none"
            onClick={() => setIsOpen((s) => !s)}
          >
            {isOpen ? (
              // Close icon
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
            ) : (
              // Hamburger icon
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <NavigationMenu className="mr-0 hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink
                  asChild
                  className={`rounded-lg px-6 py-2 text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus:bg-transparent data-[active]:bg-transparent ${
                    activeSection === item.id
                      ? "bg-[#c41e3a]/35 text-white hover:bg-[#c41e3a]/45 focus:bg-[#c41e3a]/35 data-[active]:bg-[#c41e3a]/35 data-[active]:text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                  }`}
                >
                  <button
                    type="button"
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className="min-h-11 cursor-pointer"
                    onClick={() => handleNavigation(item.id)}
                  >
                    {item.label}
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>

      <MobileNavDrawer
        isOpen={isOpen}
        navItems={navItems}
        activeSection={activeSection}
        closeDurationClass={closeDurationClass}
        drawerRef={drawerRef}
        closeButtonRef={closeButtonRef}
        onClose={() => setIsOpen(false)}
        onNavigate={handleNavigation}
      />
    </nav>
  );
}
