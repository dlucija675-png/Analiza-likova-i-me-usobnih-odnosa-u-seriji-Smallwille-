import React from 'react';

interface CharacterPortraitProps {
  id: string;
  name: string;
  group: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ id, name, group, size = 'md' }) => {
  // Determine distinct colors and vector symbols based on character ID
  const getCharacterTheme = (charId: string) => {
    switch (charId.toLowerCase()) {
      case 'clark':
        return {
          bg: 'from-blue-600 via-blue-700 to-red-600',
          border: 'border-yellow-500',
          glow: 'rgba(234, 179, 8, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 15 10-15-10-5zm0 3.5c1.4 0 2.5 1.1 2.5 2.5a2.5 2.5 0 01-5 0c0-1.4 1.1-2.5 2.5-2.5z" />
            </svg>
          ),
          alias: 'Kal-El'
        };
      case 'lex':
        return {
          bg: 'from-emerald-950 via-neutral-900 to-emerald-800',
          border: 'border-emerald-500',
          glow: 'rgba(16, 185, 129, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-emerald-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          ),
          alias: 'Alexander'
        };
      case 'oliver':
        return {
          bg: 'from-green-800 via-stone-900 to-green-600',
          border: 'border-yellow-600',
          glow: 'rgba(34, 197, 94, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-green-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3L11 11 13 13 21 5v-2h-2zm-8 8l-6 6V19h2l6-6-2-2z" />
            </svg>
          ),
          alias: 'Green Arrow'
        };
      case 'chloe':
        return {
          bg: 'from-slate-800 via-sky-900 to-amber-600',
          border: 'border-sky-400',
          glow: 'rgba(56, 189, 248, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          alias: 'Watchtower'
        };
      case 'lana':
        return {
          bg: 'from-pink-900 via-neutral-900 to-rose-700',
          border: 'border-rose-400',
          glow: 'rgba(251, 113, 133, 0.3)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-rose-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ),
          alias: 'Isabella'
        };
      case 'lois':
        return {
          bg: 'from-purple-950 via-slate-900 to-purple-800',
          border: 'border-purple-400',
          glow: 'rgba(168, 85, 247, 0.3)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
            </svg>
          ),
          alias: 'Daily Planet'
        };
      case 'pete':
        return {
          bg: 'from-amber-800 via-neutral-900 to-stone-700',
          border: 'border-amber-500',
          glow: 'rgba(245, 158, 11, 0.3)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 2a2 2 0 00-2-2m2 2a2 2 0 012 2m0 0a2 2 0 01-2 2m0-4a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          alias: 'Senator'
        };
      case 'jonathan':
        return {
          bg: 'from-amber-950 via-amber-900 to-stone-850',
          border: 'border-amber-600',
          glow: 'rgba(180, 83, 9, 0.3)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm-5 13H7v-2h5v2zm0-4H7v-2h5v2zm0-4H7V6h5v2z" />
            </svg>
          ),
          alias: 'Kent Barn'
        };
      case 'martha':
        return {
          bg: 'from-teal-900 via-neutral-900 to-yellow-800',
          border: 'border-yellow-400',
          glow: 'rgba(234, 179, 8, 0.3)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-yellow-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          ),
          alias: 'Red Queen'
        };
      case 'lionel':
        return {
          bg: 'from-orange-950 via-yellow-950 to-neutral-950',
          border: 'border-yellow-600',
          glow: 'rgba(217, 119, 6, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1-5h-2v2h2v-2zm0-4h-2V7h2v6z" />
            </svg>
          ),
          alias: 'Magnificent Bastard'
        };
      case 'tess':
        return {
          bg: 'from-red-950 via-neutral-900 to-rose-900',
          border: 'border-rose-500',
          glow: 'rgba(244, 63, 94, 0.3)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          ),
          alias: 'LuthorCorp'
        };
      case 'kara':
        return {
          bg: 'from-sky-600 via-blue-700 to-red-500',
          border: 'border-amber-400',
          glow: 'rgba(56, 189, 248, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ),
          alias: 'Supergirl'
        };
      case 'zod':
        return {
          bg: 'from-stone-900 via-red-950 to-stone-950',
          border: 'border-red-600',
          glow: 'rgba(239, 68, 68, 0.4)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          alias: 'Kneel Before Zod'
        };
      case 'brainiac':
        return {
          bg: 'from-stone-900 via-neutral-950 to-emerald-950',
          border: 'border-emerald-400',
          glow: 'rgba(16, 185, 129, 0.5)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
              <path d="M12 7v10M7 12h10" />
            </svg>
          ),
          alias: 'Milton Fine'
        };
      case 'jor-el':
        return {
          bg: 'from-blue-950 via-slate-900 to-sky-950',
          border: 'border-sky-300',
          glow: 'rgba(14, 165, 233, 0.5)',
          symbol: (
            <svg className="w-1/2 h-1/2 text-sky-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 3.6l7.2 14.4H4.8L12 5.6z" />
            </svg>
          ),
          alias: 'Fortress Crypt'
        };
      default:
        // Dynamic fallback based on Group
        let grpBg = 'from-neutral-800 via-indigo-950 to-violet-900';
        let grpBorder = 'border-indigo-400';
        let grpGlow = 'rgba(99, 102, 241, 0.3)';
        if (group === 'Kents') {
          grpBg = 'from-yellow-900 via-neutral-905 to-amber-800';
          grpBorder = 'border-yellow-400';
          grpGlow = 'rgba(234, 179, 8, 0.3)';
        } else if (group === 'Luthors') {
          grpBg = 'from-emerald-900 via-neutral-905 to-green-800';
          grpBorder = 'border-emerald-400';
          grpGlow = 'rgba(16, 185, 129, 0.3)';
        } else if (group === 'Justice League') {
          grpBg = 'from-red-900 via-stone-900 to-rose-850';
          grpBorder = 'border-red-400';
          grpGlow = 'rgba(239, 68, 68, 0.3)';
        }
        return {
          bg: grpBg,
          border: grpBorder,
          glow: grpGlow,
          symbol: (
            <span className="text-white font-extrabold text-lg select-none tracking-tight">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          ),
          alias: group
        };
    }
  };

  const theme = getCharacterTheme(id);

  const sizeClasses = {
    sm: 'w-10 h-10 border text-xs',
    md: 'w-16 h-16 border-2 text-sm',
    lg: 'w-24 h-24 border-2 text-lg',
    xl: 'w-32 h-32 border-4 text-2xl',
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`rounded-2xl bg-gradient-to-br ${theme.bg} ${theme.border} ${sizeClasses[size]} flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 flex-shrink-0`}
        style={{
          boxShadow: `0 10px 25px -5px rgba(0,0,0,0.5), 0 0 15px 1px ${theme.glow}`,
        }}
      >
        {theme.symbol}
      </div>
    </div>
  );
};
