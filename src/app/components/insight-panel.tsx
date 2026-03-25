import { AlertCircle } from 'lucide-react';

interface InsightItem {
  issue: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
}

interface InsightPanelProps {
  title: string;
  insights: InsightItem[];
}

export function InsightPanel({ title, insights }: InsightPanelProps) {
  const severityColors = {
    high: 'text-[#EF4444]',
    medium: 'text-[#F59E0B]',
    low: 'text-[#6B7280]',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      <h3 className="mb-4">{title}</h3>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-0">
            <div className="flex items-center gap-3">
              <AlertCircle size={16} className={severityColors[insight.severity]} />
              <span className="text-[14px] text-[#1F2937]">{insight.issue}</span>
            </div>
            <span className="text-[14px] font-semibold text-[#6B7280]">{insight.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}