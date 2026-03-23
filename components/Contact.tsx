"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Server error");

      setStatus("Your message has been sent. We'll get back to you shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatus(msg || "Failed to send message.");
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-6 w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-white">Get in touch</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Left column: location & quick contacts */}
          <div className="space-y-6">
            <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-semibold text-white mb-3">Location</h3>
              <div className="h-56 rounded-lg overflow-hidden shadow-sm">
                <img src="/Location Image.png" alt="Location Map" className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-200 mt-3 text-sm md:text-base">175 Katipunan St., Diliman, Quezon City, NCR, Metro Manila</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-800 flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <div className="flex flex-col">
                    <a href="mailto:example@gmail.com" className="text-white font-medium hover:text-gray-300">example@gmail.com</a>
                    <a href="mailto:example2@gmail.com" className="text-white font-medium hover:text-gray-300">example2@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-800 flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+1234567890" className="text-white font-medium hover:text-gray-300">+1 (234) 567-890</a>
                  <p className="text-white mt-1"><a href="tel:+6312345678" className="hover:text-gray-300">+63 1234 5678</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: contact form */}
          <form onSubmit={handleSubmit} className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 shadow-sm">
            <h3 className="text-2xl font-semibold text-white mb-4">Send a message</h3>

            {status && (
              <div className="bg-green-900/30 text-green-200 p-3 rounded mb-4">{status}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-300 mb-1">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-300 mb-1">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </label>
            </div>

            <div className="mt-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-300 mb-1">Phone (optional)</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+63 9xx xxx xxxx"
                  className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </label>
            </div>

            <div className="mt-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-300 mb-1">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button type="submit" className="bg-brand-red text-white font-semibold rounded-md px-6 py-3 hover:opacity-95">Send Message</button>
              <p className="text-sm text-gray-400">Prefer email? <a href="mailto:example@gmail.com" className="underline text-white">Send one directly</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
