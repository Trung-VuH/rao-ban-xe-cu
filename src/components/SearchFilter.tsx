import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBrands, getModelsByBrand, getLocations, getBodyStyles } from '../data/mockData';
import { FilterState } from '../types';

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

  const handleChange = (key: keyof FilterState, value: any) => {
    const newState = { ...state, [key]: value };
    // Reset model if brand changes
    if (key === 'brand') {
      delete newState.model;
    }
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
        if (value) params.append(key, String(value));
      });
      navigate(`/tim-kiem?${params.toString()}`);
    }
  };

  const isVertical = variant === 'vertical';

  const wrapperClass = isVertical ? "space-y-4" : "grid grid-cols-1 md:grid-cols-4 gap-4";
  const labelClass = "block text-xs font-bold uppercase text-gray-500 mb-1.5";
  const selectClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#9F224E]";
  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#9F224E]";

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
        
        <div>
          <label className={labelClass}>Tỉnh/thành</label>
          <select className={selectClass} value={state.location || ''} onChange={e => handleChange('location', e.target.value)}>
            <option value="">Tất cả</option>
            {getLocations().map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Hãng xe</label>
          <select className={selectClass} value={state.brand || ''} onChange={e => handleChange('brand', e.target.value)}>
            <option value="">Tất cả</option>
            {getBrands().map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>

        {state.brand && (
          <div>
            <label className={labelClass}>Dòng xe</label>
            <select className={selectClass} value={state.model || ''} onChange={e => handleChange('model', e.target.value)}>
              <option value="">Tất cả</option>
              {getModelsByBrand(state.brand).map(model => <option key={model} value={model}>{model}</option>)}
            </select>
          </div>
        )}

        <div>
          <label className={labelClass}>Tình trạng</label>
          <div className="flex gap-2">
            <button type="button" onClick={() => handleChange('condition', 'Cũ')} className={`flex-1 py-2 text-sm border ${state.condition === 'Cũ' ? 'border-[#9F224E] text-[#9F224E] bg-[#9F224E]/5' : 'border-gray-300 text-gray-600'} font-medium rounded`}>Xe cũ</button>
            <button type="button" onClick={() => handleChange('condition', 'Mới')} className={`flex-1 py-2 text-sm border ${state.condition === 'Mới' ? 'border-[#9F224E] text-[#9F224E] bg-[#9F224E]/5' : 'border-gray-300 text-gray-600'} font-medium rounded`}>Xe mới</button>
            <button type="button" onClick={() => handleChange('condition', '')} className={`py-2 px-3 text-sm border ${!state.condition ? 'border-[#9F224E] text-[#9F224E] bg-[#9F224E]/5' : 'border-gray-300 text-gray-600'} font-medium rounded`}>Tất cả</button>
          </div>
        </div>

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

        <div>
          <label className={labelClass}>Kiểu dáng</label>
          <select className={selectClass} value={state.bodyStyle || ''} onChange={e => handleChange('bodyStyle', e.target.value)}>
            <option value="">Tất cả</option>
            {getBodyStyles().map(style => <option key={style} value={style}>{style}</option>)}
          </select>
        </div>

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

        <div>
          <label className={labelClass}>Số chỗ</label>
          <select className={selectClass} value={state.seats || ''} onChange={e => handleChange('seats', e.target.value)}>
            <option value="">Tất cả</option>
            <option value="2">2 chỗ</option>
            <option value="4-5">4-5 chỗ</option>
            <option value="7-9">7-9 chỗ</option>
          </select>
        </div>

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
