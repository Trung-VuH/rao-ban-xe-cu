import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Layers, MapPin } from 'lucide-react';
import { getBrands, getModelsByBrand, getLocations, getBodyStyles } from '../data/mockData';
import { FilterState } from '../types';
import MultiSelectDropdown from './MultiSelectDropdown';

interface SearchFilterProps {
  initialState?: FilterState;
  variant?: 'horizontal' | 'vertical';
  onChange?: (state: FilterState) => void;
}

export default function SearchFilter({ initialState, variant = 'horizontal', onChange }: SearchFilterProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<FilterState>(initialState || {});

  useEffect(() => {
    if (initialState) {
      setState(initialState);
    }
  }, [initialState]);

  // Selected arrays with fallback to singular values
  const selectedLocations: string[] = state.locations && state.locations.length > 0
    ? state.locations
    : (state.location ? [state.location] : []);

  const selectedBrands: string[] = state.brands && state.brands.length > 0
    ? state.brands
    : (state.brand ? [state.brand] : []);

  const selectedBodyStyles: string[] = state.bodyStyles && state.bodyStyles.length > 0
    ? state.bodyStyles
    : (state.bodyStyle ? [state.bodyStyle] : []);

  const handleLocationsChange = (newLocations: string[]) => {
    const newState: FilterState = { ...state };
    if (newLocations.length === 0) {
      delete newState.locations;
      delete newState.location;
    } else {
      newState.locations = newLocations;
      newState.location = newLocations.length === 1 ? newLocations[0] : undefined;
    }
    setState(newState);
    if (onChange && variant === 'vertical') {
      onChange(newState);
    }
  };

  const handleBrandsChange = (newBrands: string[]) => {
    const newState: FilterState = { ...state };
    if (newBrands.length === 0) {
      delete newState.brands;
      delete newState.brand;
      delete newState.model;
    } else {
      newState.brands = newBrands;
      newState.brand = newBrands.length === 1 ? newBrands[0] : undefined;
      // Reset model if it does not belong to selected brands
      if (newState.model) {
        const allowedModels = newBrands.flatMap(b => getModelsByBrand(b));
        if (!allowedModels.includes(newState.model)) {
          delete newState.model;
        }
      }
    }
    setState(newState);
    if (onChange && variant === 'vertical') {
      onChange(newState);
    }
  };

  const handleBodyStylesChange = (newStyles: string[]) => {
    const newState: FilterState = { ...state };
    if (newStyles.length === 0) {
      delete newState.bodyStyles;
      delete newState.bodyStyle;
    } else {
      newState.bodyStyles = newStyles;
      newState.bodyStyle = newStyles.length === 1 ? newStyles[0] : undefined;
    }
    setState(newState);
    if (onChange && variant === 'vertical') {
      onChange(newState);
    }
  };

  const handleChange = (key: keyof FilterState, value: any) => {
    const newState = { ...state, [key]: value };
    // Remove year range if condition is new
    if (key === 'condition' && value === 'Mới') {
      delete newState.yearFrom;
      delete newState.yearTo;
    }
    setState(newState);
    if (onChange && variant === 'vertical') {
      onChange(newState);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (variant === 'horizontal') {
      const params = new URLSearchParams();
      Object.entries(state).forEach(([key, value]) => {
        if (key === 'locations' && Array.isArray(value) && value.length > 0) {
          params.append('locations', value.join(','));
        } else if (key === 'brands' && Array.isArray(value) && value.length > 0) {
          params.append('brands', value.join(','));
        } else if (key === 'bodyStyles' && Array.isArray(value) && value.length > 0) {
          params.append('bodyStyles', value.join(','));
        } else if (!['locations', 'brands', 'bodyStyles'].includes(key) && value) {
          params.append(key, String(value));
        }
      });
      navigate(`/tim-kiem?${params.toString()}`);
    }
  };

  const isVertical = variant === 'vertical';

  const wrapperClass = isVertical ? "space-y-4" : "grid grid-cols-1 md:grid-cols-4 gap-4";
  const labelClass = "block text-xs font-bold uppercase text-gray-500 mb-1.5";
  const selectClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#9F224E]";
  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#9F224E]";

  // Models available based on selected brands
  const availableModels = selectedBrands.length === 1
    ? getModelsByBrand(selectedBrands[0])
    : (selectedBrands.length > 1 ? selectedBrands.flatMap(b => getModelsByBrand(b)) : []);

  return (
    <form onSubmit={handleSearch} className={isVertical ? "" : "bg-white p-6 rounded-lg shadow-sm border border-gray-200"}>
      {isVertical && (
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
          <svg className="w-5 h-5 text-[#9F224E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          Bộ lọc tìm kiếm
        </h2>
      )}
      
      <div className={wrapperClass}>
        {!isVertical && (
          <div>
            <label className={labelClass}>Từ khóa</label>
            <input type="text" placeholder="Tìm theo tên..." className={inputClass} value={state.keyword || ''} onChange={e => handleChange('keyword', e.target.value)} />
          </div>
        )}
        
        {/* Tỉnh/thành Multi-select */}
        <MultiSelectDropdown
          label="Tỉnh/thành"
          options={getLocations()}
          selectedValues={selectedLocations}
          onChange={handleLocationsChange}
          placeholder="Tất cả tỉnh thành"
          icon={<MapPin size={15} />}
          isVertical={isVertical}
          showChips={isVertical}
        />

        {/* Hãng xe Multi-select with Search */}
        <MultiSelectDropdown
          label="Hãng xe"
          options={getBrands()}
          selectedValues={selectedBrands}
          onChange={handleBrandsChange}
          placeholder="Tất cả hãng xe"
          icon={<Car size={15} />}
          enableSearch={true}
          searchPlaceholder="Tìm hãng xe..."
          isVertical={isVertical}
          showChips={isVertical}
        />

        {/* Dòng xe: available when at least 1 brand selected */}
        {selectedBrands.length > 0 && availableModels.length > 0 && (
          <div>
            <label className={labelClass}>Dòng xe</label>
            <select
              className={selectClass}
              value={state.model || ''}
              onChange={e => handleChange('model', e.target.value)}
            >
              <option value="">Tất cả</option>
              {selectedBrands.length === 1 ? (
                availableModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))
              ) : (
                selectedBrands.map(b => {
                  const models = getModelsByBrand(b);
                  if (models.length === 0) return null;
                  return (
                    <optgroup key={b} label={b}>
                      {models.map(m => (
                        <option key={`${b}-${m}`} value={m}>{m} ({b})</option>
                      ))}
                    </optgroup>
                  );
                })
              )}
            </select>
          </div>
        )}

        {/* Tình trạng */}
        <div>
          <label className={labelClass}>Tình trạng</label>
          <div className="flex gap-2">
            <button type="button" onClick={() => handleChange('condition', 'Cũ')} className={`flex-1 py-2 text-sm border ${state.condition === 'Cũ' ? 'border-[#9F224E] text-[#9F224E] bg-[#9F224E]/5' : 'border-gray-300 text-gray-600'} font-medium rounded`}>Xe cũ</button>
            <button type="button" onClick={() => handleChange('condition', 'Mới')} className={`flex-1 py-2 text-sm border ${state.condition === 'Mới' ? 'border-[#9F224E] text-[#9F224E] bg-[#9F224E]/5' : 'border-gray-300 text-gray-600'} font-medium rounded`}>Xe mới</button>
            <button type="button" onClick={() => handleChange('condition', '')} className={`py-2 px-3 text-sm border ${!state.condition ? 'border-[#9F224E] text-[#9F224E] bg-[#9F224E]/5' : 'border-gray-300 text-gray-600'} font-medium rounded`}>Tất cả</button>
          </div>
        </div>

        {/* Năm sản xuất (cho xe cũ) */}
        {state.condition === 'Cũ' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Năm từ</label>
              <input type="number" className={inputClass} value={state.yearFrom || ''} onChange={e => handleChange('yearFrom', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Đến năm</label>
              <input type="number" className={inputClass} value={state.yearTo || ''} onChange={e => handleChange('yearTo', e.target.value)} />
            </div>
          </div>
        )}

        {/* Phân Khúc Multi-select */}
        <MultiSelectDropdown
          label="Phân Khúc"
          options={getBodyStyles()}
          selectedValues={selectedBodyStyles}
          onChange={handleBodyStylesChange}
          placeholder="Tất cả phân khúc"
          icon={<Layers size={15} />}
          isVertical={isVertical}
          showChips={isVertical}
        />

        {/* Động cơ */}
        <div>
          <label className={labelClass}>Động cơ</label>
          <select className={selectClass} value={state.engine || ''} onChange={e => handleChange('engine', e.target.value)}>
            <option value="">Tất cả</option>
            <option value="Xăng">Xăng</option>
            <option value="Dầu">Dầu</option>
            <option value="Điện">Điện</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Số chỗ */}
        <div>
          <label className={labelClass}>Số chỗ</label>
          <select className={selectClass} value={state.seats || ''} onChange={e => handleChange('seats', e.target.value)}>
            <option value="">Tất cả</option>
            <option value="2">2 chỗ</option>
            <option value="4-5">4-5 chỗ</option>
            <option value="7-9">7-9 chỗ</option>
          </select>
        </div>

        {/* Khoảng giá */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Giá từ (Triệu)</label>
            <input type="number" className={inputClass} value={state.priceFrom || ''} onChange={e => handleChange('priceFrom', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Đến (Triệu)</label>
            <input type="number" className={inputClass} value={state.priceTo || ''} onChange={e => handleChange('priceTo', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className={isVertical ? "w-full bg-[#9F224E] text-white py-3 rounded-lg font-bold uppercase text-sm mt-4 shadow-lg shadow-[#9F224E]/20 hover:bg-[#b92b5d] transition-colors" : "bg-[#9F224E] text-white px-8 py-2 rounded font-bold uppercase hover:bg-[#b92b5d] transition-colors"}>
          {isVertical ? 'Áp dụng bộ lọc' : 'Tìm kiếm'}
        </button>
        {isVertical && (
          <button type="button" onClick={() => { setState({}); if(onChange) onChange({}); }} className="w-full text-gray-500 py-2 text-xs font-medium hover:underline mt-2">
            Xóa tất cả bộ lọc
          </button>
        )}
      </div>
    </form>
  );
}
