import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';
import participantsData from '../data/names.json';
import NameCard from './NameCard';
import WinnerDisplay from './WinnerDisplay';

interface Participant {
  id: number;
  name: string;
  location: string;
  eligible: boolean;
}

const LuckyDraw = () => {
  const [participants] = useState<Participant[]>(participantsData);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [history, setHistory] = useState<Participant[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('drawHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (newWinner: Participant) => {
    const updatedHistory = [newWinner, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('drawHistory', JSON.stringify(updatedHistory));
  };

  const selectWinner = () => {
    const pool = participants.filter(p => p.eligible);
    if (pool.length === 0) return participants[0];
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  const startDraw = () => {
    if (isDrawing) return;

    setIsDrawing(true);
    setWinner(null);
    setShowConfetti(false);

    const finalWinner = selectWinner();
    const totalDuration = 15000;

    let timeElapsed = 0;
    let currentSpeed = 80;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      timeElapsed = elapsed;

      if (elapsed < 3000) {
        currentSpeed = 80 + (elapsed / 3000) * 20;
      } else if (elapsed < 10000) {
        currentSpeed = 100 + ((elapsed - 3000) / 7000) * 150;
      } else if (elapsed < 14000) {
        currentSpeed = 250 - ((elapsed - 10000) / 4000) * 200;
      } else {
        currentSpeed = 50 + ((elapsed - 14000) / 1000) * 30;
      }

      if (elapsed < totalDuration - 500) {
        const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        setHighlightedId(randomParticipant.id);
        setTimeout(animate, currentSpeed);
      } else {
        setHighlightedId(finalWinner.id);

        setTimeout(() => {
          setWinner(finalWinner);
          setIsDrawing(false);
          setHighlightedId(null);
          setShowConfetti(true);
          saveHistory(finalWinner);

          setTimeout(() => setShowConfetti(false), 6000);
        }, 800);
      }
    };

    animate();
  };

  const reset = () => {
    setWinner(null);
    setHighlightedId(null);
    setShowConfetti(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('drawHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-amber-400 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-transparent bg-clip-text">
              Lucky Draw
            </h1>
          </div>
          <p className="text-xl text-slate-300">
            Click the button below to select a random winner
          </p>
        </div>

        {!winner ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {participants.map((participant) => (
                <NameCard
                  key={participant.id}
                  name={participant.name}
                  location={participant.location}
                  isHighlighted={highlightedId === participant.id}
                  isDrawing={isDrawing}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={startDraw}
                disabled={isDrawing}
                className="group relative px-12 py-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="relative flex items-center gap-3">
                  <Sparkles className="w-8 h-8" />
                  {isDrawing ? 'Drawing...' : 'Start Draw'}
                  <Sparkles className="w-8 h-8" />
                </span>
              </button>
            </div>
          </>
        ) : (
          <WinnerDisplay
            winner={winner}
            onDrawAgain={reset}
            onReset={reset}
            showConfetti={showConfetti}
          />
        )}

        {history.length > 0 && !isDrawing && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-300">Recent Winners</h2>
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((h, index) => (
                <div
                  key={`${h.id}-${index}`}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{h.name}</p>
                      <p className="text-slate-400 text-sm">{h.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyDraw;
