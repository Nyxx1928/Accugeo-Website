"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-6 w-full">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-white">Contact Us</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white text-center">Location</h3>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src="/Location Image.png" alt="Location Map" className="w-full h-full object-cover" />
            </div>
            <p className="text-white text-center text-lg mt-3">
              175 Katipunan St., Diliman, Quezon City, NCR, Metro Manila
            </p>
          </div>
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
                Email:
              </h3>
              <p className="text-white text-lg"><a href="mailto:example@gmail.com" className="underline hover:text-gray-300">example@gmail.com</a></p>
              <p className="text-white text-lg"><a href="mailto:example2@gmail.com" className="underline hover:text-gray-300">example2@gmail.com</a></p>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
                Phone Numbers:
              </h3>
              <p className="text-white text-lg"><a href="tel:+1234567890" className="underline hover:text-gray-300">+1 (234) 567-890</a></p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Telephone:</h3>
              <p className="text-white text-lg"><a href="tel:+12345678" className="underline hover:text-gray-300">+63 1234 5678</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
