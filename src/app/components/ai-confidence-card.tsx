import { Brain, AlertCircle } from 'lucide-react';

interface AIConfidenceCardProps {
  confidence: number;
  reasons: string[];
  changeTriggers: string[];
  missingData?: string[];
  humanVerification?: string;
}

export function AIConfidenceCard({
  confidence,
  reasons,
  changeTriggers,
  missingData = [],
  humanVerification
}: AIConfidenceCardProps) {
  const confidenceColor = confidence >= 0.8 ? 'text-[#16A34A]' : confidence >= 0.6 ? 'text-[#F59E0B]' : 'text-[#EF4444]';
  const confidenceBg = confidence >= 0.8 ? 'bg-[#D1FAE5]' : confidence >= 0.6 ? 'bg-[#FEF3C7]' : 'bg-[#FEE2E2]';

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-[#2563EB] bg-opacity-10 p-2 rounded-lg">
          <Brain size={18} className="text-[#2563EB]" />
        </div>
        <div className="flex-1">
          <h4 className="text-[#1F2937] mb-1">AI Confidence</h4>
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${confidenceBg}`}>
            <span className={`text-[14px] font-semibold ${confidenceColor}`}>
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[12px] font-semibold text-[#6B7280] mb-2">Why confident:</p>
          <ul className="space-y-1">
            {reasons.map((reason, idx) => (
              <li key={idx} className="text-[12px] text-[#1F2937] flex items-start gap-2">
                <span className="text-[#16A34A] mt-0.5">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[12px] font-semibold text-[#6B7280] mb-2">Decision would change if:</p>
          <ul className="space-y-1">
            {changeTriggers.map((trigger, idx) => (
              <li key={idx} className="text-[12px] text-[#1F2937] flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">⚠</span>
                <span>{trigger}</span>
              </li>
            ))}
          </ul>
        </div>

        {missingData.length > 0 && (
          <div>
            <p className="text-[12px] font-semibold text-[#6B7280] mb-2">Missing data:</p>
            <ul className="space-y-1">
              {missingData.map((data, idx) => (
                <li key={idx} className="text-[12px] text-[#6B7280] flex items-start gap-2">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{data}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {humanVerification && (
          <div className="pt-3 border-t border-[#E5E7EB]">
            <p className="text-[12px] font-semibold text-[#2563EB] mb-1">Human should verify:</p>
            <p className="text-[12px] text-[#6B7280]">{humanVerification}</p>
          </div>
        )}
      </div>
    </div>
  );
}
