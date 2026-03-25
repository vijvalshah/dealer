import { Outlet } from 'react-router';
import { Sidebar } from './components/sidebar';
import { Topbar } from './components/topbar';

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-[#F5F7FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
