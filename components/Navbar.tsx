"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof navItems)[number]["id"]>("home");
  const prefersReducedMotion = useReducedMotion();

  const closeDurationClass = prefersReducedMotion
    ? "duration-0"
    : "duration-200";

  const mobileSurfaceClass = isOpen
    ? "bg-[#07080c]/96 border-white/15 shadow-[0_10px_36px_rgba(0,0,0,0.48)] backdrop-blur-xl"
    : isScrolled
      ? "bg-[#07080c]/92 border-white/15 shadow-[0_8px_28px_rgba(0,0,0,0.4)] backdrop-blur-lg"
      : "bg-[#07080c]/88 border-white/12 shadow-[0_6px_20px_rgba(0,0,0,0.34)] backdrop-blur-md";

  const handleNavigation = (sectionId: (typeof navItems)[number]["id"]) => {
    setActiveSection(sectionId);
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => scrollToSection(sectionId), prefersReducedMotion ? 0 : 120);
      return;
    }
    scrollToSection(sectionId);
  };

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

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Key handling: Escape to close mobile menu
  useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (!isOpen) return;
      if (ev.key === "Escape") {
        ev.preventDefault();
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b text-white transition-[background-color,box-shadow,border-color] duration-200 ${mobileSurfaceClass} md:border-white/10 md:bg-black/65 md:shadow-lg md:backdrop-blur-md`}
    >
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
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="mr-1 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 focus-visible:outline-none"
            onClick={() => setIsOpen((s) => !s)}
          >
            <span className="relative flex h-5 w-6 flex-col justify-between">
              <span
                className={`block h-0.5 w-full origin-center rounded bg-white transition-transform ${closeDurationClass} ${isOpen ? "translate-y-[9px] rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-full rounded bg-white transition-opacity ${closeDurationClass} ${isOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-full origin-center rounded bg-white transition-transform ${closeDurationClass} ${isOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
              />
            </span>
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
        onNavigate={handleNavigation}
      />
    </nav>
  );
}
