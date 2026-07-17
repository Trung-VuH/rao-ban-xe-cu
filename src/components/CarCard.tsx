import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

export default function CarCard({ car, ...props }: { car: Car } & React.HTMLAttributes<HTMLDivElement>) {
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(1).replace('.0', '')} Tỷ`;
    }
    return `${price} Triệu`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group" {...props}>
      <Link to={`/xe/${car.id}`} className="block relative aspect-video bg-gray-200 overflow-hidden">
        <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        {car.status === 'Đã bán' ? (
          <div className="absolute inset-0 bg-gray-800/40 flex items-center justify-center">
            <span className="text-white font-bold">ĐÃ BÁN</span>
          </div>
        ) : (
          <span className={`absolute top-2 left-2 text-white text-[10px] px-2 py-0.5 rounded ${car.condition === 'Mới' ? 'bg-vne-red' : 'bg-black/60'}`}>
            {car.condition === 'Mới' ? 'Tin mới' : 'Đã qua sử dụng'}
          </span>
        )}
      </Link>
      <div className="p-3">
        <Link to={`/xe/${car.id}`} className="block">
          <h3 className={`text-sm font-bold line-clamp-2 h-10 mb-1 group-hover:text-vne-red transition-colors ${car.status === 'Đã bán' ? 'opacity-50' : ''}`}>
            {car.title}
          </h3>
        </Link>
        <p className={`${car.status === 'Đã bán' ? 'text-gray-400' : 'text-vne-red'} font-bold text-lg mb-1`}>
          {formatPrice(car.price)}
        </p>
        <div className={`flex justify-between text-[11px] ${car.status === 'Đã bán' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>{car.year} • {car.mileage === 0 ? 'Mới' : `${car.mileage.toLocaleString()} km`}</span>
          <span>{car.location}</span>
        </div>
      </div>
    </div>
  );
}
