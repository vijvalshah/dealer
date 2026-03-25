import { useState } from 'react';
import { Users, AlertTriangle, TrendingDown, Target } from 'lucide-react';
import { StatCard } from '../components/stat-card';
import { Badge } from '../components/badge';
import { InsightPanel } from '../components/insight-panel';
import { DealerDetailDrawer } from '../components/dealer-detail-drawer';
import { dealers } from '../data/dealers';

const insights = [
  { issue: 'Over discounting', count: 12, severity: 'high' as const },
  { issue: 'Low premium sales', count: 14, severity: 'high' as const },
  { issue: 'Competitor nearby', count: 18, severity: 'medium' as const },
  { issue: 'Low bundling', count: 11, severity: 'medium' as const },
  { issue: 'Seasonal demand drop', count: 6, severity: 'low' as const },
];

export function Overview() {
  const [selectedDealer, setSelectedDealer] = useState<typeof dealers[0] | null>(null);

  const dealersUnderRisk = dealers.filter(d => d.margin_score < 70).length;
  const marginLeakageSignals = dealers.filter(d => parseFloat(d.discount_usage) > 6).length;
  const activeRecommendations = dealers.length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-[#1F2937] mb-2">Overview</h1>
        <p className="text-[14px] text-[#6B7280]">Monitor dealer performance and identify key opportunities across Maharashtra</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Dealers"
          value={dealers.length}
          icon={Users}
          trend={{ value: '8 new this month', isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Dealers Under Risk"
          value={dealersUnderRisk}
          icon={AlertTriangle}
          trend={{ value: `${((dealersUnderRisk/dealers.length)*100).toFixed(0)}% of network`, isPositive: false }}
          variant="danger"
        />
        <StatCard
          title="Margin Leakage Signals"
          value={marginLeakageSignals}
          icon={TrendingDown}
          trend={{ value: 'High discount usage', isPositive: false }}
          variant="warning"
        />
        <StatCard
          title="Active Recommendations"
          value={activeRecommendations}
          icon={Target}
          trend={{ value: 'AI-generated insights', isPositive: true }}
          variant="success"
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] mb-8">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h2>Dealer Performance Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Dealer</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Margin Score</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Discount Usage</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Bundle Score</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Competitor Pressure</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Action Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {dealers.slice(0, 10).map((dealer) => (
                <tr 
                  key={dealer.dealer_id} 
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  onClick={() => setSelectedDealer(dealer)}
                >
                  <td className="px-6 py-4 text-[14px] text-[#1F2937] font-medium">{dealer.dealer_name}</td>
                  <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.city_hint}</td>
                  <td className="px-6 py-4">
                    <Badge variant="default">{dealer.dealer_type}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[14px] font-semibold ${dealer.margin_score >= 70 ? 'text-[#16A34A]' : dealer.margin_score >= 50 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                      {dealer.margin_score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.discount_usage}</td>
                  <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.bundle_score}</td>
                  <td className="px-6 py-4">
                    <Badge variant={dealer.competitor_pressure === 'High' ? 'danger' : dealer.competitor_pressure === 'Medium' ? 'warning' : 'success'}>
                      {dealer.competitor_pressure}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-[14px]">{dealer.trend}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      dealer.margin_score < 65 ? 'danger' : 
                      dealer.margin_score < 75 ? 'warning' : 
                      'default'
                    }>
                      {dealer.margin_score < 65 ? 'Urgent' : dealer.margin_score < 75 ? 'Review' : 'Monitor'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightPanel title="Common Issues Across Network" insights={insights} />

      {selectedDealer && (
        <DealerDetailDrawer
          dealer={selectedDealer}
          onClose={() => setSelectedDealer(null)}
        />
      )}
    </div>
  );
}
