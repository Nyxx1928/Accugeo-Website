export default function Hero() {
  return (
    <section id="home" className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-bg.png)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-up">
            Tagline Here Lorem Ipsum
          </h1>
          <p className="text-lg leading-relaxed fade-up fade-up-delay-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit. 
            Duis consequat nulla eget elit. Duis consequat nulla eget elit. Duis consequat nulla eget elit.
          </p>
        </div>
      </div>
    </section>
  )
}
