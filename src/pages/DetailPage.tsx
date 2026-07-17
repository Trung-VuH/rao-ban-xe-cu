import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { mockCars } from '../data/mockData';
import { ChevronRight, Calendar, Gauge, MapPin, Fuel, Users, Settings, Tag, Phone } from 'lucide-react';
import CarCard from '../components/CarCard';

export default function DetailPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const car = useMemo(() => mockCars.find(c => c.id === id), [id]);

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
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
            <span>Đăng ngày {formatDate(car.datePosted)}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${car.status === 'Đang bán' ? 'bg-[#9F224E]/10 text-[#9F224E]' : 'bg-gray-200 text-gray-500'}`}>
              {car.status}
            </span>
          </div>
          <div className="text-3xl font-bold text-[#9F224E]">{formatPrice(car.price)}</div>
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
        </div>

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

        {/* V-Car Link Mock */}
        <a href="#" className="block bg-[#222] text-white rounded-lg p-5 text-center hover:bg-black transition-colors shadow-lg">
          <div className="font-bold text-lg mb-1 tracking-tight">Tra cứu {car.brand} {car.model}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Xem thông số chi tiết trên V-Car &rarr;</div>
        </a>
      </div>
    </div>
  );
}
