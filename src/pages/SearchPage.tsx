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
    
    // Parse locations: supports both single and multiple values (?locations=Hà Nội,TP HCM or ?location=Hà Nội)
    const rawLocations = searchParams.getAll('locations').concat(searchParams.getAll('location'));
    const parsedLocations: string[] = [];
    rawLocations.forEach(loc => {
      loc.split(',').forEach(item => {
        const trimmed = item.trim();
        if (trimmed && !parsedLocations.includes(trimmed)) {
          parsedLocations.push(trimmed);
        }
      });
    });
    if (parsedLocations.length > 0) {
      initialState.locations = parsedLocations;
      if (parsedLocations.length === 1) {
        initialState.location = parsedLocations[0];
      }
    }

    // Parse brands: supports both single and multiple values (?brands=Toyota,Hyundai or ?brand=Toyota)
    const rawBrands = searchParams.getAll('brands').concat(searchParams.getAll('brand'));
    const parsedBrands: string[] = [];
    rawBrands.forEach(b => {
      b.split(',').forEach(item => {
        const trimmed = item.trim();
        if (trimmed && !parsedBrands.includes(trimmed)) {
          parsedBrands.push(trimmed);
        }
      });
    });
    if (parsedBrands.length > 0) {
      initialState.brands = parsedBrands;
      if (parsedBrands.length === 1) {
        initialState.brand = parsedBrands[0];
      }
    }

    // Parse bodyStyles (phân khúc): supports both single and multiple values (?bodyStyles=Sedan,SUV or ?bodyStyle=Sedan)
    const rawBodyStyles = searchParams.getAll('bodyStyles').concat(searchParams.getAll('bodyStyle'));
    const parsedBodyStyles: string[] = [];
    rawBodyStyles.forEach(s => {
      s.split(',').forEach(item => {
        const trimmed = item.trim();
        if (trimmed && !parsedBodyStyles.includes(trimmed)) {
          parsedBodyStyles.push(trimmed);
        }
      });
    });
    if (parsedBodyStyles.length > 0) {
      initialState.bodyStyles = parsedBodyStyles;
      if (parsedBodyStyles.length === 1) {
        initialState.bodyStyle = parsedBodyStyles[0];
      }
    }

    if (params.model) initialState.model = params.model;
    if (params.condition) initialState.condition = params.condition;
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
      // Multiple/single locations filter
      const activeLocations = filterState.locations && filterState.locations.length > 0
        ? filterState.locations
        : (filterState.location ? [filterState.location] : []);
      if (activeLocations.length > 0 && !activeLocations.includes(car.location)) {
        return false;
      }

      // Multiple/single brands filter
      const activeBrands = filterState.brands && filterState.brands.length > 0
        ? filterState.brands
        : (filterState.brand ? [filterState.brand] : []);
      if (activeBrands.length > 0 && !activeBrands.includes(car.brand)) {
        return false;
      }

      // Multiple/single body styles (phân khúc) filter
      const activeBodyStyles = filterState.bodyStyles && filterState.bodyStyles.length > 0
        ? filterState.bodyStyles
        : (filterState.bodyStyle ? [filterState.bodyStyle] : []);
      if (activeBodyStyles.length > 0 && !activeBodyStyles.includes(car.bodyStyle)) {
        return false;
      }

      if (filterState.model && car.model !== filterState.model) return false;
      if (filterState.condition && car.condition !== filterState.condition) return false;
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

    const activeBrands = filterState.brands && filterState.brands.length > 0
      ? filterState.brands
      : (filterState.brand ? [filterState.brand] : []);
    if (activeBrands.length === 1) {
      parts.push(activeBrands[0]);
    } else if (activeBrands.length > 1) {
      parts.push(activeBrands.join(', '));
    }

    if (filterState.model) parts.push(filterState.model);

    const activeBodyStyles = filterState.bodyStyles && filterState.bodyStyles.length > 0
      ? filterState.bodyStyles
      : (filterState.bodyStyle ? [filterState.bodyStyle] : []);
    if (activeBodyStyles.length === 1) {
      parts.push(`Phân khúc ${activeBodyStyles[0]}`);
    } else if (activeBodyStyles.length > 1) {
      parts.push(`Phân khúc (${activeBodyStyles.join(', ')})`);
    }

    const activeLocations = filterState.locations && filterState.locations.length > 0
      ? filterState.locations
      : (filterState.location ? [filterState.location] : []);
    if (activeLocations.length === 1) {
      parts.push(`tại ${activeLocations[0]}`);
    } else if (activeLocations.length > 1) {
      parts.push(`tại ${activeLocations.join(', ')}`);
    }
    
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
