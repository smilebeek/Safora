
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

interface LandingPageProps {
  onStart: () => void;
}

const microReviews = [
  { name: "Marco V.", text: "Best alpine guide AI.", rating: 5, time: "2m ago" },
  { name: "Yuki S.", text: "Found Tokyo hidden ramen.", rating: 5, time: "5m ago" },
  { name: "Elena R.", text: "Santorini was flawless.", rating: 4, time: "12m ago" },
  { name: "James K.", text: "3D map is mind-blowing.", rating: 5, time: "15m ago" },
  { name: "Anya T.", text: "Saved me $400.", rating: 5, time: "22m ago" },
  { name: "Leo G.", text: "Understands local vibes.", rating: 5, time: "30m ago" },
  { name: "Sofia D.", text: "Norway mapped!", rating: 4, time: "45m ago" },
  { name: "David L.", text: "Grounding is key.", rating: 5, time: "1h ago" },
  { name: "Chloe M.", text: "No more stale results.", rating: 5, time: "1h ago" },
  { name: "Hassan B.", text: "Incredible desert trips.", rating: 5, time: "2h ago" },
  { name: "Isla W.", text: "Better than humans.", rating: 4, time: "3h ago" },
  { name: "Ben J.", text: "Fast and beautiful UI.", rating: 5, time: "3h ago" },
  { name: "Maya P.", text: "Bali gems found.", rating: 5, time: "4h ago" },
  { name: "Finn O.", text: "Precision at its finest.", rating: 5, time: "5h ago" },
  { name: "Zoe A.", text: "New travel bestie.", rating: 5, time: "6h ago" }
];

