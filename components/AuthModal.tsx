
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="h-2 bg-gradient-to-r from-orange-500 to-red-600"></div>
        <div className="p-10">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {type === 'login' ? 'Welcome Back' : 'Join Safora'}
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            {type === 'login' ? 'Continue your global adventure.' : 'Start your journey with a free account.'}
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input type="email" placeholder="explorer@safora.ai" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium" />
            </div>
            
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all mt-4">
              {type === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-slate-400 font-medium">
            By continuing, you agree to Safora's <span className="text-slate-900 underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
