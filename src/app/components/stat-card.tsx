import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'danger' | 'success' | 'warning';
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const variantColors = {
    default: 'text-[#2563EB]',
    danger: 'text-[#EF4444]',
    success: 'text-[#16A34A]',
    warning: 'text-[#F59E0B]',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[12px] text-[#6B7280] mb-2">{title}</p>
          <p className="text-[24px] font-semibold text-[#1F2937]">{value}</p>
          {trend && (
            <p className={`text-[12px] mt-2 ${trend.isPositive ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`${variantColors[variant]} opacity-80`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}