import { Outlet } from 'react-router-dom';

import Header from './Header';
import BottomNavigation from './BottomNavigation';

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F7F7F8] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-5 py-4">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}

export default AppLayout;