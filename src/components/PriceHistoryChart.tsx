import { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar, 
  Info, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';
import { getModelPriceHistory, TimeRange } from '../data/priceHistoryData';

interface PriceHistoryChartProps {
  brand: string;
  model: string;
  currentCarPrice?: number; // Price of the specific car in listing (in millions VND)
  currentCarYear?: number;
  className?: string;
  title?: string;
}

export default function PriceHistoryChart({
  brand,
  model,
  currentCarPrice,
  currentCarYear,
  className = '',
  title
}: PriceHistoryChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('6M');

  const history = useMemo(() => {
    return getModelPriceHistory(brand, model, timeRange, currentCarPrice);
  }, [brand, model, timeRange, currentCarPrice]);

  const formatPriceShort = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2).replace(/\.?0+$/, '')} Tỷ`;
    }
    return `${val} Tr`;
  };

  const formatPriceFull = (val: number) => {
    if (val >= 1000) {
      const ty = Math.floor(val / 1000);
      const tr = val % 1000;
      return tr > 0 ? `${ty} tỷ ${tr} triệu` : `${ty} tỷ`;
    }
    return `${val} triệu`;
  };

  // Compare current car price with market average
  const priceComparison = useMemo(() => {
    if (!currentCarPrice) return null;
    const diff = currentCarPrice - history.currentAvgPrice;
    const diffPct = parseFloat(((diff / history.currentAvgPrice) * 100).toFixed(1));
    return {
      diff,
      diffPct,
      isLower: diff < 0,
      isEqual: Math.abs(diffPct) <= 1
    };
  }, [currentCarPrice, history.currentAvgPrice]);

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-[#9F224E]/10 text-[#9F224E] rounded-md">
              <BarChart3 size={16} />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9F224E]">
              Thống kê thị trường xe cũ V-Car
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            {title || `Biểu đồ biến động giá ${brand} ${model} trên thị trường`}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Biến thiên mức giá rao bán của các mẫu {brand} {model} {currentCarYear ? `(đời ${currentCarYear})` : ''} tổng hợp theo thời gian
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg self-start sm:self-auto border border-gray-200">
          {(
            [
              { key: '1M', label: '1 tháng' },
              { key: '3M', label: '3 tháng' },
              { key: '6M', label: '6 tháng' },
              { key: '1Y', label: '1 năm' }
            ] as const
          ).map(tab => (
            <button
              key={tab.key}
              onClick={() => setTimeRange(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                timeRange === tab.key
                  ? 'bg-white text-[#9F224E] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {/* Metric 1: Current Avg Price */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="text-[11px] font-semibold text-gray-500 uppercase">Giá TB thị trường</div>
          <div className="text-lg font-black text-gray-900 mt-0.5">
            {formatPriceShort(history.currentAvgPrice)}
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">Khảo sát trên các tin rao</div>
        </div>

        {/* Metric 2: Price Fluctuation in Period */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="text-[11px] font-semibold text-gray-500 uppercase">Biến động ({timeRange === '1M' ? '1 tháng' : timeRange === '3M' ? '3 tháng' : timeRange === '6M' ? '6 tháng' : '1 năm'})</div>
          <div className="flex items-center gap-1 mt-0.5">
            {history.priceChangePercent < 0 ? (
              <span className="inline-flex items-center text-rose-600 font-extrabold text-lg">
                <ArrowDownRight size={18} /> {Math.abs(history.priceChangePercent)}%
              </span>
            ) : history.priceChangePercent > 0 ? (
              <span className="inline-flex items-center text-emerald-600 font-extrabold text-lg">
                <ArrowUpRight size={18} /> +{history.priceChangePercent}%
              </span>
            ) : (
              <span className="inline-flex items-center text-gray-600 font-extrabold text-lg">
                <Minus size={18} /> 0%
              </span>
            )}
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5 font-medium">
            {history.priceChangeValue < 0 ? `Giảm ~${Math.abs(history.priceChangeValue)} triệu` : `Tăng ~${history.priceChangeValue} triệu`}
          </div>
        </div>

        {/* Metric 3: Market Price Range */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="text-[11px] font-semibold text-gray-500 uppercase">Khoảng giá phổ biến</div>
          <div className="text-base font-bold text-gray-800 mt-0.5 truncate">
            {formatPriceShort(history.minMarketPrice)} - {formatPriceShort(history.maxMarketPrice)}
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">Tùy ODO & hiện trạng</div>
        </div>

        {/* Metric 4: Listing Market Assessment */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="text-[11px] font-semibold text-gray-500 uppercase">Xu hướng thị trường</div>
          <div className="text-sm font-bold text-gray-900 mt-0.5 truncate" title={history.trendText}>
            {history.trendText}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
            <ShieldCheck size={13} /> Thanh khoản tốt
          </div>
        </div>
      </div>

      {/* Comparison with this specific car (if currentCarPrice provided) */}
      {priceComparison && (
        <div className={`p-3 rounded-lg border mb-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          priceComparison.isLower 
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${priceComparison.isLower ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            <span>
              Xe này đang rao bán: <strong>{formatPriceFull(currentCarPrice)}</strong>{' '}
              {priceComparison.isEqual ? (
                '— ngang bằng với mức giá bình quân của dòng xe này trên thị trường.'
              ) : priceComparison.isLower ? (
                <span>
                  — <strong>thấp hơn {Math.abs(priceComparison.diffPct)}%</strong> (~{Math.abs(priceComparison.diff)} triệu) so với mức giá bình quân thị trường. Mức giá rất cạnh tranh!
                </span>
              ) : (
                <span>
                  — <strong>cao hơn {priceComparison.diffPct}%</strong> so với giá trung bình thị trường (thường do xe lướt ODO thấp, phiên bản cao hoặc có gói phụ kiện giá trị).
                </span>
              )}
            </span>
          </div>
          <div className="text-[11px] text-gray-500 whitespace-nowrap font-medium self-end sm:self-auto">
            (Đường nét đứt màu đỏ trên biểu đồ)
          </div>
        </div>
      )}

      {/* Chart Visualization Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history.data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              {/* Gradient fill for average price */}
              <linearGradient id="priceAvgGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9F224E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#9F224E" stopOpacity={0.0} />
              </linearGradient>
              {/* Gradient for min-max spread */}
              <linearGradient id="priceSpreadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CBD5E1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#CBD5E1" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

            <XAxis 
              dataKey="timeLabel" 
              tick={{ fontSize: 11, fill: '#64748B' }} 
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={false}
            />

            <YAxis 
              tick={{ fontSize: 11, fill: '#64748B' }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={formatPriceShort}
              domain={['dataMin - 50', 'dataMax + 50']}
            />

            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-900/95 backdrop-blur text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 border border-gray-800 min-w-[190px]">
                      <div className="font-bold text-gray-300 border-b border-gray-700/80 pb-1 flex items-center justify-between">
                        <span>Thời điểm: {label}</span>
                        <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded font-normal">
                          {data.listingCount} tin rao
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-rose-300 font-bold">
                        <span>Giá trung bình:</span>
                        <span className="text-white text-sm">{formatPriceFull(data.avgPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400 text-[11px]">
                        <span>Khoảng giá thị trường:</span>
                        <span className="text-gray-200">{formatPriceShort(data.minPrice)} - {formatPriceShort(data.maxPrice)}</span>
                      </div>
                      {currentCarPrice && (
                        <div className="border-t border-gray-800 pt-1 flex justify-between items-center text-[11px] text-amber-300">
                          <span>Xe này đang rao:</span>
                          <span className="font-bold">{formatPriceShort(currentCarPrice)}</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Reference Line for Current Specific Car if available */}
            {currentCarPrice && (
              <ReferenceLine 
                y={currentCarPrice} 
                stroke="#DC2626" 
                strokeDasharray="4 4" 
                strokeWidth={1.5}
                label={{ 
                  value: `Xe này: ${formatPriceShort(currentCarPrice)}`, 
                  position: 'insideTopRight', 
                  fill: '#DC2626', 
                  fontSize: 10,
                  fontWeight: 'bold'
                }} 
              />
            )}

            {/* Max band area */}
            <Area 
              type="monotone" 
              dataKey="maxPrice" 
              stroke="transparent" 
              fill="url(#priceSpreadGradient)" 
              name="Khoảng giá cao nhất"
            />

            {/* Avg price main line */}
            <Area 
              type="monotone" 
              dataKey="avgPrice" 
              stroke="#9F224E" 
              strokeWidth={2.5} 
              fill="url(#priceAvgGradient)" 
              dot={{ r: 3, fill: '#9F224E', strokeWidth: 1.5, stroke: '#FFFFFF' }}
              activeDot={{ r: 5, fill: '#9F224E', stroke: '#FFFFFF', strokeWidth: 2 }}
              name="Giá trung bình"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Market Commentary Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <Info size={14} className="text-[#9F224E] shrink-0" />
          <span>{history.recommendation}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-400 self-end sm:self-auto shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-1 bg-[#9F224E] rounded"></span> Giá TB thị trường
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-gray-200 rounded"></span> Biên độ giá thực tế
          </span>
        </div>
      </div>
    </div>
  );
}
