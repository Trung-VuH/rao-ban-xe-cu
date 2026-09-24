import { Car } from '../types';

export interface KeywordSearchItem {
  keyword: string;
  volume: number; // Monthly search volume over last 24 months
}

export interface PriceRangeConfig {
  slug: string;
  title: string;
  shortLabel: string;
  priceDisplay: string;
  searchVolumeTotal: number; // Tổng volume search hàng tháng
  searchGrowthNote?: string;
  popularKeywords: KeywordSearchItem[];
  suitableFor: string[];
  recommendedModels: string[];
  adviceSummary: string;
  minPrice: number; // in millions VND
  maxPrice: number; // in millions VND
  categoryType: 'price-bracket' | 'special-segment';
  matchFn: (car: Car) => boolean;
}

export const PRICE_RANGES: PriceRangeConfig[] = [
  {
    slug: 'duoi-100-trieu',
    title: 'Xe ô tô cũ dưới 100 triệu',
    shortLabel: 'Dưới 100 triệu',
    priceDisplay: '< 100 triệu',
    searchVolumeTotal: 4880,
    searchGrowthNote: 'Nhu cầu tìm xe tập lái, che mưa che nắng che sương',
    popularKeywords: [
      { keyword: 'bằng giá xe ô to cũ dưới 100 triệu', volume: 1300 },
      { keyword: 'bán xe oto cũ giá 30 triệu đến 50tr', volume: 880 },
      { keyword: 'xe tải cũ giá dưới 100 triệu', volume: 880 },
      { keyword: 'xe hơi cũ giá 70 triệu', volume: 390 },
      { keyword: 'xe 4 chỗ giá rẻ dưới 100 triệu', volume: 260 },
      { keyword: 'bán xe jeep giá 50 triệu', volume: 210 },
      { keyword: 'ô tô cũ dưới 100 triệu', volume: 170 },
      { keyword: 'xe hơi cũ giá 20 triệu', volume: 170 },
      { keyword: 'xe ô tô cũ dưới 100 triệu', volume: 90 },
      { keyword: 'xe hơi giá rẻ dưới 100 triệu', volume: 70 },
      { keyword: 'oto giá 100 triệu', volume: 30 },
      { keyword: 'mua xe dưới 100 triệu', volume: 30 }
    ],
    suitableFor: ['Người mới lấy bằng cần xe tập lái', 'Gia đình nhỏ che mưa nắng vùng nông thôn', 'Kinh doanh nhỏ vận chuyển linh hoạt'],
    recommendedModels: ['Chevrolet Spark', 'Kia Morning (2007-2010)', 'Daewoo Matiz', 'Daewoo Lanos', 'Suzuki Wagon'],
    adviceSummary: 'Ưu tiên kiểm tra kỹ khung gầm, hệ thống làm mát và dây điện. Nên dự trù thêm 10-15 triệu để bảo dưỡng, thay lốp và thay dầu ngay sau khi mua.',
    minPrice: 0,
    maxPrice: 100,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price <= 100
  },
  {
    slug: '100-200-trieu',
    title: 'Xe ô tô cũ từ 100 - 200 triệu',
    shortLabel: '100 - 200 triệu',
    priceDisplay: '100 - 200 triệu',
    searchVolumeTotal: 8650,
    searchGrowthNote: 'Nhóm từ khóa có lượt tìm kiếm tăng trưởng hàng đầu',
    popularKeywords: [
      { keyword: 'xe oto cũ 200 triệu', volume: 1900 },
      { keyword: 'bán xe ô to cũ giá dưới 200 triệu', volume: 880 },
      { keyword: 'xe 7 chỗ cũ giá 200 triệu', volume: 880 },
      { keyword: 'xe i10 cũ giá 200 triệu', volume: 720 },
      { keyword: 'xe vios cũ giá dưới 200 triệu', volume: 480 },
      { keyword: 'xe oto mới giá 200 triệu', volume: 390 },
      { keyword: 'xe innova cũ giá 200 triệu', volume: 210 },
      { keyword: 'xe ô to giá rẻ dưới 200 triệu', volume: 170 },
      { keyword: '150 triệu', volume: 170 },
      { keyword: 'bán xe oto cũ giá 120 triệu', volume: 140 },
      { keyword: 'xe ô tô cũ dưới 200 triệu', volume: 140 },
      { keyword: 'ô tô 200 triệu', volume: 110 }
    ],
    suitableFor: ['Người mua xe lần đầu', 'Chạy xe dịch vụ bán thời gian', 'Phương tiện đi làm hàng ngày bền bỉ, tiết kiệm xăng'],
    recommendedModels: ['Hyundai Grand i10 (2014-2016)', 'Kia Morning (2012-2015)', 'Toyota Vios (2008-2011)', 'Toyota Innova (2006-2008)', 'Chevrolet Cruze'],
    adviceSummary: 'Trong tầm 100-200 triệu, các dòng xe hạng A như i10, Morning đời 2013-2016 là lựa chọn an toàn nhất nhờ phụ tùng rẻ, sẵn có và dễ sửa chữa.',
    minPrice: 101,
    maxPrice: 200,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 100 && car.price <= 200
  },
  {
    slug: '200-300-trieu',
    title: 'Xe ô tô cũ từ 200 - 300 triệu',
    shortLabel: '200 - 300 triệu',
    priceDisplay: '200 - 300 triệu',
    searchVolumeTotal: 12300,
    searchGrowthNote: 'Phân khúc sôi động nhất thị trường xe đã qua sử dụng',
    popularKeywords: [
      { keyword: 'xe vios cũ giá dưới 300 triệu', volume: 1000 },
      { keyword: 'xe ô to giá rẻ dưới 300 triệu', volume: 1000 },
      { keyword: 'xe ô to cũ giá rẻ dưới 300 triệu', volume: 880 },
      { keyword: 'xe bán tải cũ dưới 300 triệu', volume: 320 },
      { keyword: '300 triệu', volume: 320 },
      { keyword: 'xe 7 chỗ cũ dưới 300 triệu', volume: 260 },
      { keyword: 'xe vios cũ giá dưới 250 triệu', volume: 210 },
      { keyword: 'xe oto cũ 300 triệu tại tphcm', volume: 170 },
      { keyword: 'xe cũ starex 9 chỗ dưới 300 triệu', volume: 110 },
      { keyword: 'xe honda civic cũ tầm 300 triệu', volume: 110 },
      { keyword: 'oto giá 300 triệu', volume: 110 },
      { keyword: '5 xe cũ tiết kiệm xăng giá dưới 300 triệu', volume: 110 }
    ],
    suitableFor: ['Chạy dịch vụ Grab/Be', 'Gia đình trẻ từ 3-4 thành viên', 'Người cần sedan hạng B rộng rãi, giữ giá cao'],
    recommendedModels: ['Toyota Vios (2013-2016)', 'Hyundai Grand i10 (2017-2019)', 'Honda City (2013-2015)', 'Kia Morning (2018-2020)', 'Hyundai Accent (2013-2015)', 'VinFast Fadil (2019-2020)'],
    adviceSummary: 'Phân khúc "vàng" với rất nhiều lựa chọn Toyota Vios, City, Fadil hoặc Grand i10 chất lượng ổn định. Nên kiểm tra kỹ lịch sử bảo dưỡng và đồng hồ ODO.',
    minPrice: 201,
    maxPrice: 300,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 200 && car.price <= 300
  },
  {
    slug: '300-400-trieu',
    title: 'Xe ô tô cũ từ 300 - 400 triệu',
    shortLabel: '300 - 400 triệu',
    priceDisplay: '300 - 400 triệu',
    searchVolumeTotal: 3450,
    searchGrowthNote: 'Nhiều xe lướt đời cao, trang bị hiện đại và an toàn',
    popularKeywords: [
      { keyword: 'mua xe bán tải cũ dưới 400 triệu', volume: 480 },
      { keyword: 'xe 7 chỗ cũ dưới 400 triệu', volume: 390 },
      { keyword: '300 400 triệu nên mua xe gì', volume: 260 },
      { keyword: '300 400 triệu nên mua xe cũ gì', volume: 110 },
      { keyword: 'xe bán tải cũ dưới 350 triệu', volume: 170 },
      { keyword: '400 triệu', volume: 140 },
      { keyword: '400 triệu mua xe gì', volume: 140 },
      { keyword: 'xe 400 triệu', volume: 90 },
      { keyword: 'oto cũ 400 triệu', volume: 40 },
      { keyword: 'xe cũ dưới 400 triệu', volume: 30 }
    ],
    suitableFor: ['Gia đình mua xe phục vụ du lịch cuối tuần', 'Xe sedan hạng B đời cao 2018-2021', 'Bán tải hoặc MPV 7 chỗ thực dụng'],
    recommendedModels: ['Toyota Vios (2017-2020)', 'Honda City (2016-2018)', 'Hyundai Accent (2018-2020)', 'Kia K3 / Cerato (2016-2018)', 'Mitsubishi Xpander (2018-2019)'],
    adviceSummary: 'Khoảng giá này có thể tiếp cận xe sedan số tự động đời khá mới, trang bị cân bằng điện tử, camera lùi và túi khí đầy đủ.',
    minPrice: 301,
    maxPrice: 400,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 300 && car.price <= 400
  },
  {
    slug: '400-500-trieu',
    title: 'Xe ô tô từ 400 - 500 triệu',
    shortLabel: '400 - 500 triệu',
    priceDisplay: '400 - 500 triệu',
    searchVolumeTotal: 2850,
    searchGrowthNote: 'Cửa ngõ vào các dòng CUV gầm cao và sedan hạng C',
    popularKeywords: [
      { keyword: 'xe fortuner cũ giá 500 triệu', volume: 140 },
      { keyword: 'mua xe bán tải cũ dưới 500 triệu', volume: 170 },
      { keyword: 'xe bán tải cũ giá 450 triệu', volume: 170 },
      { keyword: 'xe mui trần giá dưới 500 triệu', volume: 140 },
      { keyword: 'xe ô to tầm giá 400 đến 500 triệu', volume: 140 },
      { keyword: 'xe dưới 500 triệu', volume: 140 },
      { keyword: 'xe ô tô dưới 500 triệu', volume: 140 },
      { keyword: 'xe 500 triệu', volume: 140 },
      { keyword: 'xe oto 500 triệu', volume: 110 },
      { keyword: 'oto dưới 500 triệu', volume: 90 },
      { keyword: 'xe ô tô giá dưới 500 triệu', volume: 90 },
      { keyword: '500 triệu mua xe suv cũ nào', volume: 70 }
    ],
    suitableFor: ['Doanh nhân trẻ, nhân viên văn phòng', 'Gia đình muốn nâng cấp xe rộng rãi hơn', 'Người thích xe gầm cao CUV đô thị'],
    recommendedModels: ['Mazda 3 (2017-2019)', 'Kia Cerato (2018-2020)', 'Ford EcoSport (2018-2020)', 'Ford Ranger XLS (2016-2018)', 'Toyota Fortuner (2010-2013)'],
    adviceSummary: 'Mức giá 400-500 triệu mang lại cảm giác lái đầm chắc, cách âm tốt hơn đáng kể so với xe hạng A/B. Đa dạng kiểu dáng từ Sedan C đến SUV.',
    minPrice: 401,
    maxPrice: 500,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 400 && car.price <= 500
  },
  {
    slug: '500-600-trieu',
    title: 'Xe ô tô từ 500 - 600 triệu',
    shortLabel: '500 - 600 triệu',
    priceDisplay: '500 - 600 triệu',
    searchVolumeTotal: 2150,
    searchGrowthNote: 'Nhiều mẫu CUV hạng B/C lướt và MPV gia đình đắt khách',
    popularKeywords: [
      { keyword: 'xe ô tô giá từ 500 đến 600 triệu', volume: 260 },
      { keyword: '500 triệu mua xe gì', volume: 260 },
      { keyword: '600 triệu mua xe gì', volume: 170 },
      { keyword: '600 triệu', volume: 140 },
      { keyword: 'xe ô tô tầm giá 500 triệu', volume: 140 },
      { keyword: 'xe oto tầm giá 500 triệu', volume: 110 },
      { keyword: 'xe 7 chỗ dưới 500 triệu', volume: 90 },
      { keyword: 'xe ô tô 500 triệu', volume: 170 },
      { keyword: 'xe 7 chỗ cũ dưới 600 triệu', volume: 30 },
      { keyword: 'xe bán tải cũ dưới 600 triệu', volume: 50 }
    ],
    suitableFor: ['Gia đình đông thành viên đi chơi xa', 'Cần xe gầm cao vận hành linh hoạt đường phố và cao tốc', 'Xe lướt chạy dưới 40.000 km'],
    recommendedModels: ['Mazda CX-5 (2016-2018)', 'Hyundai Tucson (2016-2018)', 'Kia Seltos (2020-2022)', 'Toyota Corolla Cross (2020-2021)', 'Honda CR-V (2014-2016)'],
    adviceSummary: 'Trong phân khúc 500-600 triệu, khách hàng có thể sở hữu những chiếc CUV gầm cao thương hiệu Nhật, Hàn danh tiếng với tiện nghi phong phú.',
    minPrice: 501,
    maxPrice: 600,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 500 && car.price <= 600
  },
  {
    slug: '600-800-trieu',
    title: 'Xe ô tô từ 600 - 800 triệu',
    shortLabel: '600 - 800 triệu',
    priceDisplay: '600 - 800 triệu',
    searchVolumeTotal: 1650,
    searchGrowthNote: 'Phân khúc SUV 7 chỗ và CUV hạng C đời cao',
    popularKeywords: [
      { keyword: '700 triệu mua xe gì', volume: 140 },
      { keyword: 'xe 7 chỗ dưới 800 triệu', volume: 140 },
      { keyword: '700 triệu', volume: 90 },
      { keyword: '800 triệu', volume: 90 },
      { keyword: 'xe 7 chỗ cũ dưới 800 triệu', volume: 140 },
      { keyword: '600 triệu mua xe cũ gì', volume: 30 },
      { keyword: 'xe SUV cũ tầm giá 700 triệu', volume: 120 }
    ],
    suitableFor: ['Doanh nhân, quản lý cấp trung', 'Gia đình đa thế hệ cần sự an toàn tối đa', 'Chuyến đi công tác đường dài'],
    recommendedModels: ['Hyundai Santa Fe (2017-2019)', 'Ford Everest (2017-2020)', 'Honda CR-V (2017-2020)', 'Toyota Camry (2015-2018)', 'Kia Sorento (2018-2021)'],
    adviceSummary: 'Tầm giá 600-800 triệu cung cấp những dòng xe SUV 7 chỗ khung gầm liền khối hoặc rời cao cấp, cách âm tốt và cảm giác lái rất đầm chắc.',
    minPrice: 601,
    maxPrice: 800,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 600 && car.price <= 800
  },
  {
    slug: '800-trieu-den-1-ty',
    title: 'Xe ô tô từ 800 triệu - 1 Tỷ',
    shortLabel: '800 triệu - 1 Tỷ',
    priceDisplay: '800 triệu - 1 Tỷ',
    searchVolumeTotal: 980,
    searchGrowthNote: 'Các dòng xe lướt gần như mới, bảo hành chính hãng',
    popularKeywords: [
      { keyword: 'xe 800 triệu', volume: 90 },
      { keyword: 'xe ô tô 900 triệu', volume: 110 },
      { keyword: 'xe SUV lướt dưới 1 tỷ', volume: 150 },
      { keyword: 'mua xe ô tô tầm 1 tỷ', volume: 180 },
      { keyword: 'Santa Fe lướt 900 triệu', volume: 130 }
    ],
    suitableFor: ['Khách hàng chuộng xe công nghệ cao', 'Xe lướt ODO dưới 20.000 km còn hạn bảo hành hãng dài hạn'],
    recommendedModels: ['Hyundai Santa Fe (2020-2022)', 'Ford Everest (2020-2022)', 'Toyota Camry (2019-2021)', 'Kia Carnival (2021-2022)', 'Mazda CX-8'],
    adviceSummary: 'Hầu hết các xe trong tầm giá này đều có lịch sử bảo dưỡng chính hãng rõ ràng, gói công nghệ an toàn chủ động ADAS và nội thất da cao cấp.',
    minPrice: 801,
    maxPrice: 1000,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 800 && car.price <= 1000
  },
  {
    slug: 'tren-1-ty',
    title: 'Xe ô tô cao cấp trên 1 Tỷ',
    shortLabel: 'Trên 1 Tỷ',
    priceDisplay: '> 1 Tỷ',
    searchVolumeTotal: 1850,
    searchGrowthNote: 'Phân khúc xe sang Mercedes, BMW, Lexus và SUV cỡ lớn',
    popularKeywords: [
      { keyword: 'xe oto tren 1 ty', volume: 320 },
      { keyword: 'Ford Everest mới 2026', volume: 450 },
      { keyword: 'Mercedes C-Class cũ', volume: 380 },
      { keyword: 'BMW 3 Series lướt', volume: 290 },
      { keyword: 'Lexus RX cũ lướt', volume: 240 }
    ],
    suitableFor: ['Chủ doanh nghiệp, lãnh đạo', 'Trải nghiệm tiện nghi xa xỉ, phong cách sang trọng và đẳng cấp cá nhân'],
    recommendedModels: ['Ford Everest 2026', 'Mercedes-Benz C-Class / GLC', 'BMW 3 Series / X3', 'Lexus ES / RX', 'Toyota Land Cruiser Prado'],
    adviceSummary: 'Nên kiểm tra lịch sử tại hãng ủy quyền và mua gói bảo hiểm thân vỏ toàn diện để an tâm sử dụng xe sang.',
    minPrice: 1001,
    maxPrice: 99999,
    categoryType: 'price-bracket',
    matchFn: (car: Car) => car.price > 1000
  },
  {
    slug: 'xe-7-cho-200-400-trieu',
    title: 'Xe 7 chỗ cũ giá 200 - 400 triệu',
    shortLabel: '7 chỗ 200 - 400 triệu',
    priceDisplay: '200 - 400 triệu',
    searchVolumeTotal: 3820,
    searchGrowthNote: 'Nhu cầu xe gia đình đông người và chạy dịch vụ rất cao',
    popularKeywords: [
      { keyword: 'xe 7 chỗ cũ giá 200 triệu', volume: 880 },
      { keyword: 'xe 7 chỗ cũ dưới 400 triệu', volume: 390 },
      { keyword: 'xe 7 chỗ cũ dưới 300 triệu', volume: 260 },
      { keyword: 'xe innova cũ giá 200 triệu', volume: 210 },
      { keyword: 'xe cũ starex 9 chỗ dưới 300 triệu', volume: 110 },
      { keyword: 'xe ô tô 7 chỗ cũ giá 300 triệu', volume: 90 },
      { keyword: 'xe 7 chỗ cũ giá rẻ dưới 100 triệu', volume: 40 },
      { keyword: 'mua xe 7 chỗ cũ giá dưới 300 triệu', volume: 40 }
    ],
    suitableFor: ['Chạy dịch vụ chở khách, du lịch liên tỉnh', 'Gia đình 2-3 thế hệ cùng sinh sống', 'Chở hàng hóa gia đình kết hợp đi lại'],
    recommendedModels: ['Toyota Innova (2008-2015)', 'Mitsubishi Xpander (2018-2019)', 'Suzuki Ertiga (2015-2019)', 'Chevrolet Captiva', 'Kia Rondo / Carens'],
    adviceSummary: 'Toyota Innova và Xpander là hai mẫu xe thanh khoản cao nhất, khoang hành khách rộng rãi và chi phí nhiên liệu hợp lý.',
    minPrice: 180,
    maxPrice: 420,
    categoryType: 'special-segment',
    matchFn: (car: Car) => car.price >= 180 && car.price <= 420 && car.seats >= 7
  },
  {
    slug: 'xe-ban-tai-duoi-400-trieu',
    title: 'Xe bán tải cũ dưới 400 triệu',
    shortLabel: 'Bán tải < 400 triệu',
    priceDisplay: '< 400 triệu',
    searchVolumeTotal: 2980,
    searchGrowthNote: 'Nhu cầu chuyên chở công trình, nông trại và phượt địa hình',
    popularKeywords: [
      { keyword: 'mua xe bán tải cũ dưới 400 triệu', volume: 480 },
      { keyword: 'xe bán tải cũ dưới 300 triệu', volume: 320 },
      { keyword: 'xe bán tải cũ giá rẻ dưới 200 triệu', volume: 320 },
      { keyword: 'xe bán tải cũ dưới 350 triệu', volume: 170 },
      { keyword: 'xe bán tải cũ giá dưới 100 triệu', volume: 140 },
      { keyword: 'xe bán tải cũ dưới 200 triệu tphcm', volume: 110 },
      { keyword: 'xe bán tải cũ dưới 150 triệu', volume: 170 },
      { keyword: 'xe bán tải cũ dưới 50 triệu', volume: 70 }
    ],
    suitableFor: ['Kinh doanh vật liệu, kỹ thuật công trình', 'Chở cây cảnh, nông sản, máy móc', 'Đi đường đèo dốc, địa hình phức tạp'],
    recommendedModels: ['Ford Ranger XLS/XLT (2012-2016)', 'Mitsubishi Triton (2013-2017)', 'Nissan Navara (2012-2016)', 'Isuzu D-Max (2013-2017)', 'Mazda BT-50 (2013-2016)'],
    adviceSummary: 'Cần kiểm tra kỹ gầm xe xem có bị rỉ sét do bùn đất hoặc chở tải nặng thường xuyên hay không, thử hoạt động của hệ dẫn động 4x4.',
    minPrice: 0,
    maxPrice: 400,
    categoryType: 'special-segment',
    matchFn: (car: Car) => car.price <= 400 && (car.bodyStyle.includes('Bán tải') || ['Ranger', 'Triton', 'Navara', 'D-Max', 'BT-50'].includes(car.model))
  },
  {
    slug: 'vios-i10-200-300-trieu',
    title: 'Xe Vios, i10, City cũ 200 - 300 triệu',
    shortLabel: 'Vios / i10 / City 200 - 300Tr',
    priceDisplay: '200 - 300 triệu',
    searchVolumeTotal: 4860,
    searchGrowthNote: 'Những mẫu xe "quốc dân" có tính thanh khoản cao nhất tại Việt Nam',
    popularKeywords: [
      { keyword: 'xe vios cũ giá dưới 300 triệu', volume: 1000 },
      { keyword: 'xe i10 cũ giá 200 triệu', volume: 720 },
      { keyword: 'xe vios cũ giá dưới 200 triệu', volume: 480 },
      { keyword: 'xe vios cũ giá dưới 250 triệu', volume: 210 },
      { keyword: 'xe vios cũ giá dưới 250 triệu tphcm', volume: 70 },
      { keyword: 'honda city 300 triệu', volume: 30 }
    ],
    suitableFor: ['Tài xế công nghệ chạy xe dịch vụ chuyên nghiệp', 'Mua xe che nắng mưa bền bỉ với chi phí nuôi xe chỉ 3-4 triệu/tháng'],
    recommendedModels: ['Toyota Vios E/G (2013-2016)', 'Hyundai Grand i10 1.2 AT/MT (2016-2019)', 'Honda City (2013-2015)', 'Kia Morning Si (2017-2020)'],
    adviceSummary: 'Xe "quốc dân" cực kỳ dễ bán lại, phụ tùng rẻ như xe máy, tiết kiệm nhiên liệu từ 5 - 6L/100km hỗn hợp.',
    minPrice: 180,
    maxPrice: 320,
    categoryType: 'special-segment',
    matchFn: (car: Car) => car.price >= 180 && car.price <= 320 && ['Vios', 'Grand i10', 'City', 'Morning', 'Accent', 'Fadil'].includes(car.model)
  }
];

export function getPriceRangeBySlug(slug: string): PriceRangeConfig | undefined {
  return PRICE_RANGES.find(r => r.slug === slug);
}

// Find primary bracket matching car's price
export function getCarPrimaryPriceRange(car: Car): PriceRangeConfig {
  // First check standard brackets
  const standard = PRICE_RANGES.filter(r => r.categoryType === 'price-bracket').find(r => r.matchFn(car));
  if (standard) return standard;

  // Fallback
  if (car.price <= 100) return PRICE_RANGES[0];
  if (car.price <= 200) return PRICE_RANGES[1];
  if (car.price <= 300) return PRICE_RANGES[2];
  if (car.price <= 400) return PRICE_RANGES[3];
  if (car.price <= 500) return PRICE_RANGES[4];
  if (car.price <= 600) return PRICE_RANGES[5];
  if (car.price <= 800) return PRICE_RANGES[6];
  if (car.price <= 1000) return PRICE_RANGES[7];
  return PRICE_RANGES[8];
}

// Get all matching price ranges (including special segments like 7 chỗ, bán tải, Vios/i10)
export function getAllMatchingPriceRanges(car: Car): PriceRangeConfig[] {
  return PRICE_RANGES.filter(r => r.matchFn(car));
}
