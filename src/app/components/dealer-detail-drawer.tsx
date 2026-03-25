import { X, Store, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Dealer } from '../data/dealers';
import { ChartPlaceholder } from './chart-placeholder';
import { Badge } from './badge';

interface DealerDetailDrawerProps {
  dealer: Dealer;
  onClose: () => void;
}

export function DealerDetailDrawer({ dealer, onClose }: DealerDetailDrawerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#2563EB] bg-opacity-10 p-3 rounded-2xl">
              <Store size={24} className="text-[#2563EB]" />
            </div>
            <div>
              <h2>{dealer.dealer_name}</h2>
              <p className="text-[14px] text-[#6B7280]">{dealer.city_hint}, {dealer.state}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            <X size={20} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div className="bg-[#F9FAFB] rounded-2xl p-6">
            <h3 className="mb-4">Dealer Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-[#6B7280] mb-1">Dealer Type</p>
                <Badge variant="default">{dealer.dealer_type}</Badge>
              </div>
              <div>
                <p className="text-[12px] text-[#6B7280] mb-1">Margin Score</p>
                <p className={`text-[16px] font-semibold ${dealer.margin_score >= 70 ? 'text-[#16A34A]' : dealer.margin_score >= 50 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                  {dealer.margin_score}%
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#6B7280] mb-1">Bundle Score</p>
                <p className="text-[16px] font-semibold text-[#1F2937]">{dealer.bundle_score}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6B7280] mb-1">Premium Ratio</p>
                <p className="text-[16px] font-semibold text-[#1F2937]">{dealer.premium_ratio}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6B7280] mb-1">Rating</p>
                <p className="text-[16px] font-semibold text-[#1F2937]">⭐ {dealer.google_rating_proxy}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#6B7280] mb-1">Reviews</p>
                <p className="text-[16px] font-semibold text-[#1F2937]">{dealer.google_review_count_proxy}</p>
              </div>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="space-y-4">
            <h3>Performance Trends</h3>
            <ChartPlaceholder title="Revenue Trend (Last 12 Months)" height="h-[180px]" />
            <ChartPlaceholder title="SKU Mix Distribution" height="h-[180px]" />
            <ChartPlaceholder title="Bundle Performance" height="h-[180px]" />
          </div>

          {/* Product Mix */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h3 className="mb-4">Product Mix</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#6B7280]">Tiles</span>
                <span className="text-[14px] font-semibold text-[#1F2937]">{dealer.tiles_percent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#6B7280]">Bathware</span>
                <span className="text-[14px] font-semibold text-[#1F2937]">{dealer.bathware_percent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#6B7280]">Adhesive</span>
                <span className="text-[14px] font-semibold text-[#1F2937]">{dealer.adhesive_percent}</span>
              </div>
            </div>
          </div>

          {/* Competitor Intelligence */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h3 className="mb-4">Nearby Competitors</h3>
            <div className="space-y-3">
              {dealer.nearby_competitors.map((comp, idx) => (
                <div key={idx} className="p-3 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[14px] font-semibold text-[#1F2937]">{comp.name}</p>
                    <Badge variant={comp.threat_level === 'high' ? 'danger' : comp.threat_level === 'medium' ? 'warning' : 'success'}>
                      {comp.threat_level}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[12px] text-[#6B7280]">
                    <div>Distance: {comp.distance_km}km</div>
                    <div>Rating: ⭐ {comp.rating_proxy}</div>
                    <div>Reviews: {comp.review_count_proxy}</div>
                    <div>Footfall: {comp.footfall_proxy}</div>
                    <div className="col-span-2">Busy Hours: {comp.busy_hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footfall & Business Intelligence */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h3 className="mb-4">Business Intelligence</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[14px] text-[#6B7280]">Footfall Proxy</span>
                <Badge variant={dealer.footfall_proxy === 'high' ? 'success' : dealer.footfall_proxy === 'medium' ? 'warning' : 'default'}>
                  {dealer.footfall_proxy}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[14px] text-[#6B7280]">Busy Hours</span>
                <span className="text-[14px] text-[#1F2937]">{dealer.busy_hours_proxy}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[14px] text-[#6B7280]">Competitor Pressure</span>
                <Badge variant={dealer.competitor_pressure === 'High' ? 'danger' : dealer.competitor_pressure === 'Medium' ? 'warning' : 'success'}>
                  {dealer.competitor_pressure}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#6B7280]">Discount Band</span>
                <span className="text-[14px] text-[#1F2937]">{dealer.discount_band}</span>
              </div>
            </div>
          </div>

          {/* AI Recommendation & Reasoning */}
          <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl border border-[#93C5FD] p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-[#2563EB] p-2 rounded-lg">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#1E40AF]">{dealer.reasoning.decision}</h3>
                <p className="text-[12px] text-[#1E40AF] mt-1">{dealer.action_recommendation}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[12px] font-semibold text-[#1E40AF] mb-2">Primary Drivers</p>
                <ul className="space-y-1">
                  {dealer.reasoning.primary_drivers.map((driver, idx) => (
                    <li key={idx} className="text-[12px] text-[#1E40AF] flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#1E40AF] mb-2">Supporting Evidence</p>
                <ul className="space-y-1">
                  {dealer.reasoning.supporting_evidence.map((evidence, idx) => (
                    <li key={idx} className="text-[12px] text-[#1E40AF] flex items-start gap-2">
                      <span className="text-[#3B82F6]">•</span>
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#1E40AF] mb-2">Counterpoint Analysis</p>
                <p className="text-[12px] text-[#1E40AF] leading-relaxed">{dealer.reasoning.counterpoint}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#93C5FD]">
                <div>
                  <p className="text-[12px] text-[#1E40AF] mb-1">Confidence</p>
                  <p className="text-[16px] font-semibold text-[#1E40AF]">{(dealer.reasoning.confidence * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#1E40AF] mb-1">Revenue Impact</p>
                  <p className="text-[16px] font-semibold text-[#16A34A]">{dealer.reasoning.expected_revenue_impact}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#1E40AF] mb-1">Margin Impact</p>
                  <p className="text-[16px] font-semibold text-[#16A34A]">{dealer.reasoning.margin_impact}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[12px] text-[#1E40AF] mb-1">Next Action</p>
                  <p className="text-[12px] font-semibold text-[#1E40AF]">{dealer.reasoning.recommended_next_action}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E5E7EB]">
            <button className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-2xl hover:bg-[#1D4ED8] transition-colors">
              <span className="text-[14px] font-medium">Approve Recommendation</span>
            </button>
            <button className="flex-1 px-6 py-3 bg-[#F3F4F6] text-[#6B7280] rounded-2xl hover:bg-[#E5E7EB] transition-colors">
              <span className="text-[14px] font-medium">Request Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
