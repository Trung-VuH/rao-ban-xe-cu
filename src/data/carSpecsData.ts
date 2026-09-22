import { Car } from '../types';
import { BRAND_IMAGES, getModelImage } from './mockData';

export interface SpecItem {
  name: string;
  value: string;
  highlight?: boolean;
  note?: string;
}

export interface SpecGroup {
  id: string;
  title: string;
  iconName?: string;
  items: SpecItem[];
}

export interface CarVersion {
  name: string;
  price: number; // in millions
  active?: boolean;
}

export interface CarDetailedSpecs {
  carId: string;
  versionName: string;
  fullName: string;
  brand: string;
  model: string;
  year: number;
  segment: string;
  origin: string;
  bodyStyle: string;
  seats: number;
  engineType: string;
  transmission: string;
  driveTrain: string;
  listedPrice: number; // in millions
  heroImage: string;
  brandLogo?: string;
  colorOptions: { name: string; hex: string }[];
  versions: CarVersion[];
  specGroups: SpecGroup[];
}

export function getCarSpecs(car: Car): CarDetailedSpecs {
  const isEverest = car.model.toLowerCase().includes('everest');
  const isRanger = car.model.toLowerCase().includes('ranger');
  const isVF8 = car.model.toLowerCase().includes('vf 8') || car.model.toLowerCase().includes('vf8');
  const isCamry = car.model.toLowerCase().includes('camry');
  const isCX5 = car.model.toLowerCase().includes('cx-5');
  const isCity = car.model.toLowerCase().includes('city');
  const isSantaFe = car.model.toLowerCase().includes('santa fe');
  const isXpander = car.model.toLowerCase().includes('xpander');

  const brandLogo = BRAND_IMAGES[car.brand];
  const heroImage = car.images?.[0] || getModelImage(car.model);

  // If Ford Everest or specifically matching requested URL example
  if (isEverest) {
    const versionName = 'Active 2.0 AT 4x2';
    const fullName = `${car.brand} ${car.model} ${car.year} ${versionName}`;
    const listedPrice = car.price || 1245;

    return {
      carId: car.id,
      versionName,
      fullName,
      brand: car.brand,
      model: car.model,
      year: car.year,
      segment: 'SUV phổ thông cỡ lớn',
      origin: 'Nhập khẩu Thái Lan',
      bodyStyle: 'SUV 7 chỗ',
      seats: 7,
      engineType: '2.0L Turbo Diesel TDCi',
      transmission: 'Số tự động 6 cấp (6AT)',
      driveTrain: 'Dẫn động cầu sau (4x2 / RWD)',
      listedPrice,
      heroImage,
      brandLogo,
      colorOptions: [
        { name: 'Trắng tuyết', hex: '#F5F5F5' },
        { name: 'Đen Absolute', hex: '#1C1C1C' },
        { name: 'Xám Meteor', hex: '#5A6265' },
        { name: 'Đỏ Sunset', hex: '#8B1E26' },
        { name: 'Bạc Aluminium', hex: '#C0C0C0' },
        { name: 'Xanh Blue Metallic', hex: '#1B365D' }
      ],
      versions: [
        { name: 'Ambiente 2.0L AT 4x2', price: 1099 },
        { name: 'Sport 2.0L AT 4x2', price: 1178 },
        { name: 'Active 2.0 AT 4x2', price: listedPrice, active: true },
        { name: 'Titanium 2.0L AT 4x2', price: 1299 },
        { name: 'Titanium+ 2.0L Bi-Turbo 4x4', price: 1468 },
        { name: 'Wildtrak 2.0L Bi-Turbo 4x4', price: 1499 },
        { name: 'Platinum 2.0L Bi-Turbo 4x4', price: 1545 }
      ],
      specGroups: [
        {
          id: 'tong-quan',
          title: 'Tổng quan & Kích thước',
          items: [
            { name: 'Dài x Rộng x Cao (mm)', value: '4.914 x 1.923 x 1.842', highlight: true },
            { name: 'Chiều dài cơ sở (mm)', value: '2.900', highlight: true },
            { name: 'Chiều rộng cơ sở trước/sau (mm)', value: '1.620 / 1.620' },
            { name: 'Khoảng sáng gầm xe (mm)', value: '200', highlight: true },
            { name: 'Bán kính vòng quay tối thiểu (m)', value: '5.85' },
            { name: 'Dung tích bình nhiên liệu (Lít)', value: '80' },
            { name: 'Số chỗ ngồi', value: '7 chỗ', highlight: true },
            { name: 'Trọng lượng không tải (kg)', value: '2.215' },
            { name: 'Trọng lượng toàn tải (kg)', value: '3.100' },
            { name: 'Dung tích khoang hành lý (Lít)', value: '572 (mở đủ 3 hàng ghế) / 2.010 (gập hàng 2 & 3)' },
            { name: 'Khả năng lội nước (mm)', value: '800' }
          ]
        },
        {
          id: 'dong-co',
          title: 'Động cơ & Vận hành',
          items: [
            { name: 'Loại động cơ', value: 'Single Turbo Diesel 2.0L i4 TDCi', highlight: true },
            { name: 'Dung tích xi lanh (cc)', value: '1.996' },
            { name: 'Công suất cực đại (Hp / rpm)', value: '170 mã lực @ 3.500 vòng/phút', highlight: true },
            { name: 'Mô-men xoắn cực đại (Nm / rpm)', value: '405 Nm @ 1.750 - 2.500 vòng/phút', highlight: true },
            { name: 'Hộp số', value: 'Số tự động 6 cấp điện tử (6AT)', highlight: true },
            { name: 'Hệ thống truyền động', value: 'Dẫn động cầu sau (4x2 / RWD)', highlight: true },
            { name: 'Trợ lực lái', value: 'Trợ lực lái điện tử (EPAS)' },
            { name: 'Chế độ lái tùy chọn', value: 'Normal, Eco, Tow/Haul, Slippery (Trơn trượt)' },
            { name: 'Hệ thống treo trước', value: 'Độc lập, tay đòn kép với thanh cân bằng' },
            { name: 'Hệ thống treo sau', value: 'Lò xo trụ, giảm chấn lớn & thanh ổn định kiểu Watts' },
            { name: 'Hệ thống phanh trước / sau', value: 'Đĩa tản nhiệt / Đĩa đặc' },
            { name: 'Cỡ lốp / Mâm xe', value: '255/65R18 - Mâm hợp kim đúc 18 inch' },
            { name: 'Tiêu chuẩn khí thải', value: 'Euro 5' }
          ]
        },
        {
          id: 'ngoai-that',
          title: 'Ngoại thất',
          items: [
            { name: 'Cụm đèn chiếu sáng phía trước', value: 'LED tự động bật tắt bằng cảm biến ánh sáng', highlight: true },
            { name: 'Đèn định vị LED ban ngày', value: 'Dải LED hình chữ C đặc trưng' },
            { name: 'Đèn sương mù trước', value: 'LED' },
            { name: 'Cụm đèn hậu', value: 'Full LED thanh mảnh kết nối ngang' },
            { name: 'Gương chiếu hậu', value: 'Chỉnh điện, gập điện tự động, tích hợp đèn báo rẽ & sấy mặt gương', highlight: true },
            { name: 'Gạt mưa tự động', value: 'Có cảm biến gạt nước mưa' },
            { name: 'Cửa sổ trời', value: 'Tùy chọn Panorama toàn cảnh điều khiển điện' },
            { name: 'Cốp đóng / mở điện thông minh', value: 'Có tính năng mở cốp rảnh tay (đá cốp)', highlight: true },
            { name: 'Bệ bước chân hai bên', value: 'Hợp kim nhôm đúc nguyên khối' },
            { name: 'Thanh giá nóc thể thao', value: 'Có (chịu tải 350kg tĩnh / 85kg động)' }
          ]
        },
        {
          id: 'noi-that',
          title: 'Nội thất & Tiện nghi',
          items: [
            { name: 'Chất liệu ghế', value: 'Da cao cấp kết hợp chỉ khâu tương phản', highlight: true },
            { name: 'Ghế người lái', value: 'Chỉnh điện 8 hướng', highlight: true },
            { name: 'Ghế phụ phía trước', value: 'Chỉnh điện 6 hướng' },
            { name: 'Hàng ghế thứ 2', value: 'Gập 60:40, trượt tiến/lùi, ngả lưng ghế & bệ tỳ tay có để ly' },
            { name: 'Hàng ghế thứ 3', value: 'Gập phẳng 50:50 sàn xe' },
            { name: 'Vô lăng', value: 'Bọc da cao cấp 3 chấu tích hợp phím điều khiển đa chức năng' },
            { name: 'Bảng đồng hồ tốc độ', value: 'Màn hình kỹ thuật số TFT 8 inch sắc nét', highlight: true },
            { name: 'Màn hình giải trí trung tâm', value: 'Cảm ứng đặt dọc 10.1 inch hỗ trợ SYNC® 4A', highlight: true },
            { name: 'Kết nối điện thoại', value: 'Apple CarPlay & Android Auto không dây, Bluetooth, USB-A/C', highlight: true },
            { name: 'Hệ thống âm thanh', value: '8 loa chất lượng cao' },
            { name: 'Điều hòa nhiệt độ', value: 'Tự động 2 vùng độc lập, cửa gió hàng 2 và 3', highlight: true },
            { name: 'Sạc điện thoại không dây', value: 'Có chuẩn Qi' },
            { name: 'Phanh tay điện tử & Auto Hold', value: 'Có', highlight: true },
            { name: 'Khởi động nút bấm & Smartkey', value: 'Có' }
          ]
        },
        {
          id: 'an-toan',
          title: 'An toàn & Hỗ trợ người lái',
          items: [
            { name: 'Số lượng túi khí', value: '7 túi khí (trước, rèm, hông và đầu gối người lái)', highlight: true },
            { name: 'Chống bó cứng phanh (ABS)', value: 'Có' },
            { name: 'Phân phối lực phanh điện tử (EBD)', value: 'Có' },
            { name: 'Hỗ trợ lực phanh khẩn cấp (BA)', value: 'Có' },
            { name: 'Cân bằng điện tử (ESP / ESC)', value: 'Có', highlight: true },
            { name: 'Kiểm soát lực kéo (TCS)', value: 'Có' },
            { name: 'Hỗ trợ khởi hành ngang dốc (HLA)', value: 'Có' },
            { name: 'Hệ thống chống lật xe (ROM)', value: 'Có' },
            { name: 'Hệ thống kiểm soát hành trình (Cruise Control)', value: 'Có (Ga tự động thông minh)', highlight: true },
            { name: 'Cảm biến đỗ xe', value: 'Cảm biến phía trước và phía sau' },
            { name: 'Camera quan sát', value: 'Camera lùi góc rộng độ nét cao' },
            { name: 'Cảnh báo điểm mù (BLIS)', value: 'Có tích hợp cảnh báo phương tiện cắt ngang khi lùi', highlight: true },
            { name: 'Cảnh báo áp suất lốp (TPMS)', value: 'Có hiển thị chi tiết từng bánh xe' },
            { name: 'Móc ghế an toàn trẻ em ISOFIX', value: 'Có ở hàng ghế thứ 2' }
          ]
        }
      ]
    };
  }

  // Generic dynamic generator tailored for any brand and model
  const isElectric = car.engine === 'Điện' || isVF8;
  const isHybrid = car.engine === 'Hybrid';
  const seats = car.seats || 5;
  const listedPrice = car.price || 850;
  const versionName = isElectric ? 'Plus EV Full Option' : (car.transmission === 'Số tự động' ? '2.0 AT Premium' : '1.5 MT Tiêu chuẩn');
  const fullName = `${car.brand} ${car.model} ${car.year} ${versionName}`;

  let origin = 'Lắp ráp trong nước (CKD)';
  if (['Toyota', 'Honda', 'Ford', 'Mazda', 'Mitsubishi'].includes(car.brand) && (isEverest || isRanger || car.model === 'Camry')) {
    origin = 'Nhập khẩu Thái Lan (CBU)';
  } else if (car.brand === 'VinFast') {
    origin = 'Sản xuất tại Hải Phòng, Việt Nam';
  } else if (['Mercedes', 'BMW', 'Audi', 'Porsche', 'Lexus', 'Volvo', 'Land Rover'].includes(car.brand)) {
    origin = 'Nhập khẩu nguyên chiếc';
  }

  const length = seats >= 7 ? 4800 + Math.floor(Math.random() * 200) : 4400 + Math.floor(Math.random() * 250);
  const width = seats >= 7 ? 1860 + Math.floor(Math.random() * 80) : 1780 + Math.floor(Math.random() * 60);
  const height = car.bodyStyle.includes('SUV') || car.bodyStyle.includes('Bán tải') || car.bodyStyle.includes('MPV') ? 1750 + Math.floor(Math.random() * 100) : 1450 + Math.floor(Math.random() * 50);
  const wheelbase = seats >= 7 ? 2820 + Math.floor(Math.random() * 100) : 2650 + Math.floor(Math.random() * 70);
  const groundClearance = car.bodyStyle.includes('SUV') || car.bodyStyle.includes('Bán tải') ? 190 + Math.floor(Math.random() * 30) : 145 + Math.floor(Math.random() * 20);

  const hp = isElectric ? 350 + Math.floor(Math.random() * 80) : (car.brand === 'Porsche' || car.brand === 'BMW' ? 300 + Math.floor(Math.random() * 150) : 120 + Math.floor(Math.random() * 100));
  const torque = Math.round(hp * (isElectric ? 1.6 : 1.3));

  return {
    carId: car.id,
    versionName,
    fullName,
    brand: car.brand,
    model: car.model,
    year: car.year,
    segment: car.bodyStyle || 'Xe cỡ trung',
    origin,
    bodyStyle: `${car.bodyStyle} ${seats} chỗ`,
    seats,
    engineType: isElectric ? 'Động cơ điện đôi (Dual Motor)' : (isHybrid ? 'Xăng lai Điện (Hybrid e-CVT)' : `${car.engine} ${car.engine.includes('Dầu') ? 'Turbo Diesel' : 'DOHC Dual VVT-i'}`),
    transmission: car.transmission || 'Số tự động',
    driveTrain: car.bodyStyle.includes('Bán tải') || car.bodyStyle.includes('SUV') ? 'Dẫn động 4 bánh hoặc cầu sau (AWD / RWD)' : 'Dẫn động cầu trước (FWD)',
    listedPrice,
    heroImage,
    brandLogo,
    colorOptions: [
      { name: 'Trắng Ngọc Trai', hex: '#F0F0F0' },
      { name: 'Đen Sang Trọng', hex: '#1A1A1A' },
      { name: 'Bạc Kim Loại', hex: '#B8B8B8' },
      { name: 'Đỏ Ruby', hex: '#9E1B32' },
      { name: 'Xanh Đậm Cavansite', hex: '#1C2841' }
    ],
    versions: [
      { name: `${car.model} Tiêu Chuẩn (Standard)`, price: Math.round(listedPrice * 0.88) },
      { name: `${car.model} Nâng Cao (Deluxe)`, price: Math.round(listedPrice * 0.94) },
      { name: versionName, price: listedPrice, active: true },
      { name: `${car.model} Cao Cấp (Premium/GT-Line)`, price: Math.round(listedPrice * 1.1) }
    ],
    specGroups: [
      {
        id: 'tong-quan',
        title: 'Tổng quan & Kích thước',
        items: [
          { name: 'Dài x Rộng x Cao (mm)', value: `${length} x ${width} x ${height}`, highlight: true },
          { name: 'Chiều dài cơ sở (mm)', value: `${wheelbase}`, highlight: true },
          { name: 'Khoảng sáng gầm xe (mm)', value: `${groundClearance}`, highlight: true },
          { name: 'Bán kính vòng quay tối thiểu (m)', value: '5.4' },
          { name: 'Số chỗ ngồi', value: `${seats} chỗ`, highlight: true },
          { name: 'Dung tích bình nhiên liệu / Pin', value: isElectric ? 'Pin Lithium-ion 87.7 kWh' : '55 - 65 Lít' },
          { name: 'Dung tích khoang hành lý (Lít)', value: `${seats >= 7 ? '450 - 1.800' : '480'}` }
        ]
      },
      {
        id: 'dong-co',
        title: 'Động cơ & Vận hành',
        items: [
          { name: 'Loại động cơ', value: isElectric ? 'Động cơ điện Dual Electric Motors' : `${car.engine} thông minh thế hệ mới`, highlight: true },
          { name: 'Công suất cực đại', value: `${hp} mã lực`, highlight: true },
          { name: 'Mô-men xoắn cực đại', value: `${torque} Nm`, highlight: true },
          { name: 'Hộp số', value: car.transmission, highlight: true },
          { name: 'Hệ thống dẫn động', value: car.bodyStyle.includes('SUV') ? 'Dẫn động 4 bánh toàn thời gian (AWD)' : 'Dẫn động cầu trước (FWD)' },
          { name: 'Chế độ lái', value: 'Eco, Normal, Sport' },
          { name: 'Mức tiêu thụ nhiên liệu (kết hợp)', value: isElectric ? '21 kWh / 100km' : '6.5 - 7.8 Lít / 100km' }
        ]
      },
      {
        id: 'ngoai-that',
        title: 'Ngoại thất',
        items: [
          { name: 'Đèn chiếu sáng trước', value: 'Full-LED tự động bật/tắt & thích ứng', highlight: true },
          { name: 'Đèn LED ban ngày', value: 'Có' },
          { name: 'Gương chiếu hậu', value: 'Chỉnh/gập điện, sấy gương, tích hợp đèn báo rẽ', highlight: true },
          { name: 'Cốp sau', value: 'Đóng/mở điện thông minh' },
          { name: 'Kích thước mâm xe', value: `${seats >= 7 ? '18 - 20 inch' : '16 - 18 inch'} hợp kim đúc đa chấu` }
        ]
      },
      {
        id: 'noi-that',
        title: 'Nội thất & Tiện nghi',
        items: [
          { name: 'Chất liệu ghế', value: 'Ghế bọc da cao cấp', highlight: true },
          { name: 'Ghế lái', value: 'Chỉnh điện 8 hướng, nhớ vị trí', highlight: true },
          { name: 'Màn hình trung tâm', value: 'Cảm ứng sắc nét 10.25 - 12.3 inch', highlight: true },
          { name: 'Kết nối', value: 'Apple CarPlay & Android Auto không dây', highlight: true },
          { name: 'Hệ thống điều hòa', value: 'Tự động 2 vùng độc lập có cửa gió phía sau' },
          { name: 'Phanh tay điện tử & Auto Hold', value: 'Có trang bị tiêu chuẩn', highlight: true },
          { name: 'Sạc không dây chuẩn Qi', value: 'Có' }
        ]
      },
      {
        id: 'an-toan',
        title: 'An toàn & Hỗ trợ người lái',
        items: [
          { name: 'Số lượng túi khí', value: `${seats >= 7 ? '7 túi khí' : '6 túi khí'} vòng quanh xe`, highlight: true },
          { name: 'Hệ thống phanh ABS, EBD, BA', value: 'Có đầy đủ' },
          { name: 'Cân bằng điện tử (ESP / ESC)', value: 'Có', highlight: true },
          { name: 'Hỗ trợ khởi hành ngang dốc (HAC)', value: 'Có' },
          { name: 'Kiểm soát hành trình thông minh', value: 'Adaptive Cruise Control (ACC)', highlight: true },
          { name: 'Cảnh báo điểm mù & Lệch làn đường', value: 'Có trang bị', highlight: true },
          { name: 'Camera quan sát', value: 'Camera 360 độ hoặc Camera lùi độ nét cao', highlight: true },
          { name: 'Cảm biến va chạm', value: 'Cảm biến cảnh báo trước & sau' }
        ]
      }
    ]
  };
}

