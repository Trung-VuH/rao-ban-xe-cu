import { Link } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';
import CarCard from '../components/CarCard';
import { mockCars, getBrands, getBodyStyles, getLocations, BRAND_IMAGES, BODY_STYLE_IMAGES, MODEL_IMAGES } from '../data/mockData';
import PriceRangeSection from '../components/PriceRangeSection';

export default function HomePage() {
  const allBrands = getBrands();
  const popularBrands = allBrands.slice(0, 10); // Keep for other uses if needed, though we will map over allBrands for logos
  const popularBodyStyles = getBodyStyles();
  const popularLocations = getLocations().slice(0, 6);
  const popularModels = [
    { brand: 'Toyota', model: 'Vios' },
    { brand: 'Honda', model: 'CR-V' },
    { brand: 'Mazda', model: 'CX-5' },
    { brand: 'Ford', model: 'Ranger' },
    { brand: 'Hyundai', model: 'Accent' },
    { brand: 'VinFast', model: 'Fadil' },
    { brand: 'Mitsubishi', model: 'Xpander' },
    { brand: 'Kia', model: 'Seltos' },
    { brand: 'Toyota', model: 'Camry' },
    { brand: 'Honda', model: 'City' },
    { brand: 'Mazda', model: 'Mazda 3' },
    { brand: 'Hyundai', model: 'Santa Fe' },
    { brand: 'Kia', model: 'Morning' },
    { brand: 'Ford', model: 'Everest' },
    { brand: 'VinFast', model: 'VF 8' },
    { brand: 'Toyota', model: 'Fortuner' },
    { brand: 'Kia', model: 'K3' },
    { brand: 'Mitsubishi', model: 'Outlander' },
    { brand: 'Hyundai', model: 'Grand i10' },
    { brand: 'Honda', model: 'Civic' }
  ];

  const recentCars = [...mockCars].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()).slice(0, 8);

  return (
    <div className="space-y-10 pb-10">
      <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
        <div className="max-w-[800px] mx-auto text-center mb-6">
          <h1 className="text-3xl font-bold text-[#222] tracking-tight mb-2">Mua bán ô tô dễ dàng, uy tín</h1>
          <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">Tìm kiếm trong hàng ngàn tin rao bán xe trên toàn quốc</p>
        </div>
        <SearchFilter variant="horizontal" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-[#9F224E] rounded-sm"></span>
            Tin rao mới nhất
          </h2>
          <Link to="/tim-kiem" className="text-sm font-bold text-[#9F224E] hover:underline uppercase">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {recentCars.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* Các tin rao theo khoảng giá (Dựa trên Volume Search 24 tháng gần nhất) */}
      <PriceRangeSection />

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-2">Tìm theo Hãng xe</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
          {allBrands.map(brand => (
            <Link key={brand} to={`/hang-xe/${brand}`} className="bg-white border border-gray-200 rounded-lg p-2 h-20 flex flex-col items-center justify-center hover:border-[#9F224E] hover:shadow-md transition-all group">
              {BRAND_IMAGES[brand] ? (
                <div className="h-10 w-full flex items-center justify-center mb-1">
                  <img src={BRAND_IMAGES[brand]} alt={brand} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                  <span className="hidden font-bold text-[10px] text-gray-400 uppercase text-center leading-tight">{brand}</span>
                </div>
              ) : (
                <div className="h-10 w-full flex items-center justify-center mb-1">
                  <span className="font-bold text-[10px] text-gray-400 uppercase text-center leading-tight">{brand}</span>
                </div>
              )}
              <span className="font-medium text-[10px] text-gray-500 group-hover:text-[#9F224E] truncate w-full text-center">{brand}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-2">Tìm theo Phân khúc</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularBodyStyles.map(style => (
            <Link key={style} to={`/phan-khuc/${style}`} className="bg-white border border-gray-200 rounded p-3 text-center hover:border-[#9F224E] hover:text-[#9F224E] transition-all font-bold text-sm">
              {style}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-2">Dòng xe phổ biến</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {popularModels.map(({brand, model}) => (
            <Link key={model} to={`/dong-xe/${brand}/${model}`} className="bg-white border border-gray-200 rounded-lg p-2 flex flex-col items-center hover:border-[#9F224E] hover:shadow-md transition-all group">
              {MODEL_IMAGES[model] && (
                <div className="w-full aspect-[4/3] mb-2 rounded overflow-hidden relative">
                  <img src={MODEL_IMAGES[model]} alt={model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <span className="font-bold text-sm text-gray-700 group-hover:text-[#9F224E]">{model}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">Tỉnh/thành</h2>
          <Link to="/tim-kiem" className="text-sm font-bold text-[#9F224E] hover:underline uppercase">Xem thêm</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {popularLocations.map(loc => (
            <Link key={loc} to={`/tinh-thanh/${loc}`} className="bg-white border border-gray-200 rounded p-3 text-center hover:border-[#9F224E] hover:text-[#9F224E] transition-all font-bold text-sm">
              {loc}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
