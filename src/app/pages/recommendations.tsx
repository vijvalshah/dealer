import { useState } from 'react';
import { Bell, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { RecommendationCard } from '../components/recommendation-card';
import { AIConfidenceCard } from '../components/ai-confidence-card';
import { DealerDetailDrawer } from '../components/dealer-detail-drawer';
import { dealers } from '../data/dealers';

const notifications = [
  { type: 'alert', message: `${dealers.filter(d => d.margin_score < 70).length} dealers require immediate attention for margin protection`, time: '2 hours ago' },
  { type: 'success', message: `${dealers.filter(d => d.bundle_score >= 75).length} dealers showing excellent bundle performance`, time: '5 hours ago' },
  { type: 'info', message: 'New discount optimization model deployed for Maharashtra region', time: '1 day ago' },
  { type: 'alert', message: `${dealers.filter(d => d.competitor_pressure === 'High').length} dealers facing high competitive pressure`, time: '1 day ago' },
];

const recentActions = [
  { action: 'Discount optimization approved for 3 premium dealers', status: 'Completed', time: '3 hours ago' },
  { action: 'Bundle training scheduled for studio format dealers', status: 'In Progress', time: '6 hours ago' },
  { action: 'Premium SKU showcase initiated for brand-dealers', status: 'In Progress', time: '8 hours ago' },
  { action: 'Territory briefing generated for Maharashtra', status: 'Completed', time: '1 day ago' },
];

export function Recommendations() {
  const [selectedDealer, setSelectedDealer] = useState<typeof dealers[0] | null>(null);

  // Prioritize dealers needing attention
  const prioritizedDealers = [...dealers].sort((a, b) => {
    // High priority: low margin score, high discount, low bundle
    const scoreA = (100 - a.margin_score) + parseFloat(a.discount_usage) * 10 + (100 - a.bundle_score);
    const scoreB = (100 - b.margin_score) + parseFloat(b.discount_usage) * 10 + (100 - b.bundle_score);
    return scoreB - scoreA;
  }).slice(0, 12);

  const pendingApprovals = dealers.length;
  const approvedToday = dealers.filter(d => d.reasoning.confidence >= 0.75).length;
  const needsReview = dealers.filter(d => d.reasoning.confidence < 0.7).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-[#1F2937] mb-2">Recommendations</h1>
        <p className="text-[14px] text-[#6B7280]">AI-powered insights and actionable recommendations for dealer revenue uplift</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {prioritizedDealers.map((dealer) => {
            const priority: 'high' | 'medium' | 'low' = 
              dealer.margin_score < 65 ? 'high' :
              dealer.margin_score < 75 ? 'medium' : 'low';

            return (
              <div key={dealer.dealer_id}>
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#F3F4F6] p-2 rounded-xl">
                        <TrendingUp size={20} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-[#1F2937]">{dealer.dealer_name}</p>
                        <p className="text-[12px] text-[#6B7280]">{dealer.city_hint}, {dealer.state}</p>
                        <p className="text-[12px] text-[#9CA3AF] mt-1">{dealer.dealer_type}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${
                        priority === 'high' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                        priority === 'medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                        'bg-[#F3F4F6] text-[#6B7280]'
                      }`}>
                        {priority.toUpperCase()}
                      </span>
                      <span className={`text-[12px] font-semibold ${
                        dealer.margin_score >= 70 ? 'text-[#16A34A]' :
                        dealer.margin_score >= 50 ? 'text-[#F59E0B]' :
                        'text-[#EF4444]'
                      }`}>
                        Margin: {dealer.margin_score}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-[12px] text-[#6B7280] mb-1">Issue Detected</p>
                      <p className="text-[14px] text-[#1F2937]">
                        Current discount at {dealer.current_discount} | Bundle score: {dealer.bundle_score} | Premium ratio: {dealer.premium_ratio}
                      </p>
                    </div>
                    
                    <div className="bg-[#EFF6FF] rounded-xl p-4">
                      <p className="text-[12px] font-semibold text-[#1E40AF] mb-2">{dealer.reasoning.decision}</p>
                      <p className="text-[14px] text-[#2563EB] mb-3">{dealer.action_recommendation}</p>
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-white rounded-lg p-2">
                          <p className="text-[10px] text-[#6B7280]">Confidence</p>
                          <p className={`text-[14px] font-semibold ${
                            dealer.reasoning.confidence >= 0.8 ? 'text-[#16A34A]' :
                            dealer.reasoning.confidence >= 0.6 ? 'text-[#F59E0B]' :
                            'text-[#EF4444]'
                          }`}>
                            {(dealer.reasoning.confidence * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-2">
                          <p className="text-[10px] text-[#6B7280]">Revenue</p>
                          <p className="text-[14px] font-semibold text-[#16A34A]">{dealer.reasoning.expected_revenue_impact}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2">
                          <p className="text-[10px] text-[#6B7280]">Margin</p>
                          <p className="text-[14px] font-semibold text-[#16A34A]">{dealer.reasoning.margin_impact}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-[#6B7280] mb-2">Key Drivers</p>
                      <ul className="space-y-1">
                        {dealer.reasoning.primary_drivers.slice(0, 2).map((driver, idx) => (
                          <li key={idx} className="text-[12px] text-[#1F2937] flex items-start gap-2">
                            <span className="text-[#16A34A] mt-0.5">•</span>
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-[#6B7280] mb-1">Next Action</p>
                      <p className="text-[12px] text-[#2563EB]">{dealer.reasoning.recommended_next_action}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl hover:bg-[#1D4ED8] transition-colors">
                      <CheckCircle size={16} />
                      <span className="text-[14px]">Approve</span>
                    </button>
                    <button 
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#F3F4F6] text-[#6B7280] rounded-xl hover:bg-[#E5E7EB] transition-colors"
                      onClick={() => setSelectedDealer(dealer)}
                    >
                      <span className="text-[14px]">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-[#2563EB]" />
              <h3>Notifications</h3>
            </div>
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div key={index} className="pb-3 border-b border-[#E5E7EB] last:border-0">
                  <p className="text-[14px] text-[#1F2937] mb-1">{notif.message}</p>
                  <p className="text-[12px] text-[#9CA3AF]">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-[#2563EB]" />
              <h3>Recent Actions</h3>
            </div>
            <div className="space-y-3">
              {recentActions.map((action, index) => (
                <div key={index} className="pb-3 border-b border-[#E5E7EB] last:border-0">
                  <p className="text-[14px] text-[#1F2937] mb-1">{action.action}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] ${
                      action.status === 'Completed' ? 'text-[#16A34A]' :
                      action.status === 'In Progress' ? 'text-[#F59E0B]' :
                      'text-[#2563EB]'
                    }`}>
                      {action.status}
                    </span>
                    <span className="text-[12px] text-[#9CA3AF]">{action.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] border border-[#93C5FD] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-[#1E40AF]" />
              <h4 className="text-[#1E40AF]">Quick Stats</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[14px] text-[#1E40AF]">Pending Approvals</span>
                <span className="text-[14px] font-semibold text-[#1E40AF]">{pendingApprovals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[14px] text-[#1E40AF]">High Confidence</span>
                <span className="text-[14px] font-semibold text-[#1E40AF]">{approvedToday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[14px] text-[#1E40AF]">Needs Review</span>
                <span className="text-[14px] font-semibold text-[#1E40AF]">{needsReview}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#93C5FD]">
                <span className="text-[14px] text-[#1E40AF]">Avg Confidence</span>
                <span className="text-[14px] font-semibold text-[#1E40AF]">
                  {((dealers.reduce((sum, d) => sum + d.reasoning.confidence, 0) / dealers.length) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          <AIConfidenceCard
            confidence={0.76}
            reasons={[
              'Comprehensive dealer data from 32 Maharashtra locations',
              'Validated competitor intelligence and footfall proxies',
              'Proven format-specific strategies (experience-center, grande, studio, etc.)'
            ]}
            changeTriggers={[
              'Sudden competitor price war in key markets',
              'Major format changes or dealer type transitions',
              'Seasonal demand shifts outside historical patterns'
            ]}
            missingData={[
              'Real-time SKU-level inventory data',
              'Actual customer transaction history',
              'Precise footfall counts (using proxy estimates)'
            ]}
            humanVerification="Verify local market conditions and dealer relationship factors before final approval"
          />
        </div>
      </div>

      {selectedDealer && (
        <DealerDetailDrawer
          dealer={selectedDealer}
          onClose={() => setSelectedDealer(null)}
        />
      )}
    </div>
  );
}
