import { Menu } from 'lucide-react';
import Logo from '../../components/common/Logo';

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E3F5] bg-[#FAF9FF]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Menu */}
        <button
          type="button"
          aria-label="Mở menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6C5CE7] transition-colors hover:bg-[#F0EEFF]"
        >
          <Menu
            size={20}
            strokeWidth={1.8}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;