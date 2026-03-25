import { useState } from 'react';
import { MapPlaceholder } from '../components/map-placeholder';
import { ChartPlaceholder } from '../components/chart-placeholder';
import { StatCard } from '../components/stat-card';
import { Badge } from '../components/badge';
import { DealerDetailDrawer } from '../components/dealer-detail-drawer';
import { AIConfidenceCard } from '../components/ai-confidence-card';
import { Users, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';
import { dealers } from '../data/dealers';

const tabs = ['Heatmap', 'Dealer List', 'Discount Optimization', 'Bundling Insights', 'Competitor Monitoring'];

export function DealerIntelligence() {
  const [activeTab, setActiveTab] = useState('Heatmap');
  const [selectedDealer, setSelectedDealer] = useState<typeof dealers[0] | null>(null);

  const avgMargin = (dealers.reduce((sum, d) => sum + d.margin_score, 0) / dealers.length).toFixed(1);
  const mediumHighPressure = dealers.filter(d => d.competitor_pressure === 'Medium' || d.competitor_pressure === 'High').length;
  const lowBundleDealers = dealers.filter(d => d.bundle_score < 65).length;
  const highBundleDealers = dealers.filter(d => d.bundle_score >= 75).length;
  const premiumHeavy = dealers.filter(d => parseFloat(d.premium_ratio) >= 50).length;
  const economyHeavy = dealers.filter(d => parseFloat(d.premium_ratio) < 40).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-[#1F2937] mb-2">Dealer Intelligence</h1>
        <p className="text-[14px] text-[#6B7280]">Deep insights into dealer performance and revenue opportunities</p>
      </div>

      <div className="mb-6 border-b border-[#E5E7EB]">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-[14px] font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-[#E5E7EB]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Heatmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapPlaceholder />
          </div>
          <div className="space-y-6">
            <StatCard title="Dealers in Region" value={dealers.length} icon={Users} variant="default" />
            <StatCard title="Avg Margin" value={`${avgMargin}%`} icon={DollarSign} variant="success" />
            <StatCard title="Competitor Pressure" value={mediumHighPressure} icon={AlertCircle} variant="warning" />
            <StatCard title="Alerts" value={lowBundleDealers} icon={TrendingUp} variant="danger" />
          </div>
          <div className="lg:col-span-3 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl border border-[#93C5FD] p-6">
            <h3 className="text-[#1E40AF] mb-4">AI Territory Briefing</h3>
            <p className="text-[14px] text-[#1E40AF] leading-relaxed mb-4">
              Maharashtra network shows solid performance with average margin at {avgMargin}%. Premium dealers (experience centers, exclusive, duragres-lounge) demonstrate strong margin protection with scores above 75%. 
            </p>
            <p className="text-[14px] text-[#1E40AF] leading-relaxed mb-4">
              Key opportunities identified: {lowBundleDealers} dealers show bundle scores below 65, indicating cross-sell expansion potential. Studios and bath-studios should prioritize complete solution selling over pure discounting.
            </p>
            <p className="text-[14px] text-[#1E40AF] leading-relaxed">
              Competitive pressure is manageable across most territories. Mumbai, Pune, and Nagpur show higher competitor density but dealer format differentiation provides protection. Recommend premium SKU push for brand-dealers and grande formats, while studio/bath-studio formats should focus on basket expansion through tile + bathware + adhesive bundles.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'Dealer List' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E5E7EB]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Dealer</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">City</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Margin</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Bundle %</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Premium %</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Pressure</th>
                      <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {dealers.map((dealer) => (
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
                        <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.bundle_score}</td>
                        <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.premium_ratio}</td>
                        <td className="px-6 py-4">
                          <Badge variant={dealer.competitor_pressure === 'High' ? 'danger' : dealer.competitor_pressure === 'Medium' ? 'warning' : 'success'}>
                            {dealer.competitor_pressure}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-[12px] text-[#2563EB]">{dealer.action_recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h3 className="mb-4">Performance Charts</h3>
              <div className="space-y-4">
                <ChartPlaceholder title="Sales Trend" height="h-[150px]" />
                <ChartPlaceholder title="SKU Mix" height="h-[150px]" />
                <ChartPlaceholder title="Bundle Mix" height="h-[150px]" />
              </div>
            </div>
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4">
              <h4 className="text-[#1E40AF] mb-2">Recommendation</h4>
              <p className="text-[12px] text-[#1E40AF]">
                Click any dealer row to view detailed intelligence including competitor analysis, footfall proxies, and AI-powered recommendations.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Discount Optimization' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Dealer</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Current</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Recommended</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Demand</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Competition</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Reasoning</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Confidence</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {dealers.slice(0, 12).map((dealer) => (
                    <tr key={dealer.dealer_id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4 text-[14px] text-[#1F2937] font-medium">{dealer.dealer_name}</td>
                      <td className="px-6 py-4 text-[14px] text-[#EF4444] font-semibold">{dealer.current_discount}</td>
                      <td className="px-6 py-4 text-[14px] text-[#16A34A] font-semibold">{dealer.recommended_discount}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.demand_score}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.competitor_score}</td>
                      <td className="px-6 py-4 text-[12px] text-[#2563EB] max-w-xs">{dealer.reasoning.decision}</td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          dealer.reasoning.confidence >= 0.8 ? 'success' :
                          dealer.reasoning.confidence >= 0.6 ? 'warning' :
                          'danger'
                        }>
                          {(dealer.reasoning.confidence * 100).toFixed(0)}%
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-[#2563EB] text-white rounded-lg text-[12px] hover:bg-[#1D4ED8]">
                            Approve
                          </button>
                          <button 
                            className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-lg text-[12px] hover:bg-[#E5E7EB]"
                            onClick={() => setSelectedDealer(dealer)}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Bundling Insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Low Bundle Dealers" value={lowBundleDealers} variant="danger" />
            <StatCard title="High Bundle Dealers" value={highBundleDealers} variant="success" />
            <StatCard title="Premium Heavy" value={premiumHeavy} variant="default" />
            <StatCard title="Economy Heavy" value={economyHeavy} variant="warning" />
          </div>
          
          <div className="bg-white rounded-2xl border border-[#E5E7EB]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Dealer</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Tiles %</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Bathware %</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Adhesive %</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Bundle Score</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {dealers.map((dealer) => (
                    <tr key={dealer.dealer_id} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer" onClick={() => setSelectedDealer(dealer)}>
                      <td className="px-6 py-4 text-[14px] text-[#1F2937] font-medium">{dealer.dealer_name}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.tiles_percent}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.bathware_percent}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.adhesive_percent}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[14px] font-semibold ${dealer.bundle_score >= 70 ? 'text-[#16A34A]' : dealer.bundle_score >= 60 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                          {dealer.bundle_score}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[12px] text-[#2563EB]">{dealer.reasoning.recommended_next_action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Competitor Monitoring' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Dealer</th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">City</th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Competitors</th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Reviews</th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Footfall</th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#6B7280] uppercase">Threat Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {dealers.map((dealer) => {
                  const avgThreat = dealer.nearby_competitors.reduce((sum, c) => {
                    const score = c.threat_level === 'high' ? 3 : c.threat_level === 'medium' ? 2 : 1;
                    return sum + score;
                  }, 0) / dealer.nearby_competitors.length;
                  const threatLevel = avgThreat >= 2.5 ? 'high' : avgThreat >= 1.5 ? 'medium' : 'low';
                  
                  return (
                    <tr key={dealer.dealer_id} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer" onClick={() => setSelectedDealer(dealer)}>
                      <td className="px-6 py-4 text-[14px] text-[#1F2937] font-medium">{dealer.dealer_name}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.city_hint}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.nearby_competitors.length}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">⭐ {dealer.google_rating_proxy}</td>
                      <td className="px-6 py-4 text-[14px] text-[#6B7280]">{dealer.google_review_count_proxy}</td>
                      <td className="px-6 py-4">
                        <Badge variant={dealer.footfall_proxy === 'high' ? 'success' : dealer.footfall_proxy === 'medium' ? 'warning' : 'default'}>
                          {dealer.footfall_proxy}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={threatLevel === 'high' ? 'danger' : threatLevel === 'medium' ? 'warning' : 'success'}>
                          {threatLevel}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedDealer && (
        <DealerDetailDrawer
          dealer={selectedDealer}
          onClose={() => setSelectedDealer(null)}
        />
      )}
    </div>
  );
}
