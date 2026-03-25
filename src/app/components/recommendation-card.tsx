import { CheckCircle, XCircle, Store } from 'lucide-react';
import { Badge } from './badge';

interface RecommendationCardProps {
  dealer: string;
  city: string;
  issue: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  onApprove?: () => void;
  onReject?: () => void;
}

export function RecommendationCard({
  dealer,
  city,
  issue,
  recommendation,
  priority,
  onApprove,
  onReject,
}: RecommendationCardProps) {
  const priorityVariant = {
    high: 'danger' as const,
    medium: 'warning' as const,
    low: 'default' as const,
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#F3F4F6] p-2 rounded-2xl">
            <Store size={20} className="text-[#2563EB]" />
          </div>
          <div>
            <p className="font-semibold text-[14px] text-[#1F2937]">{dealer}</p>
            <p className="text-[12px] text-[#6B7280]">{city}</p>
          </div>
        </div>
        <Badge variant={priorityVariant[priority]}>{priority.toUpperCase()}</Badge>
      </div>
      
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-[12px] text-[#6B7280] mb-1">Issue Detected</p>
          <p className="text-[14px] text-[#1F2937]">{issue}</p>
        </div>
        
        <div>
          <p className="text-[12px] text-[#6B7280] mb-1">Recommended Action</p>
          <p className="text-[14px] text-[#2563EB]">{recommendation}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onApprove}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-2xl hover:bg-[#1D4ED8] transition-colors"
        >
          <CheckCircle size={16} />
          <span className="text-[14px]">Approve</span>
        </button>
        <button
          onClick={onReject}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#F3F4F6] text-[#6B7280] rounded-2xl hover:bg-[#E5E7EB] transition-colors"
        >
          <XCircle size={16} />
          <span className="text-[14px]">Reject</span>
        </button>
      </div>
    </div>
  );
}