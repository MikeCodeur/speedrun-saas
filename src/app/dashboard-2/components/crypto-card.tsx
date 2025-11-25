import React from 'react';
import { cn } from '@/lib/utils';

interface CryptoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientColor?: string;
}

export function CryptoCard({ 
  children, 
  className, 
  gradientColor = "from-cyan-500 to-blue-500",
  ...props 
}: CryptoCardProps) {
  return (
    <div 
      className={cn(
        "relative group rounded-xl overflow-hidden backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(0,255,255,0.3)] hover:border-white/20",
        className
      )}
      {...props}
    >
      {/* Gradient Border Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br pointer-events-none",
        gradientColor
      )} />
      
      {/* Glass Reflection */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />

      <div className="relative z-10 p-6 h-full">
        {children}
      </div>
    </div>
  );
}
