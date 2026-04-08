"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  type StatusKind = "success" | "error" | "pending";
  const [status, setStatus] = useState<null | { kind: StatusKind; message: string }>(null);
  const timeoutRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const serviceOptions = [
    "Material Testing",
    "Quality Inspection",
    "Consulting & Reporting",
    "Structural Assessment",
    "Geotechnical Investigation",
    "Non-Destructive Testing",
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ kind: "pending", message: "Sending..." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          serviceTypes: selectedServices,
          serviceType: selectedServices.join(", "),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        const errMsg = (json && (json.error || json.message)) || "Server error";
        setStatus({ kind: "error", message: errMsg });
        return;
      }

      const successMsg = (json && (json.message || json.success)) || "Your message has been sent. We'll get back to you shortly.";
      setStatus({ kind: "success", message: successMsg });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSelectedServices([]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatus({ kind: "error", message: msg || "Failed to send message." });
    }
    // clear previous timeout and set a new one to clear status
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      if (mountedRef.current) setStatus(null);
    }, 5000);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const fieldBaseClass =
    "w-full bg-transparent border-0 border-b border-white/35 px-0 pb-2 text-white placeholder:text-white/40 focus:border-white/85 focus:outline-none";

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0b0d] py-16 text-white md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_86%_82%,rgba(211,31,47,0.24),transparent_45%),linear-gradient(180deg,#101114_0%,#090a0c_100%)]" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#d31f2f]/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1120px] px-4 sm:px-6">
        <div className="relative min-h-[680px] overflow-hidden border border-white/15 bg-[#08090c]">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_20%_12%,rgba(255,255,255,0.14),transparent_32%),linear-gradient(135deg,#1b1f28_0%,#10131a_42%,#050608_100%)] lg:w-[58%]" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] lg:w-[58%]" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_30%_18%,rgba(211,31,47,0.74),rgba(94,13,22,0.9)_42%,rgba(10,10,13,0.99)_100%)] lg:w-[52%]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full min-h-[680px] flex-col px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8 lg:px-12 lg:pt-10">
            <div className="flex items-center justify-between gap-3 text-white">
              <p className="text-lg font-medium tracking-tight">Accugeo</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-white/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/90 transition hover:border-white hover:bg-white/10 hover:no-underline"
                >
                  Make an enquiry
                </button>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/45 text-white/90 transition hover:border-white hover:bg-white/10 hover:no-underline"
                >
                  <span aria-hidden className="text-[10px] leading-none tracking-tight">|||</span>
                </button>
              </div>
            </div>

            <div className="mt-10 grid flex-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="flex h-full flex-col justify-between">
                <h2 className="max-w-xl text-[clamp(2rem,5.7vw,5rem)] font-light leading-[0.92] tracking-tight text-white">
                  Let&apos;s build <span className="font-semibold text-[#d31f2f]">greatest</span> projects together.
                </h2>

                <div className="mt-12 max-w-xs border-t border-white/20 pt-6 text-sm leading-relaxed text-white/75 lg:mt-0">
                  <p>
                    <a href="mailto:accugeo@gmail.com" className="transition-colors hover:text-white">accugeo@gmail.com</a>
                  </p>
                  <p className="mt-2">
                    <a href="tel:+639178971006" className="transition-colors hover:text-white">09178971006</a>
                  </p>
                  <p>
                    <a href="tel:+63287259882" className="transition-colors hover:text-white">(02)8725-9882</a>
                  </p>
                  <p className="mt-4 text-white/65">175 Kamias Road Extn., Sikatuna Village, Quezon City</p>
                </div>
              </div>

              <div className="pb-2 lg:pb-4">
                <p className="max-w-md text-[clamp(1.3rem,2.4vw,2.1rem)] font-light leading-[1.22] text-white/92">
                  We&apos;re here to bring your concept to life, manage your ongoing project, or expand your existing development team.
                </p>

                {status && (
                  <div
                    className={
                      status.kind === "success"
                        ? "mt-5 rounded-md border border-green-200/40 bg-green-900/25 px-3 py-2 text-sm text-green-100"
                        : status.kind === "pending"
                        ? "mt-5 rounded-md border border-yellow-100/40 bg-yellow-900/25 px-3 py-2 text-sm text-yellow-100"
                        : "mt-5 rounded-md border border-red-200/40 bg-red-900/30 px-3 py-2 text-sm text-red-100"
                    }
                    role={status.kind === "error" ? "alert" : "status"}
                  >
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
                    <label className="flex min-h-[44px] flex-col">
                      <span className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/65">Name</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className={fieldBaseClass}
                      />
                    </label>

                    <label className="flex min-h-[44px] flex-col">
                      <span className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/65">Email</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@company.com"
                        className={fieldBaseClass}
                      />
                    </label>
                  </div>

                  <fieldset className="flex min-h-[44px] flex-col">
                    <legend className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/65">Service Type</legend>
                    <div className="rounded-2xl border border-white/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-3 shadow-[0_14px_36px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                      <div className="grid gap-2 sm:grid-cols-2">
                        {serviceOptions.map((service) => {
                          const isSelected = selectedServices.includes(service);

                          return (
                            <label key={service} className="cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleService(service)}
                                className="peer sr-only"
                              />
                              <span
                                className={`flex min-h-[42px] items-center rounded-xl border px-3 py-2 text-sm transition ${
                                  isSelected
                                    ? "border-white/55 bg-white/20 text-white"
                                    : "border-white/20 bg-white/5 text-white/85 hover:bg-white/10"
                                }`}
                              >
                                {service}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </fieldset>

                  <label className="flex min-h-[44px] flex-col">
                    <span className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/65">Project Information</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      placeholder="Tell us about your project"
                      className={`${fieldBaseClass} resize-none`}
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="rounded-full border border-white/55 px-5 py-2 text-sm font-medium text-white transition hover:border-white hover:bg-white/10 hover:no-underline"
                    >
                      Send Inquiry
                    </button>
                    <p className="text-sm text-white/70">
                      Prefer email?{" "}
                      <a href="mailto:accugeo@gmail.com" className="text-white underline-offset-2 transition-colors hover:text-white/85">
                        Send one directly
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
