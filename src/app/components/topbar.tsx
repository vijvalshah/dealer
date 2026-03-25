import { Bell, Search, User } from 'lucide-react';

export function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search dealers, cities, insights..."
            className="w-full pl-10 pr-4 py-2 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-[14px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-[#E5E7EB]">
          <div className="text-right">
            <p className="text-[14px] font-medium text-[#1F2937]">Admin User</p>
            <p className="text-[12px] text-[#6B7280]">admin@ceramics.com</p>
          </div>
          <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
