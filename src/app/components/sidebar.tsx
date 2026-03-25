import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Users, Lightbulb } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/dealer-intelligence', label: 'Dealer Intelligence', icon: Users },
  { path: '/recommendations', label: 'Recommendations', icon: Lightbulb },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-[#E5E7EB] h-screen flex flex-col">
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="Platform icon" className="h-8 w-8 rounded-md object-cover" />
          <h1 className="text-[#1F2937]">Dealer Intelligence Platform</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
