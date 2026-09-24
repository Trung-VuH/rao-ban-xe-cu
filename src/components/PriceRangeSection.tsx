import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRICE_RANGES } from '../data/priceRangesData';
import { mockCars } from '../data/mockData';
import { ChevronRight, Tag, Car as CarIcon, CheckCircle2 } from 'lucide-react';

export default function PriceRangeSection() {
  // Count available cars for each price range
  const rangesWithCount = useMemo(() => {
    return PRICE_RANGES.map(range => {
      const count = mockCars.filter(car => range.matchFn(car)).length;
      return {
        ...range,
        carCount: count
      };
    });
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200/90 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 bg-[#9F224E]/10 text-[#9F224E] text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              <CarIcon size={13} className="text-[#9F224E]" />
              Gợi ý xe theo ngân sách
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline">• Thống kê dữ liệu V-Car</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#9F224E] rounded-sm"></span>
            Các tin rao theo khoảng giá
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Tổng hợp các dòng xe bán chạy và tin rao bán ô tô chất lượng được phân loại theo từng phân khúc ngân sách
          </p>
        </div>

        <div className="text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5 shadow-2xs">
          <CheckCircle2 size={14} className="text-[#9F224E]" />
          <span><strong>12 phân khúc</strong> ngân sách phổ biến</span>
        </div>
      </div>

      {/* Grid: Exactly 4 cards per row, max 3 rows (12 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rangesWithCount.map((item) => (
          <Link
            key={item.slug}
            to={`/khoang-gia/${item.slug}`}
            className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-[#9F224E] hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9F224E] to-rose-400 opacity-80 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Top row: Price Badge & Listing count */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-block bg-[#9F224E] text-white font-black text-xs px-2.5 py-1 rounded-md shadow-2xs group-hover:bg-[#83183d] transition-colors">
                  {item.priceDisplay}
                </span>

                <span className="text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded-md">
                  <strong className="text-[#9F224E]">{item.carCount}</strong> tin bán
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[15px] text-gray-900 group-hover:text-[#9F224E] transition-colors line-clamp-1 leading-snug">
                {item.title}
              </h3>

              {/* Car Models List */}
              <div className="mt-3">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <CarIcon size={12} className="text-[#9F224E] shrink-0" />
                  <span>Mẫu xe tiêu biểu:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.recommendedModels.slice(0, 4).map((modelName, mIdx) => (
                    <span
                      key={mIdx}
                      className="text-[11px] font-medium bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-200/70 group-hover:border-gray-300 group-hover:bg-rose-50/30 transition-colors line-clamp-1"
                    >
                      {modelName}
                    </span>
                  ))}
                  {item.recommendedModels.length > 4 && (
                    <span className="text-[10px] font-semibold text-gray-400 self-center px-1">
                      +{item.recommendedModels.length - 4} xe khác
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Row: Advice note & CTA Link */}
            <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-gray-500 line-clamp-1 italic max-w-[170px]">
                {item.suitableFor[0]}
              </span>

              <span className="inline-flex items-center gap-0.5 font-bold text-[#9F224E] group-hover:translate-x-1 transition-transform shrink-0">
                <span>Xem tin</span>
                <ChevronRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Market Insight footer */}
      <div className="mt-5 pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-[#9F224E]" />
          <span>Danh mục tin rao được tổng hợp tự động theo các phân khúc giá thực tế trên thị trường xe ô tô Việt Nam.</span>
        </div>
        <div className="text-gray-400 text-[11px]">
          Cập nhật liên tục theo biến động giá thị trường
        </div>
      </div>
    </section>
  );
}