export function calculateOnRoadPrice(listedPriceInMillions: number, location: 'HN' | 'HCM' | 'PROVINCE', seats: number, isElectric: boolean = false) {
  const basePriceVND = listedPriceInMillions * 1000000;
  
  // Registration tax: 12% in Hanoi, 10% in HCM & provinces; 0% for pure EV in Vietnam
  const taxRate = isElectric ? 0 : (location === 'HN' ? 0.12 : 0.10);
  const registrationTax = Math.round(basePriceVND * taxRate);

  // License plate fee: 20M in HN & HCM, 1M in provinces
  const licensePlateFee = (location === 'HN' || location === 'HCM') ? 20000000 : 1000000;

  // Inspection fee: 90,000 VND
  const inspectionFee = 90000;

  // Road maintenance fee (1 year for private car under 10 seats): 1,560,000 VND
  const roadMaintenanceFee = 1560000;

  // Mandatory civil liability insurance:
  // Under 6 seats: 480,700 VND; 6-11 seats: 873,400 VND
  const insuranceMandatory = seats >= 6 ? 873400 : 480700;

  // Optional physical damage insurance (~1.4%):
  const physicalInsurance = Math.round(basePriceVND * 0.014);

  const totalWithoutPhysical = basePriceVND + registrationTax + licensePlateFee + inspectionFee + roadMaintenanceFee + insuranceMandatory;
  const totalWithPhysical = totalWithoutPhysical + physicalInsurance;

  return {
    basePriceVND,
    registrationTax,
    taxRate: Math.round(taxRate * 100),
    licensePlateFee,
    inspectionFee,
    roadMaintenanceFee,
    insuranceMandatory,
    physicalInsurance,
    totalWithoutPhysical,
    totalWithPhysical
  };
}
