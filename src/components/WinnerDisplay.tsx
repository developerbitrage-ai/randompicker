import { Trophy, RotateCcw, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WinnerDisplayProps {
  winner: {
    name: string;
    location: string;
  };
  onDrawAgain: () => void;
  onReset: () => void;
  showConfetti: boolean;
}

const WinnerDisplay = ({ winner, onDrawAgain, showConfetti }: WinnerDisplayProps) => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (showConfetti) {
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
      }));
      setConfettiPieces(pieces);
    } else {
      setConfettiPieces([]);
    }
  }, [showConfetti]);

  return (
    <div className="relative">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confettiPieces.map((piece) => {
            const colors = ['bg-amber-400', 'bg-yellow-300', 'bg-amber-300', 'bg-yellow-400', 'bg-amber-500'];
            const randomColor = colors[piece.id % colors.length];
            const size = Math.random() > 0.5 ? 'w-3 h-3' : 'w-2 h-2';
            return (
              <div
                key={piece.id}
                className={`absolute top-0 ${randomColor} rounded-full animate-fall ${piece.id % 2 === 0 ? 'rounded-none' : 'rounded-full'}`}
                style={{
                  left: `${piece.left}%`,
                  animationDelay: `${piece.delay}s`,
                  animationDuration: `${piece.duration}s`,
                  width: piece.id % 3 === 0 ? '4px' : '8px',
                  height: piece.id % 3 === 0 ? '4px' : '8px',
                }}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-3xl p-12 border-2 border-amber-500 shadow-2xl shadow-amber-500/30 animate-scaleIn">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-2xl -z-10"></div>

          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/40 via-yellow-500/40 to-amber-500/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-full blur-2xl animate-spin" style={{ animationDuration: '3s' }}></div>
                <Trophy className="w-40 h-40 text-amber-300 relative z-10 animate-bounce-intense" style={{ animationDuration: '1.2s' }} />
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 text-transparent bg-clip-text mb-6 animate-pulse tracking-wider" style={{ animationDuration: '1.5s' }}>
              🎉 Congratulations! 🎉
            </h2>

            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl p-10 mb-8 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/20 animate-scaleIn">
              <p className="text-2xl text-amber-300 mb-6 font-semibold tracking-wide">You are the Winner!</p>
              <h3 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 text-transparent bg-clip-text mb-8 tracking-tight">
                {winner.name}
              </h3>
              <div className="flex items-center justify-center gap-3 text-2xl text-amber-200 font-semibold">
                <MapPin className="w-8 h-8 text-amber-400" />
                <span>{winner.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onDrawAgain}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-bold text-xl shadow-xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <RotateCcw className="w-6 h-6" />
                  Draw Again
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerDisplay;
