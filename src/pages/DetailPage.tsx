import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { mockCars } from '../data/mockData';
import { getCarPrimaryPriceRange, getAllMatchingPriceRanges } from '../data/priceRangesData';
import { ChevronRight, Calendar, Gauge, MapPin, Fuel, Users, Settings, Tag, Phone, Search, ExternalLink } from 'lucide-react';
import CarCard from '../components/CarCard';
import PriceHistoryChart from '../components/PriceHistoryChart';

export default function DetailPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const car = useMemo(() => mockCars.find(c => c.id === id), [id]);

  const primaryPriceRange = useMemo(() => car ? getCarPrimaryPriceRange(car) : null, [car]);
  const allMatchingRanges = useMemo(() => car ? getAllMatchingPriceRanges(car) : [], [car]);

  const relatedByModel = useMemo(() => 
    car ? mockCars.filter(c => c.brand === car.brand && c.model === car.model && c.id !== car.id).slice(0, 4) : [],
  [car]);

  const relatedByBodyStyle = useMemo(() => 
    car ? mockCars.filter(c => c.bodyStyle === car.bodyStyle && c.id !== car.id).slice(0, 4) : [],
  [car]);

  const relatedByPrice = useMemo(() => {
    if (!car) return [];
    return mockCars.filter(c => c.id !== car.id && Math.abs(c.price - car.price) <= 200).slice(0, 4);
  }, [car]);

  if (!car) {
    return <div className="text-center py-20 text-vne-gray">Không tìm thấy tin đăng.</div>;
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) return `${(price / 1000).toFixed(1).replace('.0', '')} Tỷ`;
    return `${price} Triệu`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 flex-1 pb-6">
      <div className="flex-[1.8] flex flex-col gap-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 gap-2 whitespace-nowrap overflow-x-auto">
          <Link to="/" className="hover:text-vne-red">V-Car</Link>
          <span>/</span>
          <Link to={`/tinh-trang/${car.condition}`} className="hover:text-vne-red">Xe {car.condition}</Link>
          {primaryPriceRange && (
            <>
              <span>/</span>
              <Link 
                to={`/khoang-gia/${primaryPriceRange.slug}`} 
                className="text-[#9F224E] hover:underline font-medium bg-[#9F224E]/5 px-2 py-0.5 rounded"
                title={`Xem tất cả tin rao ${primaryPriceRange.title}`}
              >
                {primaryPriceRange.shortLabel}
              </Link>
            </>
          )}
          <span>/</span>
          <Link to={`/hang-xe/${car.brand}`} className="hover:text-vne-red">{car.brand}</Link>
          <span>/</span>
          <Link to={`/dong-xe/${car.brand}/${car.model}`} className="hover:text-vne-red">{car.model}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{car.year}</span>
        </nav>

        {/* Title & Price */}
        <div>
          <h1 className="text-2xl font-bold text-[#222] leading-tight mb-2">{car.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3 font-medium">
            <span>Đăng ngày {formatDate(car.datePosted)}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${car.status === 'Đang bán' ? 'bg-[#9F224E]/10 text-[#9F224E]' : 'bg-gray-200 text-gray-500'}`}>
              {car.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-3xl font-bold text-[#9F224E]">{formatPrice(car.price)}</div>

            {primaryPriceRange && (
              <Link
                to={`/khoang-gia/${primaryPriceRange.slug}`}
                className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-[#9F224E] text-xs font-bold px-3 py-1.5 rounded-full transition-all group shadow-2xs"
                title={`Xem toàn bộ tin rao thuộc ${primaryPriceRange.title}`}
              >
                <Tag size={13} className="text-[#9F224E] shrink-0" />
                <span>Phân khúc: <strong>{primaryPriceRange.title}</strong></span>
                <ChevronRight size={13} className="text-[#9F224E] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
          <div className="aspect-[16/9] relative mb-2 bg-gray-200 rounded overflow-hidden">
            <img src={car.images[activeImage]} alt={car.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {car.images.map((img, idx) => (
              <button 
                key={idx} 
                className={`relative aspect-[4/3] rounded overflow-hidden ${activeImage === idx ? 'ring-2 ring-[#9F224E]' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <h2 className="text-lg font-bold border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide text-gray-800">Mô tả chi tiết</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {car.description}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <h2 className="text-sm font-bold border-b border-gray-100 pb-2 mb-3 uppercase tracking-wide text-gray-500">Từ khóa liên quan</h2>
          <div className="flex flex-wrap gap-2">
            {car.tags.map(tag => (
              <Link key={tag} to={`/tag/${tag}`} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1 rounded text-xs font-bold text-gray-500 hover:text-[#9F224E] hover:border-[#9F224E] transition-colors">
                <Tag size={12} />
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Price History Chart for same car model */}
        <PriceHistoryChart
          brand={car.brand}
          model={car.model}
          currentCarPrice={car.price}
          currentCarYear={car.year}
          title={`Biểu đồ giá các mẫu xe cùng dòng ${car.brand} ${car.model}`}
        />
        
        {/* Related Cars Below Main Content */}
        <div className="space-y-8 mt-4">
          {relatedByModel.length > 0 && (
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#9F224E] rounded-sm"></span>
                  Cùng dòng {car.brand} {car.model}
                </h2>
                <Link to={`/dong-xe/${car.brand}/${car.model}`} className="text-sm font-bold text-[#9F224E] hover:underline uppercase">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedByModel.map(c => <CarCard key={c.id} car={c} />)}
              </div>
            </section>
          )}

          {relatedByBodyStyle.length > 0 && (
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#9F224E] rounded-sm"></span>
                  Cùng phân khúc {car.bodyStyle}
                </h2>
                <Link to={`/phan-khuc/${car.bodyStyle}`} className="text-sm font-bold text-[#9F224E] hover:underline uppercase">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedByBodyStyle.map(c => <CarCard key={c.id} car={c} />)}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-[1] space-y-4">
        {/* Specs */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800">Thông số kỹ thuật</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <div className="flex items-start gap-2">
              <Calendar size={18} className="text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-0.5">Năm SX</div>
                <div className="font-bold text-gray-900">{car.year}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Gauge size={18} className="text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-0.5">Số Km</div>
                <div className="font-bold text-gray-900">{car.mileage === 0 ? 'Mới' : car.mileage.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Settings size={18} className="text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-0.5">Hộp số</div>
                <div className="font-bold text-gray-900">{car.transmission}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Fuel size={18} className="text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-0.5">Động cơ</div>
                <div className="font-bold text-gray-900">{car.engine}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users size={18} className="text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-0.5">Số chỗ</div>
                <div className="font-bold text-gray-900">{car.seats}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-gray-400 mt-0.5" />
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-0.5">Tình trạng</div>
                <div className="font-bold text-gray-900">{car.condition}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to={`/xe/${car.id}/chi-tiet-tskt`}
              className="w-full flex items-center justify-center gap-2 bg-[#9F224E]/10 hover:bg-[#9F224E]/20 text-[#9F224E] py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Xem chi tiết thông số kỹ thuật đầy đủ</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Price Range Category Box */}
        {primaryPriceRange && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wide">
                <Tag size={14} className="text-[#9F224E]" />
                <span>Tin rao theo khoảng giá</span>
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                {primaryPriceRange.priceDisplay}
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-2">
              Tin rao này thuộc chuyên trang khoảng giá:
            </p>

            <Link
              to={`/khoang-gia/${primaryPriceRange.slug}`}
              className="block bg-gradient-to-br from-gray-50 to-white hover:from-rose-50/40 hover:to-white border border-gray-200 hover:border-[#9F224E] rounded-lg p-3 transition-all group"
            >
              <div className="font-bold text-sm text-gray-900 group-hover:text-[#9F224E] transition-colors flex items-center justify-between">
                <span>{primaryPriceRange.title}</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-[#9F224E] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-xs text-gray-500 mt-1.5">
                <span className="text-gray-600 font-medium">Gợi ý mẫu xe: </span>
                <span className="text-gray-700">{primaryPriceRange.recommendedModels.slice(0, 3).map(m => m.split(' (')[0]).join(', ')}</span>
              </div>
            </Link>

            {/* Other matching special segments if any (7 chỗ, bán tải, vios/i10) */}
            {allMatchingRanges.filter(r => r.slug !== primaryPriceRange.slug).length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-gray-100">
                <div className="text-[11px] font-semibold text-gray-500 mb-1.5">
                  Cũng thuộc nhóm tìm kiếm phổ biến:
                </div>
                <div className="space-y-1.5">
                  {allMatchingRanges.filter(r => r.slug !== primaryPriceRange.slug).map(sub => (
                    <Link
                      key={sub.slug}
                      to={`/khoang-gia/${sub.slug}`}
                      className="flex items-center justify-between text-xs text-gray-700 hover:text-[#9F224E] bg-gray-50 hover:bg-gray-100/80 px-2.5 py-1.5 rounded-md border border-gray-100"
                    >
                      <span className="font-medium truncate">{sub.title}</span>
                      <ChevronRight size={12} className="shrink-0 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3.5 pt-2 border-t border-gray-100">
              <Link
                to={`/khoang-gia/${primaryPriceRange.slug}`}
                className="w-full text-center block text-xs font-bold text-[#9F224E] hover:underline"
              >
                Xem tất cả tin rao cùng khoảng giá &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Seller */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-wide text-gray-500">Thông tin người bán</h2>
          <div className="space-y-3">
            <div className="font-bold text-lg text-gray-900">{car.seller.name}</div>
            <div className="flex items-center gap-2 text-white bg-[#9F224E] p-3 rounded font-bold text-lg justify-center shadow-lg shadow-[#9F224E]/20">
              <Phone size={20} />
              {car.seller.phone}
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600 pt-2 font-medium">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{car.seller.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
