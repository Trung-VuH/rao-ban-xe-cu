import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPriceRangeBySlug, PRICE_RANGES, PriceRangeConfig } from '../data/priceRangesData';
import { mockCars } from '../data/mockData';
import { Car } from '../types';
import CarCard from '../components/CarCard';
import PriceHistoryChart from '../components/PriceHistoryChart';
import { 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  SlidersHorizontal,
  Car as CarIcon,
  Tag,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function PriceRangeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const config = getPriceRangeBySlug(slug || '');

  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc' | 'year-desc'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // If not found, show 404 or fallback
  if (!config) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Khoảng giá không tồn tại</h1>
        <p className="text-gray-500 mb-6">Vui lòng chọn một khoảng giá khác từ danh mục</p>
        <Link to="/" className="inline-block bg-[#9F224E] text-white px-5 py-2.5 rounded-lg font-bold text-sm">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Filter cars belonging to this range
  const rangeCars = useMemo(() => {
    return mockCars.filter(car => config.matchFn(car));
  }, [config]);

  // Extract available brands and locations within this price range
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    rangeCars.forEach(c => brands.add(c.brand));
    return Array.from(brands).sort();
  }, [rangeCars]);

  const availableLocations = useMemo(() => {
    const locs = new Set<string>();
    rangeCars.forEach(c => locs.add(c.location));
    return Array.from(locs).sort();
  }, [rangeCars]);

  // Apply sub-filters
  const filteredCars = useMemo(() => {
    let result = rangeCars.filter(car => {
      if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;
      if (selectedLocation !== 'all' && car.location !== selectedLocation) return false;
      if (selectedTransmission !== 'all' && car.transmission !== selectedTransmission) return false;
      if (selectedCondition !== 'all' && car.condition !== selectedCondition) return false;

      // Filter by selected keyword search intent (matches model or brand or title)
      if (selectedKeyword) {
        const kw = selectedKeyword.toLowerCase();
        const carStr = `${car.brand} ${car.model} ${car.title} ${car.bodyStyle} ${car.seats} chỗ`.toLowerCase();
        // check keyword tokens
        const tokens = kw.split(' ').filter(t => t.length > 1 && !['xe', 'oto', 'ô', 'to', 'giá', 'cũ', 'mới', 'bán', 'dưới', 'tầm', 'triệu', 'đến', 'nên', 'mua', 'gì'].includes(t));
        if (tokens.length > 0) {
          const matchAny = tokens.some(tok => carStr.includes(tok));
          if (!matchAny) return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0;
    });

    return result;
  }, [rangeCars, selectedBrand, selectedLocation, selectedTransmission, selectedCondition, selectedKeyword, sortBy]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedLocation('all');
    setSelectedTransmission('all');
    setSelectedCondition('all');
    setSelectedKeyword(null);
    setSortBy('latest');
    setCurrentPage(1);
  };

  // Representative car model for chart
  const representativeModel = useMemo(() => {
    if (config.slug === 'xe-ban-tai-duoi-400-trieu') return { brand: 'Ford', model: 'Ranger' };
    if (config.slug === 'xe-7-cho-200-400-trieu') return { brand: 'Toyota', model: 'Innova' };
    if (config.slug === 'vios-i10-200-300-trieu') return { brand: 'Toyota', model: 'Vios' };
    if (config.minPrice >= 1000) return { brand: 'Ford', model: 'Everest' };
    if (config.minPrice >= 600) return { brand: 'Hyundai', model: 'Santa Fe' };
    if (config.minPrice >= 400) return { brand: 'Mazda', model: 'Mazda 3' };
    if (config.minPrice >= 200) return { brand: 'Toyota', model: 'Vios' };
    if (config.minPrice >= 100) return { brand: 'Hyundai', model: 'Grand i10' };
    return { brand: 'Kia', model: 'Morning' };
  }, [config]);

  return (
    <div className="space-y-5 pb-12">
      {/* Title at highest position */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {config.title}
        </h1>
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 gap-2 mt-1.5">
          <Link to="/" className="hover:text-[#9F224E]">V-Car</Link>
          <ChevronRight size={12} />
          <Link to="/" className="hover:text-[#9F224E]">Tin rao theo khoảng giá</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-medium">{config.title}</span>
        </nav>
      </div>

      {/* Gợi ý tìm kiếm theo nhu cầu - nằm ngay dưới title */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            <Search size={14} className="text-[#9F224E]" />
            <span>Gợi ý tìm kiếm theo nhu cầu</span>
          </div>
          {selectedKeyword && (
            <button
              onClick={() => setSelectedKeyword(null)}
              className="text-xs font-bold text-[#9F224E] hover:underline flex items-center gap-1"
            >
              <span>Bỏ lọc từ khóa: &ldquo;{selectedKeyword}&rdquo;</span>
              <RotateCcw size={12} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {config.popularKeywords.map((item, idx) => {
            const isSelected = selectedKeyword === item.keyword;
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedKeyword(isSelected ? null : item.keyword);
                  setCurrentPage(1);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#9F224E] text-white border-[#9F224E] shadow-sm font-semibold'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300 font-medium'
                }`}
                title={`Lọc theo từ khóa: ${item.keyword}`}
              >
                <Search size={11} className={isSelected ? 'text-white' : 'text-gray-400'} />
                <span>{item.keyword}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-gray-400 mt-2 italic">
          * Bấm vào bất kỳ từ khóa nào ở trên để lọc nhanh các tin rao tương ứng.
        </p>
      </div>

      {/* Filtering & Sorting Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <SlidersHorizontal size={16} className="text-[#9F224E]" />
            <span>Bộ lọc tin rao ({filteredCars.length} kết quả)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-gray-50 text-gray-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#9F224E]"
            >
              <option value="latest">Mới đăng nhất</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
              <option value="year-desc">Đời xe mới nhất</option>
            </select>

            {(selectedBrand !== 'all' || selectedLocation !== 'all' || selectedTransmission !== 'all' || selectedCondition !== 'all' || selectedKeyword) && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-[#9F224E] underline ml-2 font-medium"
              >
                Đặt lại
              </button>
            )}
          </div>
        </div>

        {/* Dropdown filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Brand */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Hãng xe</label>
            <select
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-700"
            >
              <option value="all">Tất cả hãng xe</option>
              {availableBrands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Khu vực</label>
            <select
              value={selectedLocation}
              onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-700"
            >
              <option value="all">Toàn quốc</option>
              {availableLocations.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Hộp số</label>
            <select
              value={selectedTransmission}
              onChange={(e) => { setSelectedTransmission(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-700"
            >
              <option value="all">Tất cả hộp số</option>
              <option value="Số tự động">Số tự động (AT)</option>
              <option value="Số sàn">Số sàn (MT)</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Tình trạng xe</label>
            <select
              value={selectedCondition}
              onChange={(e) => { setSelectedCondition(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-700"
            >
              <option value="all">Mới & Cũ</option>
              <option value="Cũ">Xe đã qua sử dụng</option>
              <option value="Mới">Xe mới 100%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      {paginatedCars.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {paginatedCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 text-xs font-bold rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
              >
                Trang trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs font-bold rounded ${
                    currentPage === page
                      ? 'bg-[#9F224E] text-white'
                      : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-3 py-1.5 text-xs font-bold rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CarIcon size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-800 mb-1">Không tìm thấy tin rao phù hợp</h3>
          <p className="text-xs text-gray-500 mb-4">Hãy thử điều chỉnh bộ lọc hoặc xóa từ khóa tìm kiếm</p>
          <button
            onClick={resetFilters}
            className="bg-[#9F224E] text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}

      {/* Buyer Guide & Market Advice (Moved to bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {/* Suitable Audience */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2.5 text-[#9F224E] font-bold text-sm">
            <CheckCircle2 size={16} />
            <span>Phù hợp với nhu cầu sử dụng</span>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-600">
            {config.suitableFor.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9F224E] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buying Advice */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2.5 text-[#9F224E] font-bold text-sm">
            <ShieldCheck size={16} />
            <span>Kinh nghiệm & Lời khuyên của chuyên gia V-Car</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {config.adviceSummary}
          </p>
        </div>
      </div>

      {/* Thống kê thị trường xe cũ V-Car: Price Fluctuation Chart */}
      <div className="mt-6">
        <PriceHistoryChart
          brand={representativeModel.brand}
          model={representativeModel.model}
          title={`Thống kê thị trường xe cũ V-Car: Biến động giá ${representativeModel.brand} ${representativeModel.model}`}
        />
      </div>

      {/* Switch to Other Price Ranges */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mt-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2">
          <Tag size={15} className="text-[#9F224E]" />
          <span>Xem các khoảng giá tìm kiếm khác</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRICE_RANGES.filter(r => r.slug !== config.slug).map(r => (
            <Link
              key={r.slug}
              to={`/khoang-gia/${r.slug}`}
              className="bg-white rounded-lg border border-gray-200 p-2.5 hover:border-[#9F224E] hover:shadow-xs transition-all text-center group"
            >
              <div className="font-bold text-xs text-gray-800 group-hover:text-[#9F224E] truncate">
                {r.shortLabel}
              </div>
              <div className="text-[10px] text-[#9F224E] font-semibold mt-0.5">
                {r.priceDisplay}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
