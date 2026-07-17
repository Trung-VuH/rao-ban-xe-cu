import { useSearchParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import SearchFilter from '../components/SearchFilter';
import { mockCars } from '../data/mockData';
import { FilterState } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [filterState, setFilterState] = useState<FilterState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  useEffect(() => {
    const initialState: FilterState = {};
    const params = Object.fromEntries(searchParams.entries());
    
    if (params.location) initialState.location = params.location;
    if (params.brand) initialState.brand = params.brand;
    if (params.model) initialState.model = params.model;
    if (params.condition) initialState.condition = params.condition;
    if (params.bodyStyle) initialState.bodyStyle = params.bodyStyle;
    if (params.engine) initialState.engine = params.engine;
    if (params.seats) initialState.seats = params.seats;
    if (params.yearFrom) initialState.yearFrom = parseInt(params.yearFrom);
    if (params.yearTo) initialState.yearTo = parseInt(params.yearTo);
    if (params.priceFrom) initialState.priceFrom = parseInt(params.priceFrom);
    if (params.priceTo) initialState.priceTo = parseInt(params.priceTo);
    if (params.keyword) initialState.keyword = params.keyword;
    
    setFilterState(initialState);
    setCurrentPage(1);
  }, [searchParams]);

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
      
      if (filterState.priceFrom && car.price < filterState.priceFrom) return false;
      if (filterState.priceTo && car.price > filterState.priceTo) return false;
      
      if (filterState.seats) {
        if (filterState.seats === '2' && car.seats !== 2) return false;
        if (filterState.seats === '4-5' && (car.seats < 4 || car.seats > 5)) return false;
        if (filterState.seats === '7-9' && (car.seats < 7 || car.seats > 9)) return false;
      }

      if (filterState.keyword && !car.title.toLowerCase().includes(filterState.keyword.toLowerCase())) return false;

      return true;
    });
  }, [filterState]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const currentCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageTitle = () => {
    const parts = [];
    if (filterState.keyword) parts.push(`"${filterState.keyword}"`);
    if (filterState.brand) parts.push(filterState.brand);
    if (filterState.model) parts.push(filterState.model);
    if (filterState.location) parts.push(`tại ${filterState.location}`);
    
    if (parts.length > 0) return `Kết quả tìm kiếm: ${parts.join(' ')}`;
    return 'Tất cả tin đăng';
  };

  return (
    <>
      <div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
        <Link to="/" className="hover:text-vne-red">V-Car</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Tìm kiếm</span>
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
              <p className="text-gray-500">Không tìm thấy xe nào phù hợp với tiêu chí của bạn.</p>
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
