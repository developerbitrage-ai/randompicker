import { MapPin } from 'lucide-react';

interface NameCardProps {
  name: string;
  location: string;
  isHighlighted: boolean;
  isDrawing: boolean;
}

const NameCard = ({ name, location, isHighlighted, isDrawing }: NameCardProps) => {
  return (
    <div
      className={`
        relative p-6 rounded-xl backdrop-blur-sm transition-all
        ${
          isHighlighted && isDrawing
            ? 'duration-100 bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 scale-110 shadow-2xl shadow-amber-500/80 border-2 border-yellow-300 animate-dramatic-pulse'
            : 'duration-300 bg-slate-800/50 border border-slate-700 hover:border-slate-600 scale-100'
        }
      `}
    >
      <div className={`${isHighlighted && isDrawing ? 'animate-intense-pulse' : ''}`}>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 tracking-wide">{name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className={`w-4 h-4 transition-all ${isHighlighted && isDrawing ? 'text-white scale-125 animate-spin' : 'text-slate-400'}`} />
          <span className={`transition-all ${isHighlighted && isDrawing ? 'text-white font-semibold' : 'text-slate-400'}`}>
            {location}
          </span>
        </div>
      </div>

      {isHighlighted && isDrawing && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 via-yellow-300/30 to-amber-300/30 rounded-xl blur-2xl -z-10 animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-xl blur opacity-40 -z-10 animate-shimmer"></div>
        </>
      )}
    </div>
  );
};

export default NameCard;
