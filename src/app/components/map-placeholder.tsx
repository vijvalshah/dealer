import { MapPin } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <div className="w-full h-full min-h-[400px] bg-[#F3F4F6] rounded-2xl border border-[#E5E7EB] flex items-center justify-center">
      <div className="text-center">
        <MapPin size={48} className="text-[#9CA3AF] mx-auto mb-2" />
        <p className="text-[14px] text-[#6B7280]">Map View</p>
        <p className="text-[12px] text-[#9CA3AF] mt-1">Maharashtra Dealer Heatmap Visualization</p>
      </div>
    </div>
  );
}