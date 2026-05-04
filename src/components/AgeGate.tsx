'use client';
import {useState, useEffect} from 'react';

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const confirmed = localStorage.getItem('eurodolls_age_confirmed_v1');
    if (!confirmed) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('eurodolls_age_confirmed_v1', 'yes');
    setIsVisible(false);
  };

  const handleUnderage = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md mx-4 text-center">
        <h1 className="text-2xl font-bold text-zinc-100 mb-4">Adults only · 18+</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          This website contains adult products. You must be 18 years or older to enter.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            I am 18 or older
          </button>
          <button
            onClick={handleUnderage}
            className="border border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-300 py-3 px-6 rounded-lg transition-colors"
          >
            I am under 18
          </button>
        </div>
      </div>
    </div>
  );
}