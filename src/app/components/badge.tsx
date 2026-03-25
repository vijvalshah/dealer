interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-[#F3F4F6] text-[#6B7280]',
    success: 'bg-[#D1FAE5] text-[#16A34A]',
    warning: 'bg-[#FEF3C7] text-[#F59E0B]',
    danger: 'bg-[#FEE2E2] text-[#EF4444]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
