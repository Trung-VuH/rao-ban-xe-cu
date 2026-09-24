export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  condition: 'Mới' | 'Cũ';
  price: number;
  location: string;
  bodyStyle: string;
  engine: string;
  seats: number;
  mileage: number;
  transmission: 'Số tự động' | 'Số sàn';
  description: string;
  seller: {
    name: string;
    phone: string;
    address: string;
  };
  status: 'Đang bán' | 'Đã bán' | 'Hết hạn';
  images: string[];
  tags: string[];
  datePosted: string;
}

export interface FilterState {
  keyword?: string;
  brand?: string;
  brands?: string[];
  model?: string;
  condition?: string;
  yearFrom?: number;
  yearTo?: number;
  year?: number;
  bodyStyle?: string;
  bodyStyles?: string[];
  engine?: string;
  priceFrom?: number;
  priceTo?: number;
  seats?: string; // "2", "3-5", "7-9"
  location?: string;
  locations?: string[];
}
