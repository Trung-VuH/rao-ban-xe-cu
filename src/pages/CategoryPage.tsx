import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import SearchFilter from '../components/SearchFilter';
import PriceHistoryChart from '../components/PriceHistoryChart';
import { mockCars } from '../data/mockData';
import { FilterState, Car } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryPage({ type }: { type: 'brand' | 'bodyStyle' | 'location' | 'model' | 'year' | 'condition' | 'tag' }) {
  const { brand, bodyStyle, location, model, year, condition, tag } = useParams();
  const [searchParams] = useSearchParams();
  const [filterState, setFilterState] = useState<FilterState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // 4 cards/row * 10 rows

  // Initialize filter state based on route params
  useEffect(() => {
    const initialState: FilterState = {};
    if (type === 'brand' && brand) initialState.brand = brand;
    if (type === 'bodyStyle' && bodyStyle) initialState.bodyStyle = bodyStyle;
    if (type === 'location' && location) initialState.location = location;
    if (type === 'model' && brand && model) {
      initialState.brand = brand;
      initialState.model = model;
    }
    if (type === 'year' && brand && model && year) {
      initialState.brand = brand;
      initialState.model = model;
      initialState.year = parseInt(year);
    }
    if (type === 'condition' && condition) initialState.condition = condition;
    
    setFilterState(initialState);
    setCurrentPage(1);
  }, [type, brand, bodyStyle, location, model, year, condition, tag]);

  const filteredCars = useMemo(() => {
    return mockCars.filter(car => {
      if (filterState.location && car.location !== filterState.location) return false;
      if (filterState.brand && car.brand !== filterState.brand) return false;
      if (filterState.model && car.model !== filterState.model) return false;
      if (filterState.condition && car.condition !== filterState.condition) return false;
      if (filterState.bodyStyle && car.bodyStyle !== filterState.bodyStyle) return false;
      if (filterState.engine && car.engine !== filterState.engine) return false;
      
      if (filterState.yearFrom && car.year < filterState.yearFrom) return false;
      if (filterState.yearTo && car.year > filterState.yearTo) return false;
      if (filterState.year && car.year !== filterState.year) return false;
      
      if (filterState.priceFrom && car.price < filterState.priceFrom) return false;
      if (filterState.priceTo && car.price > filterState.priceTo) return false;
      
      if (filterState.seats) {
        if (filterState.seats === '2' && car.seats !== 2) return false;
        if (filterState.seats === '4-5' && (car.seats < 4 || car.seats > 5)) return false;
        if (filterState.seats === '7-9' && (car.seats < 7 || car.seats > 9)) return false;
      }

      if (type === 'tag' && tag && !car.tags.includes(tag)) return false;

      return true;
    });
  }, [filterState, type, tag]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const currentCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeBrand = filterState.brand || brand;
  const activeModel = filterState.model || model;

  const getPageTitle = () => {
    switch (type) {
      case 'brand': return `Mua bán xe ${brand}`;
      case 'bodyStyle': return `Mua bán xe phân khúc ${bodyStyle}`;
      case 'location': return `Mua bán xe tại ${location}`;
      case 'model': return `Mua bán xe ${brand} ${model}`;
      case 'year': return `Mua bán xe ${brand} ${model} đời ${year}`;
      case 'condition': return `Mua bán xe ${condition}`;
      case 'tag': return `Tag: ${tag}`;
      default: return 'Danh sách tin đăng';
    }
  };

  return (
    <>
      <div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
        <Link to="/" className="hover:text-vne-red">V-Car</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{getPageTitle()}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 flex-1 pb-6">
        <div className="flex-[1.8] flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h1 className="text-2xl font-bold text-[#222]">{getPageTitle()}</h1>
            <span className="text-sm text-gray-500">{filteredCars.length} kết quả phù hợp</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">Không tìm thấy kết quả nào phù hợp.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-sm text-gray-500">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {activeBrand && activeModel && (
            <div className="mt-4">
              <PriceHistoryChart 
                brand={activeBrand} 
                model={activeModel} 
                title={`Biểu đồ giá rao bán các mẫu xe ${activeBrand} ${activeModel}`}
              />
            </div>
          )}
        </div>

        <div className="flex-[1] bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-fit sticky top-[80px]">
          <SearchFilter 
            variant="vertical" 
            initialState={filterState} 
            onChange={setFilterState} 
          />
        </div>
      </div>
    </>
  );
}
