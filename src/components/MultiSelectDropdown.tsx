import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  isVertical?: boolean;
  showChips?: boolean;
}

export default function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Tất cả',
  icon,
  enableSearch = false,
  searchPlaceholder = 'Tìm kiếm...',
  isVertical = false,
  showChips = true,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options if search query is present
  const filteredOptions = enableSearch && searchQuery.trim()
    ? options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : options;

  const handleToggle = (opt: string) => {
    if (selectedValues.includes(opt)) {
      onChange(selectedValues.filter(v => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  };

  const handleSelectAll = () => {
    onChange(options);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold uppercase text-gray-500">{label}</label>
        {selectedValues.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] text-[#9F224E] hover:underline font-medium"
          >
            Xóa ({selectedValues.length})
          </button>
        )}
      </div>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full border rounded px-3 py-2 text-sm bg-white flex items-center justify-between gap-2 text-left transition-colors ${
          isOpen ? 'border-[#9F224E] ring-1 ring-[#9F224E]/20' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
          {selectedValues.length === 0 ? (
            <span className="text-gray-500 truncate">{placeholder}</span>
          ) : selectedValues.length === 1 ? (
            <span className="font-medium text-gray-900 truncate">{selectedValues[0]}</span>
          ) : (
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-semibold text-gray-900 truncate">
                {selectedValues.slice(0, 2).join(', ')}
                {selectedValues.length > 2 ? ` (+${selectedValues.length - 2})` : ''}
              </span>
              <span className="bg-[#9F224E]/10 text-[#9F224E] text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                {selectedValues.length}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {selectedValues.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              className="p-0.5 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100"
              title="Xóa lựa chọn"
            >
              <X size={14} />
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#9F224E]' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden text-sm">
          {/* Action Header */}
          <div className="p-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs">
            <span className="font-bold text-gray-700">Chọn 1 hoặc nhiều {label.toLowerCase()}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[#9F224E] hover:underline font-semibold"
              >
                Chọn tất cả
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-gray-500 hover:underline"
              >
                Bỏ chọn
              </button>
            </div>
          </div>

          {/* Search bar inside dropdown if enabled */}
          {enableSearch && (
            <div className="p-2 border-b border-gray-100 bg-white">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-[#9F224E]"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-xs text-gray-400">Không tìm thấy kết quả</div>
            ) : (
              filteredOptions.map(opt => {
                const isChecked = selectedValues.includes(opt);
                return (
                  <label
                    key={opt}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                      isChecked ? 'bg-[#9F224E]/5 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50 font-normal'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(opt)}
                      className="rounded border-gray-300 text-[#9F224E] focus:ring-[#9F224E] h-4 w-4 accent-[#9F224E] cursor-pointer"
                    />
                    <span className="text-xs flex-1 select-none">{opt}</span>
                    {isChecked && <Check size={14} className="text-[#9F224E] shrink-0" />}
                  </label>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-500">
              {selectedValues.length === 0
                ? 'Đang chọn: Tất cả'
                : `Đã chọn: ${selectedValues.length} mục`}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-[#9F224E] hover:bg-[#b92b5d] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      )}

      {/* Selected tags below when in vertical mode */}
      {selectedValues.length > 0 && isVertical && showChips && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedValues.map(v => (
            <span
              key={v}
              className="inline-flex items-center gap-1 bg-[#9F224E]/10 text-[#9F224E] text-[11px] font-semibold px-2 py-0.5 rounded-full"
            >
              {v}
              <button
                type="button"
                onClick={() => handleToggle(v)}
                className="hover:text-red-700"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
