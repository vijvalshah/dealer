import { BarChart3 } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  height?: string;
}

export function ChartPlaceholder({ title, height = 'h-[200px]' }: ChartPlaceholderProps) {
  return (
    <div className={`w-full ${height} bg-[#F3F4F6] rounded-2xl border border-[#E5E7EB] flex items-center justify-center`}>
      <div className="text-center">
        <BarChart3 size={32} className="text-[#9CA3AF] mx-auto mb-2" />
        <p className="text-[12px] text-[#6B7280]">{title}</p>
      </div>
    </div>
  );
}