import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle smooth scroll when navigating to #tin-rao-theo-khoang-gia from any page
  useEffect(() => {
    if (location.hash === '#tin-rao-theo-khoang-gia') {
      const element = document.getElementById('tin-rao-theo-khoang-gia');
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, location.hash]);

  const handlePriceRangeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById('tin-rao-theo-khoang-gia');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#tin-rao-theo-khoang-gia');
      }
    } else {
      navigate('/#tin-rao-theo-khoang-gia');
    }
  };

  const isPriceRangeActive = location.hash === '#tin-rao-theo-khoang-gia' || location.pathname.startsWith('/khoang-gia/');

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#222] font-sans flex flex-col">
      <header className="w-full bg-white border-b border-gray-200 z-20 sticky top-0 shadow-2xs">
        <div className="max-w-[1000px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center border-r pr-6 border-gray-300">
              <Link to="/" className="text-vne-red text-2xl font-bold tracking-tighter uppercase">VnExpress</Link>
              <span className="ml-2 text-gray-400 font-light text-xl">|</span>
              <span className="ml-2 text-gray-800 font-semibold text-lg uppercase">V-CAR</span>
            </div>
            <nav className="hidden md:flex gap-5 text-sm font-medium uppercase tracking-wide">
              <Link 
                to="/" 
                className={`py-4 transition-colors ${
                  location.pathname === '/' && !location.hash
                    ? 'text-vne-red border-b-2 border-vne-red font-bold'
                    : 'hover:text-vne-red text-gray-700'
                }`}
              >
                Trang chủ
              </Link>
              <Link 
                to="/tinh-trang/Mới" 
                className={`py-4 transition-colors ${
                  location.pathname === '/tinh-trang/Mới'
                    ? 'text-vne-red border-b-2 border-vne-red font-bold'
                    : 'hover:text-vne-red text-gray-700'
                }`}
              >
                Xe mới
              </Link>
              <Link 
                to="/tinh-trang/Cũ" 
                className={`py-4 transition-colors ${
                  location.pathname === '/tinh-trang/Cũ'
                    ? 'text-vne-red border-b-2 border-vne-red font-bold'
                    : 'hover:text-vne-red text-gray-700'
                }`}
              >
                Xe cũ
              </Link>
              <a 
                href="/#tin-rao-theo-khoang-gia"
                onClick={handlePriceRangeClick}
                className={`py-4 transition-colors cursor-pointer ${
                  isPriceRangeActive
                    ? 'text-vne-red border-b-2 border-vne-red font-bold'
                    : 'hover:text-vne-red text-gray-700'
                }`}
              >
                Tìm theo giá
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 bg-vne-red text-white px-4 py-2 rounded text-sm font-bold uppercase hover:bg-vne-red-hover transition-colors">
              ĐĂNG TIN NGAY
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-gray-600 p-1 rounded-md hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-md flex flex-col gap-2 text-sm font-medium uppercase">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg ${location.pathname === '/' && !location.hash ? 'bg-rose-50 text-vne-red font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/tinh-trang/Mới" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg ${location.pathname === '/tinh-trang/Mới' ? 'bg-rose-50 text-vne-red font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Xe mới
            </Link>
            <Link 
              to="/tinh-trang/Cũ" 
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg ${location.pathname === '/tinh-trang/Cũ' ? 'bg-rose-50 text-vne-red font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Xe cũ
            </Link>
            <a 
              href="/#tin-rao-theo-khoang-gia"
              onClick={handlePriceRangeClick}
              className={`py-2 px-3 rounded-lg ${isPriceRangeActive ? 'bg-rose-50 text-vne-red font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Tìm theo giá
            </a>
            <div className="pt-2 border-t border-gray-100 mt-1">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-vne-red text-white py-2 rounded text-xs font-bold uppercase hover:bg-vne-red-hover transition-colors"
              >
                ĐĂNG TIN NGAY
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 pt-4 flex flex-col gap-4">
        <Outlet />
      </main>

      <footer className="w-full border-t border-gray-200 bg-white mt-12">
        <div className="max-w-[1000px] mx-auto px-4 py-4 sm:h-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2024 VnExpress V-Car - Hệ thống tin rao bán xe ô tô số 1 Việt Nam</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="hover:text-vne-red transition-colors">Trang chủ</Link>
            <a href="/#tin-rao-theo-khoang-gia" onClick={handlePriceRangeClick} className="hover:text-vne-red transition-colors">Tìm theo giá</a>
            <Link to="/tim-kiem" className="hover:text-vne-red transition-colors">Tìm kiếm</Link>
            <a href="#" className="hover:text-vne-red transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-vne-red transition-colors">Liên hệ đăng tin</a>
            <span className="hover:text-vne-red transition-colors">Hotline: 1900 1234</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
