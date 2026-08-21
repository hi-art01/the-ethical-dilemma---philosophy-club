import React from 'react';

interface FooterProps {
  onOpenArchives: () => void;
  onOpenReadingList: () => void;
  onOpenContact: () => void;
  onOpenAdminLogin: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenArchives,
  onOpenReadingList,
  onOpenContact,
  onOpenAdminLogin,
  isAdmin,
}) => {
  return (
    <footer className="bg-[#f2ede4] border-t border-[#c4c6cd]/80 mt-auto w-full">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left / Center: Copyright Text */}
        <div className="text-sm text-[#1c1c16] text-center md:text-left leading-relaxed opacity-90">
          © {new Date().getFullYear()} Ink & Ethics Philosophy Club. Dedicated to the pursuit of wisdom.
        </div>

        {/* Center / Right: Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#44474c]">
          <button
            onClick={onOpenArchives}
            className="hover:text-[#041627] transition-colors cursor-pointer"
          >
            Archives
          </button>
          <button
            onClick={onOpenReadingList}
            className="hover:text-[#041627] transition-colors cursor-pointer"
          >
            Reading List
          </button>
          <button
            onClick={onOpenAdminLogin}
            className={`transition-colors cursor-pointer ${
              isAdmin ? 'text-[#041627] font-semibold underline' : 'hover:text-[#041627]'
            }`}
          >
            {isAdmin ? 'Admin Dashboard' : 'Member Login'}
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-[#041627] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Watermark */}
        <div className="hidden lg:block font-serif text-3xl font-bold text-[#041627] opacity-20 tracking-tighter select-none">
          TED
        </div>
      </div>
    </footer>
  );
};
