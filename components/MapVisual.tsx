
import React, { useEffect, useRef } from 'react';
import { Destination } from '../types';

interface MapVisualProps {
  destinations: Destination[];
  center: [number, number];
}

const MapVisual: React.FC<MapVisualProps> = ({ destinations, center }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).L && mapContainerRef.current && !mapInstanceRef.current) {
      const L = (window as any).L;
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView(center, 14);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);

      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapInstanceRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(center, 14, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      const L = (window as any).L;
      
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      destinations.forEach(dest => {
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="bg-gradient-to-br from-orange-500 to-red-600 w-10 h-10 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white scale-100 hover:scale-125 transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        });

        const marker = L.marker([dest.lat, dest.lng], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div class="p-3">
              <h4 class="font-black text-slate-900 text-sm">${dest.name}</h4>
              <p class="text-xs text-slate-500 mt-1 font-medium">${dest.description}</p>
              <div class="mt-2 h-1 w-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
            </div>
          `, { className: 'custom-popup' });
        
        markersRef.current.push(marker);
      });
    }
  }, [destinations]);

  return (
    <div className="w-full h-full relative group shadow-2xl rounded-[2.5rem] overflow-hidden border border-red-50">
      <div ref={mapContainerRef} className="w-full h-full bg-slate-50" id="map" />
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(254, 226, 226, 0.5);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      <div className="absolute bottom-8 right-16 z-[1000] pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-red-100 text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
          World View Active
        </div>
      </div>
    </div>
  );
};

export default MapVisual;
