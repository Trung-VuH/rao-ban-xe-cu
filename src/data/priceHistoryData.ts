export type TimeRange = '1M' | '3M' | '6M' | '1Y';

export interface PriceDataPoint {
  timeLabel: string;
  avgPrice: number;     // triệu VNĐ
  minPrice: number;     // triệu VNĐ
  maxPrice: number;     // triệu VNĐ
  listingCount: number; // số lượng tin rao
}

export interface ModelPriceHistory {
  brand: string;
  model: string;
  currentAvgPrice: number;
  minMarketPrice: number;
  maxMarketPrice: number;
  priceChangePercent: number; // e.g. -2.5%
  priceChangeValue: number;   // e.g. -35 triệu
  totalListings: number;
  trendText: string;
  recommendation: string;
  data: PriceDataPoint[];
}

// Simple seeded hash to ensure stable numbers for the same model & range
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getModelPriceHistory(
  brand: string, 
  model: string, 
  range: TimeRange, 
  referencePrice?: number
): ModelPriceHistory {
  const seed = hashString(`${brand}-${model}`);
  const base = referencePrice || (500 + (seed % 1500));

  let points: PriceDataPoint[] = [];
  let changePct = 0;

  if (range === '1M') {
    // 4 weeks of the latest month
    const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
    const trendFactor = -0.015; // slightly depreciating or fluctuating
    points = weeks.map((w, idx) => {
      const variation = Math.sin((seed + idx) * 1.5) * 0.008;
      const progress = (idx - 3) * 0.005;
      const avg = Math.round(base * (1 + progress + variation));
      const spread = Math.round(avg * 0.08);
      return {
        timeLabel: w,
        avgPrice: avg,
        minPrice: Math.round(avg - spread),
        maxPrice: Math.round(avg + spread * 1.1),
        listingCount: 45 + (seed % 30) + idx * 3
      };
    });
    changePct = -1.2;
  } else if (range === '3M') {
    // 6 bi-weekly points over 3 months
    const periods = ['T7 (Đầu)', 'T7 (Cuối)', 'T8 (Đầu)', 'T8 (Cuối)', 'T9 (Đầu)', 'Hiện tại'];
    points = periods.map((p, idx) => {
      const progress = (5 - idx) * 0.008;
      const variation = Math.cos((seed + idx) * 1.2) * 0.012;
      const avg = Math.round(base * (1 + progress + variation));
      const spread = Math.round(avg * 0.09);
      return {
        timeLabel: p,
        avgPrice: avg,
        minPrice: Math.round(avg - spread),
        maxPrice: Math.round(avg + spread * 1.15),
        listingCount: 60 + (seed % 40) + idx * 5
      };
    });
    changePct = -2.8;
  } else if (range === '6M') {
    // 6 months (T4 -> T9)
    const months = ['T4/26', 'T5/26', 'T6/26', 'T7/26', 'T8/26', 'T9/26'];
    points = months.map((m, idx) => {
      const progress = (5 - idx) * 0.014;
      const variation = Math.sin((seed + idx) * 1.8) * 0.015;
      const avg = Math.round(base * (1 + progress + variation));
      const spread = Math.round(avg * 0.1);
      return {
        timeLabel: m,
        avgPrice: avg,
        minPrice: Math.round(avg - spread * 1.05),
        maxPrice: Math.round(avg + spread * 1.2),
        listingCount: 80 + (seed % 50) + idx * 8
      };
    });
    changePct = -4.5;
  } else {
    // 1 Year (12 months)
    const months = [
      'T10/25', 'T11/25', 'T12/25', 'T1/26', 'T2/26', 'T3/26',
      'T4/26', 'T5/26', 'T6/26', 'T7/26', 'T8/26', 'T9/26'
    ];
    points = months.map((m, idx) => {
      const progress = (11 - idx) * 0.012; // car depreciation over 1 year ~8-12%
      const seasonalBump = (idx === 2 || idx === 3) ? 0.02 : 0; // Tet holiday surge
      const variation = Math.sin((seed + idx) * 0.9) * 0.01;
      const avg = Math.round(base * (1 + progress + seasonalBump + variation));
      const spread = Math.round(avg * 0.11);
      return {
        timeLabel: m,
        avgPrice: avg,
        minPrice: Math.round(avg - spread * 1.1),
        maxPrice: Math.round(avg + spread * 1.25),
        listingCount: 95 + (seed % 60) + idx * 10
      };
    });
    changePct = -7.8;
  }

  const latestPoint = points[points.length - 1];
  const firstPoint = points[0];
  const currentAvgPrice = latestPoint.avgPrice;
  const priceChangeValue = currentAvgPrice - firstPoint.avgPrice;
  const calculatedChangePct = parseFloat(((priceChangeValue / firstPoint.avgPrice) * 100).toFixed(1));

  const allMins = points.map(p => p.minPrice);
  const allMaxs = points.map(p => p.maxPrice);
  const minMarketPrice = Math.min(...allMins);
  const maxMarketPrice = Math.max(...allMaxs);
  const totalListings = points.reduce((acc, p) => acc + p.listingCount, 0);

  let trendText = 'Giá ổn định';
  let recommendation = 'Mức giá thị trường đang ở giai đoạn hấp dẫn cho người mua thực tế.';

  if (calculatedChangePct < -3) {
    trendText = 'Có xu hướng giảm nhẹ';
    recommendation = 'Nguồn cung xe lướt dồi dào, người mua có nhiều cơ hội thương lượng giá tốt.';
  } else if (calculatedChangePct > 2) {
    trendText = 'Giữ giá tốt & tăng nhẹ';
    recommendation = 'Dòng xe được săn đón nhiều, thanh khoản cao và mức khấu hao thấp trên thị trường xe cũ.';
  } else {
    trendText = 'Thị trường bình ổn';
    recommendation = 'Mặt bằng giá duy trì ổn định, thích hợp để giao dịch mua bán an toàn.';
  }

  return {
    brand,
    model,
    currentAvgPrice,
    minMarketPrice,
    maxMarketPrice,
    priceChangePercent: calculatedChangePct,
    priceChangeValue,
    totalListings,
    trendText,
    recommendation,
    data: points
  };
}
