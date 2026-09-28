import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  categoryHint?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  categoryHint = 'Fashion'
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0B1B3D]/5 ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ) : null}

      {/* Styled Luxury Fallback Container (Zero-Broken-Image Policy) */}
      {(hasError || !loaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 ${
            hasError ? 'opacity-100' : 'opacity-40'
          }`}
          style={{
            background:
              'radial-gradient(circle at 50% 35%, #162B56 0%, #0B1B3D 70%, #061024 100%)'
          }}
        >
          {/* Subtle gold geometric luxury pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A867_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#C6A867]/40 flex items-center justify-center mb-3 bg-[#0B1B3D]/80 shadow-md">
              <span className="font-serif text-[#C6A867] text-lg font-bold tracking-widest">N</span>
            </div>
            <span className="font-serif text-[#FAF9F5] text-sm tracking-widest uppercase font-medium line-clamp-1 px-2">
              {alt || 'NAVÉRA Atelier'}
            </span>
            <span className="text-[10px] text-[#C6A867] tracking-wider uppercase mt-1">
              {categoryHint} Edition
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
