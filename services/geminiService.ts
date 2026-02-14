
import { GoogleGenAI } from "@google/genai";
import { Message, GroundingLink } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const extractCoordsFromUrl = (url: string): { lat: number; lng: number } | undefined => {
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  
  const queryMatch = url.match(/query=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (queryMatch) return { lat: parseFloat(queryMatch[1]), lng: parseFloat(queryMatch[2]) };

  return undefined;
};

export const generateTravelResponse = async (
  prompt: string,
  history: Message[],
  userLocation?: { latitude: number; longitude: number }
): Promise<{ text: string; links: GroundingLink[] }> => {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: contents,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userLocation ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            } : undefined
          }
        },
        systemInstruction: `You are Safora, a warm and brilliant world-class travel expert. 
        Your personality is helpful, adventurous, and sophisticated. 
        When you mention places, be specific so the grounding tool can provide Map links. 
        Always aim to find the exact coordinates for the map. 
        Focus on providing curated experiences that feel personal and exciting. 
        Provide clear, informative responses about destinations, hotels, and tours.`
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that request.";
    const links: GroundingLink[] = [];

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        const uri = chunk.maps?.uri || chunk.web?.uri;
        const title = chunk.maps?.title || chunk.web?.title;
        
        if (uri) {
          links.push({
            title: title || "Location Info",
            uri: uri,
            coordinates: extractCoordsFromUrl(uri)
          });
        }
      });
    }

    return { text, links };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
