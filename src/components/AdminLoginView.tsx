import React, { useState } from 'react';
import { ArrowLeft, KeyRound } from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default pass is "admin" or "wisdom" or any non-empty password
    if (password.trim() === 'admin' || password.trim() === 'wisdom' || password.trim().length >= 3) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Please enter a valid password (e.g. "admin" or "wisdom")');
    }
  };

  return (
    <main className="w-full max-w-md mx-auto py-12 md:py-20 px-4 animate-in fade-in duration-300">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl md:text-[40px] font-bold text-[#041627]">
          The Ethical Dilemma
        </h1>
        <div className="w-12 h-px bg-[#74777d] mx-auto mt-4"></div>
      </div>

      <div className="bg-[#fdf9f0] border border-[#dedad1] p-8 md:p-12 hover:bg-[#f7f3ea] transition-colors duration-300 relative group shadow-sm rounded-[2px]">
        <h2 className="font-serif text-2xl font-semibold text-[#041627] mb-8 text-center">
          Administrator Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-2"
              htmlFor="admin-password"
            >
              Administrator Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (demo: admin)"
              className="w-full bg-transparent border-0 border-b border-[#44474c] focus:border-[#041627] focus:ring-0 px-0 py-2 text-base text-[#1c1c16] placeholder-[#74777d] transition-colors"
              required
              autoFocus
            />
            {error && <p className="text-xs text-[#ba1a1a] mt-2 font-medium">{error}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#041627] text-white text-[12px] font-semibold uppercase tracking-widest py-3.5 px-6 hover:bg-[#1a2b3c] transition-colors rounded-[2px] cursor-pointer"
            >
              Login to Dashboard
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={onCancel}
            className="inline-flex items-center text-sm text-[#44474c] hover:text-[#041627] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    </main>
  );
};
