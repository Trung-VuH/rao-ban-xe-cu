import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#222] font-sans flex flex-col">
      <header className="w-full bg-white border-b border-gray-200 z-10 sticky top-0">
        <div className="max-w-[1000px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center border-r pr-6 border-gray-300">
              <Link to="/" className="text-vne-red text-2xl font-bold tracking-tighter uppercase">VnExpress</Link>
              <span className="ml-2 text-gray-400 font-light text-xl">|</span>
              <span className="ml-2 text-gray-800 font-semibold text-lg uppercase">V-CAR</span>
            </div>
            <nav className="hidden md:flex gap-5 text-sm font-medium uppercase tracking-wide">
              <Link to="/" className="text-vne-red border-b-2 border-vne-red py-4">Trang chủ</Link>
              <Link to="/tinh-trang/Mới" className="hover:text-vne-red transition-colors py-4">Xe mới</Link>
              <Link to="/tinh-trang/Cũ" className="hover:text-vne-red transition-colors py-4">Xe cũ</Link>
              <Link to="/hang-xe/Toyota" className="hover:text-vne-red transition-colors py-4">Toyota</Link>
              <Link to="/hang-xe/Hyundai" className="hover:text-vne-red transition-colors py-4">Hyundai</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 bg-vne-red text-white px-4 py-2 rounded text-sm font-bold uppercase hover:bg-vne-red-hover transition-colors">
              ĐĂNG TIN NGAY
            </button>
            <button className="md:hidden text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 pt-4 flex flex-col gap-4">
        <Outlet />
      </main>

      <footer className="w-full border-t border-gray-200 bg-white mt-12">
        <div className="max-w-[1000px] mx-auto px-4 h-12 flex items-center justify-between text-xs text-gray-500">
          <p>© 2024 VnExpress V-Car - Hệ thống tin rao bán xe ô tô số 1 Việt Nam</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-vne-red transition-colors">Trang chủ</Link>
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
