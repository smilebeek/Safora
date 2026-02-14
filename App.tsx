
import React, { useState, useEffect, useCallback } from 'react';
import ChatBox from './components/ChatBox';
import MapVisual from './components/MapVisual';
import LandingPage from './components/LandingPage';
import { generateTravelResponse } from './services/geminiService';
import { Message, Destination } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [center, setCenter] = useState<[number, number]>([48.8566, 2.3522]); // Default: Paris

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
          setUserLocation(coords);
          if (view === 'app') setCenter([coords.latitude, coords.longitude]);
        },
        (err) => console.warn("Geolocation unavailable:", err),
        { enableHighAccuracy: true }
      );
    }
  }, [view]);

  const handleLocate = useCallback((lat: number, lng: number) => {
    setCenter([lat, lng]);
  }, []);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await generateTravelResponse(text, messages, userLocation);
      
      const modelMessage: Message = {
        role: 'model',
        text: response.text,
        groundingLinks: response.links,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);

      const newDests: Destination[] = response.links
        .filter(l => l.coordinates)
        .map((link, i) => ({
          id: `dest-${Date.now()}-${i}`,
          name: link.title,
          description: "Safora Selected",
          lat: link.coordinates!.lat,
          lng: link.coordinates!.lng
        }));
      
      if (newDests.length > 0) {
        setDestinations(newDests);
        setCenter([newDests[0].lat, newDests[0].lng]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "I'm having trouble connecting to my global databases. Please check your connection and let's try again!",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('app')} />;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-white animate-in fade-in duration-500">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 flex-col bg-white border-r border-red-50">
        <div className="p-8">
          <div 
            className="flex items-center space-x-4 mb-10 cursor-pointer"
            onClick={() => setView('landing')}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-orange-200 ring-4 ring-orange-50 transform rotate-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none">Safora</h1>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">World Guide</p>
            </div>
          </div>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] font-black text-red-300 uppercase tracking-widest mb-5">Journey Map</h3>
              <div className="space-y-3">
                {[
                  { label: 'Smart Itinerary', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { label: 'Saved Pins', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                  { label: 'Local Vibe', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                ].map((item) => (
                  <button key={item.label} className="w-full flex items-center space-x-4 px-4 py-4 text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-2xl transition-all group">
                    <svg className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon}></path></svg>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-red-300 uppercase tracking-widest mb-5">Safora Selects</h3>
              <div className="space-y-5">
                <div className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-orange-100/50">
                  <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80" className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700" alt="Tokyo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-black tracking-widest uppercase">Tokyo Neon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Experience */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative p-4 md:p-6 gap-6 bg-slate-50/50">
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          {/* Chat Panel */}
          <div className="w-full md:w-[420px] lg:w-[460px] flex-shrink-0 z-20 h-[55vh] md:h-full drop-shadow-2xl">
            <ChatBox 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              onLocate={handleLocate}
            />
          </div>

          {/* Map Surface */}
          <div className="flex-1 h-[45vh] md:h-full relative">
            <MapVisual destinations={destinations} center={center} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
