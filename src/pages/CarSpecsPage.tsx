import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCars } from '../data/mockData';
import { getCarSpecs, calculateOnRoadPrice, SpecGroup } from '../data/carSpecsData';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Calculator, 
  Phone, 
  Share2, 
  Info, 
  Sliders, 
  Calendar, 
  Gauge, 
  Fuel, 
  Users, 
  Layers
} from 'lucide-react';
import CarCard from '../components/CarCard';

export default function CarSpecsPage() {
  const { id } = useParams();

  const car = useMemo(() => mockCars.find(c => c.id === id), [id]);
  const specs = useMemo(() => car ? getCarSpecs(car) : null, [car]);

  // Spec search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Collapse state for each spec group
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // On-road price calculator state
  const [locationTab, setLocationTab] = useState<'HN' | 'HCM' | 'PROVINCE'>('HN');
  const [includePhysicalInsurance, setIncludePhysicalInsurance] = useState(true);

  // Loan calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [loanYears, setLoanYears] = useState<number>(5); // 5 years
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%

  // Selected color
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Active version index (mock)
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(() => {
    if (!specs) return 0;
    const activeIdx = specs.versions.findIndex(v => v.active);
    return activeIdx >= 0 ? activeIdx : 0;
  });

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const expandAll = () => setCollapsedGroups({});
  const collapseAll = () => {
    if (!specs) return;
    const all: Record<string, boolean> = {};
    specs.specGroups.forEach(g => { all[g.id] = true; });
    setCollapsedGroups(all);
  };

  const formatPriceVND = (vnd: number) => {
    return new Intl.NumberFormat('vi-VN').format(vnd) + ' đ';
  };

  const formatPriceMillion = (price: number) => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(2).replace(/\.?0+$/, '')} Tỷ`;
    }
    return `${price} Triệu`;
  };

  if (!car || !specs) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border border-gray-200 my-6 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy thông số kỹ thuật xe</h2>
        <p className="text-gray-500 mb-6">Mã tin đăng hoặc thông số kỹ thuật xe không tồn tại.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#9F224E] text-white px-5 py-2.5 rounded font-bold hover:bg-[#851C41] transition-colors">
          <ArrowLeft size={16} /> Về trang chủ V-Car
        </Link>
      </div>
    );
  }

  // Filtered spec groups based on search
  const filteredSpecGroups = useMemo(() => {
    if (!searchQuery.trim()) return specs.specGroups;
    const q = searchQuery.toLowerCase().trim();

    return specs.specGroups
      .map(group => {
        const matchingItems = group.items.filter(
          item => item.name.toLowerCase().includes(q) || item.value.toLowerCase().includes(q)
        );
        return {
          ...group,
          items: matchingItems
        };
      })
      .filter(group => group.items.length > 0);
  }, [specs.specGroups, searchQuery]);

  // On-road calculation
  const currentVersionPrice = specs.versions[selectedVersionIndex]?.price || specs.listedPrice;
  const isElectric = car.engine === 'Điện';
  const onRoad = calculateOnRoadPrice(currentVersionPrice, locationTab, specs.seats, isElectric);
  const totalOnRoadPrice = includePhysicalInsurance ? onRoad.totalWithPhysical : onRoad.totalWithoutPhysical;

  // Loan calculation
  const carPriceVND = currentVersionPrice * 1000000;
  const downPaymentVND = Math.round(carPriceVND * (downPaymentPercent / 100));
  const loanAmountVND = carPriceVND - downPaymentVND;
  const totalMonths = loanYears * 12;
  const monthlyPrincipal = Math.round(loanAmountVND / totalMonths);
  const monthlyInterestFirstMonth = Math.round(loanAmountVND * (interestRate / 100 / 12));
  const totalFirstMonthPayment = monthlyPrincipal + monthlyInterestFirstMonth;

  // Related cars of same model
  const relatedCars = mockCars.filter(c => c.brand === car.brand && c.model === car.model && c.id !== car.id).slice(0, 4);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <nav className="flex items-center text-xs text-gray-500 gap-2 whitespace-nowrap overflow-x-auto">
          <Link to="/" className="hover:text-[#9F224E]">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-400">V-Car</span>
          <span>/</span>
          <Link to={`/hang-xe/${car.brand}`} className="hover:text-[#9F224E]">{car.brand}</Link>
          <span>/</span>
          <Link to={`/dong-xe/${car.brand}/${car.model}`} className="hover:text-[#9F224E]">{car.model}</Link>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-none">{specs.versionName}</span>
          <span>/</span>
          <span className="text-[#9F224E] font-bold">Thông số kỹ thuật</span>
        </nav>

        <Link 
          to={`/xe/${car.id}`} 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9F224E] hover:underline shrink-0"
        >
          <ArrowLeft size={14} /> Quay lại tin rao xe này
        </Link>
      </div>

      {/* Header Profile / Hero Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Car Image & Colors */}
          <div className="lg:w-5/12 flex flex-col gap-3">
            <div className="relative aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
              <img 
                src={specs.heroImage} 
                alt={specs.fullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded">
                Năm {specs.year}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b text-white text-xs flex justify-between items-end">
                <span>{specs.colorOptions[selectedColorIndex]?.name}</span>
                <span className="text-[10px] text-gray-300">Ảnh minh họa phiên bản</span>
              </div>
            </div>

            {/* Color Switcher */}
            <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="font-semibold text-gray-700">Màu ngoại thất:</span>
              <div className="flex items-center gap-2">
                {specs.colorOptions.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIndex(i)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${selectedColorIndex === i ? 'scale-125 border-[#9F224E] shadow' : 'border-gray-300 hover:scale-110'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info & Prices */}
          <div className="lg:w-7/12 flex flex-col justify-between">
            <div>
              {/* Brand logo & tags */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  {specs.brandLogo && (
                    <img src={specs.brandLogo} alt={specs.brand} className="h-7 w-auto object-contain" />
                  )}
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">VnExpress V-Car</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: specs.fullName, url: window.location.href }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Đã sao chép liên kết thông số kỹ thuật!');
                      }
                    }} 
                    className="p-1.5 hover:text-[#9F224E] hover:bg-gray-100 rounded" 
                    title="Chia sẻ"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222] tracking-tight leading-snug mb-3">
                {specs.fullName}
              </h1>

              {/* Spec Pills */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold mb-4">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                  Phân khúc: {specs.segment}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                  Xuất xứ: {specs.origin}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                  {specs.seats} chỗ ngồi
                </span>
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                  {specs.engineType}
                </span>
              </div>

              {/* Price Block */}
              <div className="bg-[#9F224E]/5 border border-[#9F224E]/20 rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase font-bold text-gray-500 mb-0.5">Giá niêm yết chính hãng</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#9F224E]">
                    {formatPriceMillion(currentVersionPrice)} <span className="text-sm font-semibold text-gray-600">VNĐ</span>
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-4">
                  <div className="text-xs uppercase font-bold text-gray-500 mb-0.5">Giá lăn bánh tạm tính (Hà Nội)</div>
                  <div className="text-lg font-bold text-gray-900">
                    ~{(onRoad.totalWithPhysical / 1000000000).toFixed(3)} Tỷ
                  </div>
                  <a href="#du-tinh-lan-banh" className="text-xs font-bold text-[#9F224E] hover:underline flex items-center sm:justify-end gap-1 mt-0.5">
                    <Calculator size={12} /> Bảng tính chi tiết
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
              <a 
                href="#du-tinh-lan-banh" 
                className="bg-[#9F224E] hover:bg-[#851C41] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <Calculator size={14} /> Dự tính giá lăn bánh
              </a>
              <a 
                href="#tinh-tra-gop" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <Sliders size={14} /> Ước tính trả góp
              </a>
              <Link 
                to={`/xe/${car.id}`} 
                className="border border-[#9F224E] text-[#9F224E] hover:bg-[#9F224E]/5 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 ml-auto"
              >
                Xem tin rao bán xe này &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Version Selector Carousel */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-[#9F224E]" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800">
              Các phiên bản của dòng {car.brand} {car.model}
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {specs.versions.length} phiên bản
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {specs.versions.map((ver, idx) => {
            const isSelected = selectedVersionIndex === idx;
            return (
              <button
                key={ver.name}
                onClick={() => setSelectedVersionIndex(idx)}
                className={`flex-shrink-0 text-left p-3 rounded-lg border transition-all text-xs min-w-[200px] ${
                  isSelected
                    ? 'border-[#9F224E] bg-[#9F224E]/5 ring-1 ring-[#9F224E]'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`font-bold truncate ${isSelected ? 'text-[#9F224E]' : 'text-gray-900'}`}>
                    {ver.name}
                  </span>
                  {isSelected && (
                    <span className="bg-[#9F224E] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Đang xem
                    </span>
                  )}
                </div>
                <div className="font-extrabold text-sm text-gray-800">
                  {formatPriceMillion(ver.price)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Quick Highlight Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
          <div className="text-gray-400 mb-1 flex justify-center"><Calendar size={20} /></div>
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-0.5">Năm sản xuất</div>
          <div className="text-sm font-black text-gray-900">{specs.year}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
          <div className="text-gray-400 mb-1 flex justify-center"><Fuel size={20} /></div>
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-0.5">Động cơ</div>
          <div className="text-sm font-black text-gray-900 truncate" title={specs.engineType}>{specs.engineType.split(' ')[0]}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
          <div className="text-gray-400 mb-1 flex justify-center"><Gauge size={20} /></div>
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-0.5">Hộp số</div>
          <div className="text-sm font-black text-gray-900 truncate" title={specs.transmission}>{specs.transmission}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
          <div className="text-gray-400 mb-1 flex justify-center"><Users size={20} /></div>
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-0.5">Số chỗ ngồi</div>
          <div className="text-sm font-black text-gray-900">{specs.seats} chỗ</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
          <div className="text-gray-400 mb-1 flex justify-center"><Sliders size={20} /></div>
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-0.5">Dẫn động</div>
          <div className="text-sm font-black text-gray-900 truncate" title={specs.driveTrain}>{specs.driveTrain.split(' ')[0]}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm">
          <div className="text-gray-400 mb-1 flex justify-center"><Info size={20} /></div>
          <div className="text-[11px] font-bold uppercase text-gray-400 mb-0.5">Tình trạng</div>
          <div className="text-sm font-black text-gray-900">{car.condition}</div>
        </div>
      </div>

      {/* Main Spec Content Area + Sticky Sidebar Navigation */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Spec Tables */}
        <div className="flex-1 space-y-6">
          {/* Search Specs & Expand/Collapse Control */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm nhanh thông số (vd: túi khí, cốp, gầm...)"
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#9F224E]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold text-gray-600">
              <button 
                onClick={expandAll}
                className="hover:text-[#9F224E] px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Mở rộng tất cả
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={collapseAll}
                className="hover:text-[#9F224E] px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Thu gọn tất cả
              </button>
            </div>
          </div>

          {/* Grouped Spec Tables */}
          {filteredSpecGroups.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
              Không tìm thấy thông số nào phù hợp với từ khóa "{searchQuery}".
            </div>
          ) : (
            filteredSpecGroups.map((group: SpecGroup) => {
              const isCollapsed = !!collapsedGroups[group.id];
              return (
                <div 
                  key={group.id} 
                  id={group.id} 
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/80 transition-colors border-b border-gray-200 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-5 bg-[#9F224E] rounded-full"></span>
                      <h3 className="font-extrabold text-base text-gray-800 tracking-tight">
                        {group.title}
                      </h3>
                      <span className="text-xs text-gray-400 font-medium">({group.items.length} mục)</span>
                    </div>

                    <div className="text-gray-400 hover:text-gray-700">
                      {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </div>
                  </button>

                  {/* Group Table */}
                  {!isCollapsed && (
                    <div className="divide-y divide-gray-100">
                      {group.items.map((item, idx) => (
                        <div 
                          key={idx}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 text-xs sm:text-sm hover:bg-gray-50/70 transition-colors ${
                            idx % 2 === 1 ? 'bg-[#FCFCFC]' : 'bg-white'
                          }`}
                        >
                          <div className="font-semibold text-gray-700 sm:w-1/2 flex items-center gap-2 mb-1 sm:mb-0">
                            {item.highlight && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#9F224E] shrink-0" title="Thông số nổi bật"></span>
                            )}
                            <span>{item.name}</span>
                          </div>

                          <div className={`sm:w-1/2 sm:text-right font-medium text-gray-900 ${
                            item.highlight ? 'font-bold text-[#9F224E]' : ''
                          }`}>
                            {item.value === 'Có' ? (
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                <Check size={14} strokeWidth={3} /> Có trang bị
                              </span>
                            ) : item.value === 'Không' ? (
                              <span className="text-gray-400">Không có</span>
                            ) : (
                              <span>{item.value}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* On-Road Price Calculator (Dự tính lăn bánh) */}
          <div id="du-tinh-lan-banh" className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm scroll-mt-20">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2">
                <Calculator size={20} className="text-[#9F224E]" />
                <h3 className="font-extrabold text-lg text-gray-800">
                  Dự tính chi phí lăn bánh: {specs.fullName}
                </h3>
              </div>
              <span className="text-xs text-gray-400">Đơn vị: VNĐ</span>
            </div>

            {/* Region Tabs */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setLocationTab('HN')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                  locationTab === 'HN'
                    ? 'bg-[#9F224E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Hà Nội (Trước bạ 12%)
              </button>
              <button
                onClick={() => setLocationTab('HCM')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                  locationTab === 'HCM'
                    ? 'bg-[#9F224E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                TP. Hồ Chí Minh (Trước bạ 10%)
              </button>
              <button
                onClick={() => setLocationTab('PROVINCE')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                  locationTab === 'PROVINCE'
                    ? 'bg-[#9F224E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tỉnh / Thành khác
              </button>
            </div>

            {/* On-Road Breakdown Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm divide-y divide-gray-100 mb-4">
              <div className="flex justify-between p-3 bg-gray-50 font-bold text-gray-800">
                <span>Khoản mục chi phí</span>
                <span>Số tiền tạm tính</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-gray-700">1. Giá niêm yết xe</span>
                <span className="font-bold text-gray-900">{formatPriceVND(onRoad.basePriceVND)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50/50">
                <span className="text-gray-700">
                  2. Lệ phí trước bạ ({onRoad.taxRate}%)
                  {isElectric && <span className="ml-1 text-[11px] text-emerald-600 font-semibold">(Xe điện ưu đãi 0%)</span>}
                </span>
                <span className="font-bold text-gray-900">{formatPriceVND(onRoad.registrationTax)}</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-gray-700">3. Phí đăng ký biển số</span>
                <span className="font-bold text-gray-900">{formatPriceVND(onRoad.licensePlateFee)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50/50">
                <span className="text-gray-700">4. Phí đăng kiểm</span>
                <span className="font-bold text-gray-900">{formatPriceVND(onRoad.inspectionFee)}</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-gray-700">5. Phí bảo trì đường bộ (1 năm)</span>
                <span className="font-bold text-gray-900">{formatPriceVND(onRoad.roadMaintenanceFee)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50/50">
                <span className="text-gray-700">6. Bảo hiểm TNDS bắt buộc (1 năm)</span>
                <span className="font-bold text-gray-900">{formatPriceVND(onRoad.insuranceMandatory)}</span>
              </div>
              <div className="flex justify-between p-3 items-center">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    checked={includePhysicalInsurance}
                    onChange={e => setIncludePhysicalInsurance(e.target.checked)}
                    className="accent-[#9F224E] w-4 h-4 rounded"
                  />
                  <span>7. Bảo hiểm vật chất xe 1 năm (~1.4% giá xe, tự nguyện)</span>
                </label>
                <span className={`font-bold ${includePhysicalInsurance ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                  {formatPriceVND(onRoad.physicalInsurance)}
                </span>
              </div>
            </div>

            {/* Total On-Road Price */}
            <div className="bg-[#9F224E]/10 border border-[#9F224E]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase font-extrabold text-gray-500">Tổng chi phí lăn bánh ước tính</div>
                <div className="text-xs text-gray-500 italic">* Đã bao gồm các khoản thuế phí theo quy định nhà nước</div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#9F224E]">
                {formatPriceVND(totalOnRoadPrice)}
              </div>
            </div>
          </div>

          {/* Installment Loan Calculator (Tính mua trả góp) */}
          <div id="tinh-tra-gop" className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm scroll-mt-20">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 mb-4">
              <Sliders size={20} className="text-[#9F224E]" />
              <h3 className="font-extrabold text-lg text-gray-800">
                Ước tính mua xe trả góp qua ngân hàng
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {/* Down payment */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-bold text-gray-600 mb-1">Tỷ lệ trả trước</div>
                <div className="flex gap-1.5">
                  {[20, 30, 50].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded ${
                        downPaymentPercent === pct ? 'bg-[#9F224E] text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-500 mt-2">
                  Cần trả trước: <span className="font-bold text-gray-900">{formatPriceVND(downPaymentVND)}</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-bold text-gray-600 mb-1">Thời hạn vay</div>
                <div className="flex gap-1.5">
                  {[3, 5, 8].map(yrs => (
                    <button
                      key={yrs}
                      onClick={() => setLoanYears(yrs)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded ${
                        loanYears === yrs ? 'bg-[#9F224E] text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {yrs} năm
                    </button>
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-500 mt-2">
                  Vay ngân hàng: <span className="font-bold text-gray-900">{formatPriceVND(loanAmountVND)}</span>
                </div>
              </div>

              {/* Interest rate */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-bold text-gray-600 mb-1">Lãi suất ước tính (%/năm)</div>
                <input
                  type="number"
                  step="0.1"
                  min="5"
                  max="15"
                  value={interestRate}
                  onChange={e => setInterestRate(parseFloat(e.target.value) || 8.5)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#9F224E]"
                />
                <div className="text-[11px] text-gray-400 mt-2">
                  * Lãi suất cố định năm đầu tiên
                </div>
              </div>
            </div>

            {/* Loan Result Card */}
            <div className="bg-gray-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase text-gray-400 font-bold mb-0.5">Số tiền trả tháng đầu tiên (Gốc + Lãi)</div>
                <div className="text-xs text-gray-300">
                  Gốc: {formatPriceVND(monthlyPrincipal)}/tháng | Lãi tháng 1: ~{formatPriceVND(monthlyInterestFirstMonth)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  ~{formatPriceVND(totalFirstMonthPayment)}
                </div>
                <div className="text-[11px] text-gray-400">Giảm dần theo dư nợ thực tế</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar: Quick Navigation & Seller Connection */}
        <div className="lg:w-72 shrink-0 space-y-5">
          {/* Quick Jump Index */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm lg:sticky lg:top-20">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 pb-2 mb-3 border-b border-gray-100">
              Mục lục thông số nhanh
            </h4>
            <div className="space-y-1 text-xs font-semibold text-gray-600">
              {specs.specGroups.map(group => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="block px-2.5 py-1.5 rounded hover:bg-[#9F224E]/10 hover:text-[#9F224E] transition-colors"
                >
                  {group.title}
                </a>
              ))}
              <a
                href="#du-tinh-lan-banh"
                className="block px-2.5 py-1.5 rounded hover:bg-[#9F224E]/10 hover:text-[#9F224E] transition-colors text-[#9F224E] font-bold"
              >
                &rarr; Dự tính giá lăn bánh
              </a>
              <a
                href="#tinh-tra-gop"
                className="block px-2.5 py-1.5 rounded hover:bg-[#9F224E]/10 hover:text-[#9F224E] transition-colors text-[#9F224E] font-bold"
              >
                &rarr; Dự tính mua trả góp
              </a>
            </div>

            {/* Back to car listing button */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="text-xs font-bold text-gray-800 mb-1">Đang xem tin rao:</div>
              <div className="text-xs text-gray-500 mb-3 line-clamp-2">{car.title}</div>
              <Link
                to={`/xe/${car.id}`}
                className="w-full block text-center bg-[#9F224E] hover:bg-[#851C41] text-white py-2 rounded text-xs font-bold uppercase transition-colors shadow-sm"
              >
                Xem chi tiết tin rao xe
              </Link>
            </div>

            {/* Seller Contact Box */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
              <div className="text-[11px] font-bold uppercase text-gray-400 mb-1">Người đăng bán</div>
              <div className="font-bold text-gray-900 text-sm mb-2">{car.seller.name}</div>
              <a
                href={`tel:${car.seller.phone}`}
                className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-bold transition-colors"
              >
                <Phone size={14} /> {car.seller.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Listings Section */}
      {relatedCars.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9F224E]">Tin rao cùng dòng xe</div>
              <h2 className="text-xl font-bold text-gray-900">
                Các tin bán {car.brand} {car.model} đang có sẵn trên V-Car
              </h2>
            </div>
            <Link 
              to={`/dong-xe/${car.brand}/${car.model}`}
              className="text-xs font-bold text-[#9F224E] hover:underline uppercase"
            >
              Xem tất cả &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCars.map(c => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