const hotelDeals = [
  { name: "The Ritz-Carlton", location: "Paris", price: "850 EUR", rating: 4.9, img: "https://images.unsplash.com/photo-1541971875076-8f97bd8279be?auto=format&fit=crop&w=600&q=80" },
  { name: "Aman Tokyo", location: "Japan", price: "120,000 JPY", rating: 5.0, img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" },
  { name: "Canaves Oia", location: "Santorini", price: "1,200 EUR", rating: 4.8, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80" },
  { name: "Burj Al Arab", location: "Dubai", price: "1,500 USD", rating: 4.9, img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80" }
];

const featuredTours = [
  { title: "Mt. Fuji Helicopter Tour", duration: "2h", price: "$450", provider: "GetYourGuide", img: "https://images.unsplash.com/photo-1490806678282-461969cdc3bb?auto=format&fit=crop&w=600&q=80" },
  { title: "Amalfi Coast Yacht Cruise", duration: "Full Day", price: "320 EUR", provider: "GetYourGuide", img: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&w=600&q=80" },
  { title: "Vatican Museum Private Access", duration: "4h", price: "180 EUR", provider: "GetYourGuide", img: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=600&q=80" },
  { title: "Aurora Borealis Expedition", duration: "6h", price: "$220", provider: "GetYourGuide", img: "https://images.unsplash.com/photo-1531366930077-511778404117?auto=format&fit=crop&w=600&q=80" }
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [authModal, setAuthModal] = useState<{ open: boolean, type: 'login' | 'signup' }>({ open: false, type: 'login' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="explore" className="relative w-full overflow-x-hidden bg-white selection:bg-orange-100 font-sans">
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="h-full w-full object-cover filter brightness-110 contrast-125 opacity-40 scale-110"
          style={{
            transform: `translate3d(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px, 0)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-snow-covered-mountain-peaks-at-sunset-34533-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white"></div>
      </div>

      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 lg:px-16 flex items-center justify-between ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-xl py-3 border-b border-orange-50' : 'bg-transparent'}`}>
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('explore')}>
          <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-red-600 rounded-[0.8rem] flex items-center justify-center text-white shadow-xl shadow-orange-200 rotate-3 group-hover:rotate-12 transition-all duration-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">Safora</span>
        </div>

        <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black text-slate-800 uppercase tracking-[0.25em]">
          <button onClick={() => scrollToSection('explore')} className="hover:text-orange-600 transition-colors uppercase">Explore</button>
          <button onClick={() => scrollToSection('hotels')} className="hover:text-orange-600 transition-colors uppercase">Hotels</button>
          <button onClick={() => scrollToSection('tours')} className="hover:text-orange-600 transition-colors uppercase">Tours</button>
          <button onClick={onStart} className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            <span className="font-black text-[11px] animate-pulse">Safora Horizon</span>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => setAuthModal({ open: true, type: 'login' })} className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-4 hover:text-orange-600 transition-colors">Log In</button>
          <button onClick={() => setAuthModal({ open: true, type: 'signup' })} className="bg-slate-900 text-white text-[10px] font-black px-7 py-3.5 rounded-full hover:bg-red-600 transition-all uppercase tracking-widest shadow-lg">Start Free</button>
        </div>
      </nav>

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-xl px-7 py-3 rounded-full border border-orange-100 mb-10 shadow-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">The 3D Geospatial Travel Engine</span>
          </div>

          <h1 className="text-7xl lg:text-[10rem] font-black text-slate-900 tracking-tighter leading-[0.8] mb-12 max-w-6xl mx-auto">
            Travel without <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-red-700">Boundaries.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-700 font-semibold max-w-2xl mx-auto mb-16 leading-relaxed opacity-90">
            Meet Safora the AI architect that turns your wanderlust into precise, high-definition itineraries mapped in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={onStart}
              className="group relative bg-slate-900 text-white font-black text-xl px-14 py-6 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-orange-600 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Enter Horizon
                <svg className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </button>
            <button onClick={() => scrollToSection('hotels')} className="flex items-center text-slate-900 font-black text-lg px-8 py-6 hover:text-orange-600 transition-colors group">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-all border border-orange-50">
                <svg className="w-7 h-7 fill-red-600" viewBox="0 0 24 24"><path d="M19 13l-7 7-7-7m14-8l-7 7-7-7"/></svg>
              </div>
              Explore Features
            </button>
          </div>
        </div>
      </section>

      <section id="reviews" className="relative z-10 py-20 bg-white/50 backdrop-blur-sm border-y border-orange-50 overflow-hidden">
        <div className="mb-10 px-6 text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 mb-2">Live Explorer Pulse</h2>
          <p className="text-slate-500 text-sm font-bold">What the community is saying right now</p>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee py-4 whitespace-nowrap">
            {[...microReviews, ...microReviews].map((review, i) => (
              <div key={i} className="mx-4 inline-flex items-center bg-white border border-orange-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-default">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mr-4 text-orange-600 font-black text-xs shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-xs font-black text-slate-900">{review.name}</span>
                    <span className="text-[9px] font-bold text-slate-400">{review.time}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mb-1 leading-tight">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      <section id="hotels" className="relative z-10 py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-1.5 rounded-full mb-6">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" className="h-3.5" alt="Booking.com" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-blue-800">Live API Link</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">Sleep in <br/>Style.</h2>
              <p className="text-lg text-slate-500 font-semibold">Safora grounds your requests into real-time availability from Booking.com, ensuring you get the best rates instantly.</p>
            </div>
            <button className="hidden md:flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-colors">
              Find My Stay
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotelDeals.map((hotel, i) => (
              <div key={i} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-500">
                <div className="h-56 overflow-hidden">
                  <img src={hotel.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={hotel.name} />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{hotel.location}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-6 truncate">{hotel.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900">{hotel.price}<span className="text-[10px] text-slate-400 ml-1">/night</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="relative z-10 py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-1.5 rounded-full mb-6">
                 <span className="text-[9px] font-black uppercase tracking-widest text-red-700">Powered by GetYourGuide</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">Legendary <br/>Experiences.</h2>
              <p className="text-lg text-slate-500 font-semibold">Skip the lines and unlock the world with verified tours grounded in real-time by Safora discovery engine.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTours.map((tour, i) => (
              <div key={i} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src={tour.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={tour.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-orange-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{tour.duration}</span>
                  </div>
                  <h4 className="text-2xl font-black text-white leading-tight">{tour.title}</h4>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xl font-black text-white">{tour.price}</span>
                    <button className="bg-white text-slate-900 px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="horizon" className="relative z-10 py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-red-950 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 max-w-3xl space-y-10">
               <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full mb-4">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Advanced AI Modality</span>
               </div>
               <h2 className="text-6xl lg:text-[8rem] font-black text-white tracking-tighter leading-[0.85]">Safora <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-red-600">Horizon.</span></h2>
               <p className="text-xl text-slate-300 font-medium leading-relaxed">The pinnacle of travel intelligence. A multimodal 3D experience that predicts your journey.</p>
               <button 
                 onClick={onStart}
                 className="group relative bg-white text-slate-900 font-black text-2xl px-16 py-7 rounded-[3rem] shadow-2xl hover:bg-orange-500 hover:text-white transition-all duration-300 overflow-hidden"
               >
                 <span className="relative z-10 flex items-center">
                   Launch Horizon Mode
                   <svg className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                 </span>
               </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-slate-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-32">
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-2xl shadow-white/10">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <span className="text-4xl font-black tracking-tighter">Safora</span>
              </div>
              <p className="text-slate-400 max-w-sm font-medium text-lg leading-relaxed">The definitive AI infrastructure for geospatial travel discovery and 3D itinerary architecture.</p>
            </div>
          </div>
          <div className="pt-16 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">
            <div>(c) 2025 Safora Geospatial Labs.</div>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })} 
        type={authModal.type} 
      />

      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
