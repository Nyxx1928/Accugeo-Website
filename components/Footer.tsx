import Image from "next/image";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const SERVICE_LINKS = [
  "Material Testing",
  "Quality Inspection",
  "Consulting & Reporting",
  "Structural Assessment",
  "Geotechnical Investigation",
  "Non-Destructive Testing",
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#090507_0%,#13070b_55%,#090406_100%)] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute bottom-[-140px] right-[-80px] h-[340px] w-[340px] rounded-full bg-[#c41e3a]/25 blur-[95px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-8 pt-14 md:px-8 md:pt-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="relative z-10 max-w-sm">
            <a href="#home" className="inline-flex items-center gap-3 text-white no-underline hover:no-underline">
              <Image
                src="/LOGO.png"
                alt="Accugeo logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="text-xl font-semibold tracking-tight">Accugeo</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[#c7a3ae]">
              Crafting dependable material testing and engineering insights for safer, higher-confidence projects.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[#c7a3ae] transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-[#c7a3ae] transition-colors hover:text-white">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Follow Us</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#c7a3ae] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex flex-col items-start justify-between gap-4 text-xs text-[#b88f9b] md:flex-row md:items-center">
          <p>©2026 Accugeo Construction Materials and Testing Center. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Accessibility Statement</a>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none absolute bottom-2 left-0 select-none text-[56px] font-semibold leading-none tracking-tight text-[rgba(227,157,171,0.12)] md:text-[160px]"
        >
          Accugeo
        </p>
      </div>
    </footer>
  );
}
