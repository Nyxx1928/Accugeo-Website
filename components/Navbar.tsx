export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 text-white z-50"
      style={{
        backgroundImage: 'url(/NavBar-BG.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-4 ml-16">
          <img src="/logo.png" alt="Accugeo Logo" className="h-36" />
          <div className="flex flex-col text-white">
            <span className="text-3xl font-semibold">Accugeo Construction</span>
            <span className="text-3xl">Materials and Testing Center</span>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-24 text-4xl font-bold -mt-8 mr-32">
          <button 
            onClick={() => scrollToSection('home')} 
            className="nav-button cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="nav-button cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="nav-button cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="nav-button cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}
