import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in transition-all duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#0B1B3D] text-white border border-[#C6A867]/40 rounded-lg shadow-2xl backdrop-blur-md">
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C6A867] shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-300 shrink-0" />}
        <p className="text-xs sm:text-sm font-medium tracking-wide text-[#FAF9F5]">{toast.message}</p>
      </div>
    </div>
  );
};
