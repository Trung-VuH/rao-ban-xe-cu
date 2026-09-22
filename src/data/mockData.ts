import { Car } from '../types';

const BRANDS_MODELS: Record<string, string[]> = {
  'Aion': ['Y Plus', 'ES'],
  'Aston Martin': ['DBX', 'Vantage'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X3', 'X5'],
  'BYD': ['Atto 3', 'Dolphin', 'Seal'],
  'Bentley': ['Flying Spur', 'Bentayga'],
  'Dongfeng': ['T5 EVO'],
  'Ford': ['Ranger', 'Everest', 'Territory', 'Explorer'],
  'GAC': ['M8', 'GS8'],
  'Geely': ['Emgrand'],
  'Haima': ['7X', '8S'],
  'Haval': ['H6'],
  'Honda': ['City', 'Civic', 'CR-V', 'HR-V', 'Brio', 'Accord'],
  'Hongqi': ['H9', 'E-HS9'],
  'Hyundai': ['Accent', 'Grand i10', 'Santa Fe', 'Tucson', 'Creta', 'Elantra'],
  'Isuzu': ['D-Max', 'mu-X'],
  'Jaecoo': ['J7'],
  'Jaguar': ['F-PACE', 'XF'],
  'Jeep': ['Wrangler', 'Gladiator'],
  'Kia': ['Morning', 'K3', 'Seltos', 'Sorento', 'Carnival', 'Sonet'],
  'Land Rover': ['Range Rover', 'Defender'],
  'Lexus': ['ES', 'RX', 'NX', 'LX'],
  'Lotus': ['Emira', 'Eletre'],
  'Lynk & Co': ['01', '05', '09'],
  'MG': ['MG5', 'ZS', 'HS', 'RX5'],
  'Maserati': ['Levante', 'Ghibli'],
  'Mazda': ['Mazda 3', 'CX-5', 'Mazda 2', 'CX-8', 'CX-30'],
  'Mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'],
  'Mini': ['Cooper', 'Countryman'],
  'Mitsubishi': ['Xpander', 'Outlander', 'Triton', 'Attrage'],
  'Nissan': ['Almera', 'Navara', 'Kicks', 'Terra'],
  'Omoda': ['C5'],
  'Peugeot': ['2008', '3008', '5008'],
  'Porsche': ['Macan', 'Cayenne', 'Panamera', '911'],
  'Ram': ['1500'],
  'Skoda': ['Karoq', 'Kodiaq'],
  'Subaru': ['Forester', 'Outback'],
  'Suzuki': ['XL7', 'Ertiga', 'Swift', 'Jimny'],
  'Toyota': ['Vios', 'Camry', 'Fortuner', 'Innova', 'Corolla Cross', 'Yaris', 'Raize'],
  'VinFast': ['Fadil', 'VF e34', 'VF 8', 'VF 9', 'VF 5', 'Lux A2.0', 'Lux SA2.0'],
  'Volkswagen': ['Tiguan', 'Teramont', 'Virtus'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S90'],
  'Wuling': ['HongGuang MiniEV']
};

const LOCATIONS = ['Hà Nội', 'TP HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Bình Dương', 'Đồng Nai', 'Nghệ An', 'Thanh Hóa', 'Quảng Ninh'];
const BODY_STYLES = [
  'Xe phổ thông',
  'Xe nhỏ cỡ A',
  'Xe nhỏ hạng B',
  'Xe nhỏ hạng B+/C-',
  'Xe cỡ vừa hạng C',
  'Xe cỡ trung hạng D',
  'Xe cỡ trung hạng E',
  'Bán tải cỡ trung',
  'MPV cỡ nhỏ',
  'MPV cỡ trung',
  'SUV phổ thông cỡ lớn',
  'Xe nhỏ cỡ A+/B-',
  'Xe siêu nhỏ',
  'Xe sang',
  'MPV cỡ lớn',
  'Xe sang cỡ nhỏ',
  'Xe sang cỡ trung',
  'Xe sang cỡ lớn',
  'MPV hạng sang',
  'Xe hiệu suất cao, siêu sang',
  'Bán tải cỡ lớn',
  'Siêu xe/Xe thể thao',
  'Siêu sang cỡ lớn'
];
const ENGINES = ['Xăng', 'Dầu', 'Điện', 'Hybrid'];
const SEATS = [2, 4, 5, 7, 8, 9];
const TRANSMISSIONS = ['Số tự động', 'Số sàn'] as const;
const STATUSES = ['Đang bán', 'Đã bán', 'Hết hạn'] as const;
const CONDITIONS = ['Mới', 'Cũ'] as const;

export const BRAND_IMAGES: Record<string, string> = {
  'Aion': 'https://i1-vnexpress.vnecdn.net/2024/10/16/AionVNEpng-1729053044.png?w=220&h=0&q=100&dpr=1&fit=crop&s=cZCihFltNeoKo2vyKQ2png&t=image',
  'Aston Martin': 'https://i1-vnexpress.vnecdn.net/2021/09/16/astonmartinpng-1631766051.png?w=220&h=0&q=100&dpr=1&fit=crop&s=Q5tYgWM04YnJXXKqE-VXZQ&t=image',
  'Audi': 'https://i1-vnexpress.vnecdn.net/2026/07/03/Audipng-1783049440.png?w=220&h=0&q=100&dpr=1&fit=crop&s=mi1ldWfHHnSMrdnoBBmS4A&t=image',
  'BMW': 'https://i1-vnexpress.vnecdn.net/2026/07/03/BMWpng-1783047850.png?w=220&h=0&q=100&dpr=1&fit=crop&s=zQmQEmcKC8KMeEhUS4LU7A&t=image',
  'BYD': 'https://i1-vnexpress.vnecdn.net/2024/06/17/1png-1718595093.png?w=220&h=0&q=100&dpr=1&fit=crop&s=6LPhOzs1euK-olvMTRv9rQ&t=image',
  'Bentley': 'https://i1-vnexpress.vnecdn.net/2021/09/16/bentleypng-1631766083.png?w=220&h=0&q=100&dpr=1&fit=crop&s=DXEyAowyGQ0SJE1O_fTrYw&t=image',
  'Dongfeng': 'https://i1-vnexpress.vnecdn.net/2025/11/14/logoDONGFENGpng-1763090169.png?w=220&h=0&q=100&dpr=1&fit=crop&s=wfKlATmk7d48R_c3DS348A&t=image',
  'Ford': 'https://i1-vnexpress.vnecdn.net/2024/08/13/FordMotorCompanyLogopng-1723536004.png?w=220&h=0&q=100&dpr=1&fit=crop&s=Ci2GAvEUFT4xC25mX4QNjw&t=image',
  'GAC': 'https://i1-vnexpress.vnecdn.net/2024/08/13/GACLogopng-1723535709.png?w=220&h=0&q=100&dpr=1&fit=crop&s=C5T3fUbudrrA7_LzvPVW6A&t=image',
  'Geely': 'https://i1-vnexpress.vnecdn.net/2025/03/23/Geelylogo2png-1742704825.png?w=220&h=0&q=100&dpr=1&fit=crop&s=1jisx2jdbf646IiKGENa2w&t=image',
  'Haima': 'https://i1-vnexpress.vnecdn.net/2023/12/18/HaimaLogojpg-1702860926.jpg?w=220&h=0&q=100&dpr=1&fit=crop&s=XKlgv6gq3AtmyEruNOfbiA&t=image',
  'Haval': 'https://i1-vnexpress.vnecdn.net/2023/08/01/havallogopng-1690876449.png?w=220&h=0&q=100&dpr=1&fit=crop&s=k3sp23f_t760F8WYuGp3ug&t=image',
  'Honda': 'https://i1-vnexpress.vnecdn.net/2024/11/18/hondahlogo21removebgpreviewpng-1731913812.png?w=220&h=0&q=100&dpr=1&fit=crop&s=tNov3vr4JDY8wUtLlwLw6g&t=image',
  'Hongqi': 'https://i1-vnexpress.vnecdn.net/2022/11/23/logoHongqipng-1669190735.png?w=220&h=0&q=100&dpr=1&fit=crop&s=qh0_KcABCHMKU4SKyO72Jw&t=image',
  'Hyundai': 'https://i1-vnexpress.vnecdn.net/2026/07/03/HyundaiLogo1990png-1783047775.png?w=220&h=0&q=100&dpr=1&fit=crop&s=PxEMIblOnvXtdfdhFXA-0g&t=image',
  'Isuzu': 'https://i1-vnexpress.vnecdn.net/2021/09/16/isuzupng-1631766189.png?w=220&h=0&q=100&dpr=1&fit=crop&s=wgAXNSnMQfpJ1Mo9roen5Q&t=image',
  'Jaecoo': 'https://i1-vnexpress.vnecdn.net/2025/01/30/Jaecoologo1png-1738230264.png?w=220&h=0&q=100&dpr=1&fit=crop&s=AuVQJlcWElOxxXppCJjQFQ&t=image',
  'Jaguar': 'https://i1-vnexpress.vnecdn.net/2021/09/21/jaguarpng-1632197730.png?w=220&h=0&q=100&dpr=1&fit=crop&s=SlXKqnmk9F8uXA4yePX_Xg&t=image',
  'Jeep': 'https://i1-vnexpress.vnecdn.net/2021/09/16/jeeppng-1631766209.png?w=220&h=0&q=100&dpr=1&fit=crop&s=IMbiqG6AXaWom-EtPxbx-g&t=image',
  'Kia': 'https://i1-vnexpress.vnecdn.net/2021/09/16/kiapng-1631766219.png?w=220&h=0&q=100&dpr=1&fit=crop&s=LSFT8Vu2HMmmBuRFSYPJ3A&t=image',
  'Land Rover': 'https://i1-vnexpress.vnecdn.net/2021/09/16/landroverpng-1631766242.png?w=220&h=0&q=100&dpr=1&fit=crop&s=8B3LjLd7D7_VkxJrEmb8QQ&t=image',
  'Lexus': 'https://i1-vnexpress.vnecdn.net/2021/09/16/lexuspng-1631766252.png?w=220&h=0&q=100&dpr=1&fit=crop&s=u3rN-9HnxLBqwtIwXOgSmw&t=image',
  'Lotus': 'https://i1-vnexpress.vnecdn.net/2026/07/03/LotusCarsLogookpng-1783047477.png?w=220&h=0&q=100&dpr=1&fit=crop&s=vLyRJciwnen4p83Asm4aUw&t=image',
  'Lynk & Co': 'https://i1-vnexpress.vnecdn.net/2023/12/18/LynkCo2016logopng-1702866122.png?w=220&h=0&q=100&dpr=1&fit=crop&s=LP5k6CeykMrcOdtFY9iQBg&t=image',
  'MG': 'https://i1-vnexpress.vnecdn.net/2024/08/13/MGlogopng-1723536137.png?w=220&h=0&q=100&dpr=1&fit=crop&s=mWf9mcH81acf8rvHvCnU6g&t=image',
  'Maserati': 'https://i1-vnexpress.vnecdn.net/2021/09/16/maseratipng-1631766267.png?w=220&h=0&q=100&dpr=1&fit=crop&s=8w3EPTvROJ946i5j9WNOLw&t=image',
  'Mazda': 'https://i1-vnexpress.vnecdn.net/2026/07/03/Mazdaokpng-1783048740.png?w=220&h=0&q=100&dpr=1&fit=crop&s=87SlhqpK9xwjO3ADbUoisw&t=image',
  'Mercedes': 'https://i1-vnexpress.vnecdn.net/2021/09/23/mercedesLOpng-1632396480.png?w=220&h=0&q=100&dpr=1&fit=crop&s=AYfSIl0RcA23iGskGQdm9w&t=image',
  'Mini': 'https://i1-vnexpress.vnecdn.net/2021/09/16/minipng-1631766315.png?w=220&h=0&q=100&dpr=1&fit=crop&s=haD2QRUjhDREZQg7D55ggw&t=image',
  'Mitsubishi': 'https://i1-vnexpress.vnecdn.net/2021/09/16/mitsubishipng-1631766326.png?w=220&h=0&q=100&dpr=1&fit=crop&s=Kik4vxMLvPTda0noG4flzw&t=image',
  'Nissan': 'https://i1-vnexpress.vnecdn.net/2026/07/03/Nissanpng-1783048557.png?w=220&h=0&q=100&dpr=1&fit=crop&s=_BivQ0T6GgkpDL7JoRh_rQ&t=image',
  'Omoda': 'https://i1-vnexpress.vnecdn.net/2024/11/26/Omodalogopng-1732628544.png?w=220&h=0&q=100&dpr=1&fit=crop&s=bUiE4Ry9W-gcwJUWyebbtg&t=image',
  'Peugeot': 'https://i1-vnexpress.vnecdn.net/2024/08/13/pngtransparentpeugeotnewlogothumbnailpng-1723536539.png?w=220&h=0&q=100&dpr=1&fit=crop&s=yhjUKboTN1IWSGdQnNWAMQ&t=image',
  'Porsche': 'https://i1-vnexpress.vnecdn.net/2026/07/03/Porschelogopng-1783048097.png?w=220&h=0&q=100&dpr=1&fit=crop&s=5yCJ8yzdPeQO0qIRhWLePg&t=image',
  'Ram': 'https://i1-vnexpress.vnecdn.net/2021/09/16/rampng-1631766523.png?w=220&h=0&q=100&dpr=1&fit=crop&s=dgXxT0OWjnuZ3SjS5Jj0pg&t=image',
  'Skoda': 'https://i1-vnexpress.vnecdn.net/2023/09/23/kodasvgpng-1695477041.png?w=220&h=0&q=100&dpr=1&fit=crop&s=ovgmKvtDLvENMv5yHIBrxg&t=image',
  'Subaru': 'https://i1-vnexpress.vnecdn.net/2021/09/16/subarupng-1631766556.png?w=220&h=0&q=100&dpr=1&fit=crop&s=kdsoJ23LeL_zRiXbsOQ7cA&t=image',
  'Suzuki': 'https://i1-vnexpress.vnecdn.net/2021/09/16/suzukipng-1631766569.png?w=220&h=0&q=100&dpr=1&fit=crop&s=HLlXhFsQVc54lPArztwRPQ&t=image',
  'Toyota': 'https://i1-vnexpress.vnecdn.net/2021/09/16/toyotapng-1631771829.png?w=220&h=0&q=100&dpr=1&fit=crop&s=YIngJRm1hdzkzbjGKC_Wjg&t=image',
  'VinFast': 'https://i1-vnexpress.vnecdn.net/2024/08/13/logovinfast3png-1723536411.png?w=220&h=0&q=100&dpr=1&fit=crop&s=njuJ9NLhzMme7Ebt46comg&t=image',
  'Volkswagen': 'https://i1-vnexpress.vnecdn.net/2022/03/02/VWnbdLogosdarkbluesocialmedia800pxjpg-1646187462.jpg?w=220&h=0&q=100&dpr=1&fit=crop&s=8-ps8s6fphRfai6EGhIJ1A&t=image',
  'Volvo': 'https://i1-vnexpress.vnecdn.net/2021/09/28/VolvoIronManpng-1632796475.png?w=220&h=0&q=100&dpr=1&fit=crop&s=w4pt2FtpdbTCq3kOiy3fLg&t=image',
  'Wuling': 'https://i1-vnexpress.vnecdn.net/2023/06/28/Wulinglogosvgpng-1687970080.png?w=220&h=0&q=100&dpr=1&fit=crop&s=L59X88uA8ENE1ZgmvyvSHA&t=image'
};

export const BODY_STYLE_IMAGES: Record<string, string> = {
  'Sedan': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
  'SUV': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
  'Crossover': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
  'Hatchback': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=400',
  'MPV': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400',
  'Bán tải': 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=400'
};

export const MODEL_IMAGES: Record<string, string> = {
  'Vios': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400',
  'CR-V': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=400',
  'CX-5': 'https://images.unsplash.com/photo-1592314532289-e1378ee093f1?auto=format&fit=crop&q=80&w=400',
  'Ranger': 'https://images.unsplash.com/photo-1551830116-d9804359d5b4?auto=format&fit=crop&q=80&w=400',
  'Accent': 'https://images.unsplash.com/photo-1650394747752-9b2f6b8df814?auto=format&fit=crop&q=80&w=400',
  'Fadil': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=400',
  'Xpander': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400',
  'Seltos': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
  'Camry': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
  'City': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400',
  'Mazda 3': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=400',
  'Santa Fe': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
  'Morning': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=400',
  'Everest': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
  'VF 8': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
  'Fortuner': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
  'K3': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
  'Outlander': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
  'Grand i10': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=400',
  'Civic': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
};

const CAR_PHOTOS = [
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1592314532289-e1378ee093f1?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1551830116-d9804359d5b4?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1650394747752-9b2f6b8df814?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1503371471018-706f9d3b841a?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1489824904114-8c150240c28ea?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600',
];

export const getModelImage = (model: string) => {
  if (MODEL_IMAGES[model]) return MODEL_IMAGES[model];
  let hash = 0;
  for (let i = 0; i < model.length; i++) {
    hash = model.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CAR_PHOTOS.length;
  return CAR_PHOTOS[index];
};

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMockCars(count: number): Car[] {
  const cars: Car[] = [];
  const brands = Object.keys(BRANDS_MODELS);

  for (let i = 1; i <= count; i++) {
    let brand = randomElement(brands);
    let model = randomElement(BRANDS_MODELS[brand]);
    let year = randomInt(2010, 2024);
    let condition = randomElement(CONDITIONS);
    
    // Price in millions VND (e.g., 300 = 300,000,000 VND)
    let basePrice = randomInt(300, 3000);
    if (brand === 'Mercedes' || brand === 'BMW' || brand === 'Audi' || brand === 'Porsche' || brand === 'Lexus' || brand === 'Land Rover' || brand === 'Maserati' || brand === 'Aston Martin' || brand === 'Bentley' || brand === 'Jaguar') {
      basePrice = randomInt(2000, 15000);
    }
    
    if (i === 402) {
      brand = 'Ford';
      model = 'Everest';
      year = 2026;
      condition = 'Mới';
      basePrice = 1245;
    }

    const isElectric = brand === 'VinFast' && model.startsWith('VF');
    const engine = (i === 402) ? 'Dầu' : (isElectric ? 'Điện' : randomElement(ENGINES.filter(e => e !== 'Điện')));
    
    const bodyStyle = (i === 402) ? 'SUV' : randomElement(BODY_STYLES);
    const seatCount = (i === 402) ? 7 : randomElement(SEATS);
    
    const car: Car = {
      id: `car-${i}`,
      title: i === 402 ? 'Bán xe Ford Everest 2026 Active 2.0 AT 4x2 mới' : `Bán xe ${brand} ${model} ${year} ${condition === 'Mới' ? 'mới' : 'cũ'}`,
      brand,
      model,
      year,
      condition,
      price: basePrice, // Store in millions for simplicity
      location: randomElement(LOCATIONS),
      bodyStyle,
      engine,
      seats: seatCount,
      mileage: condition === 'Mới' ? 0 : randomInt(10000, 150000),
      transmission: randomElement(TRANSMISSIONS),
      description: `Xe ${brand} ${model} sản xuất năm ${year}. Tình trạng xe: ${condition}. Xe trang bị động cơ ${engine}, ${seatCount} chỗ ngồi. Màu sơn nguyên bản, nội thất sạch sẽ, bảo dưỡng định kỳ tại hãng. Giấy tờ pháp lý rõ ràng, sang tên nhanh gọn. Liên hệ ngay để xem xe và thương lượng giá tốt nhất.`,
      seller: {
        name: `Người bán ${i}`,
        phone: `09${randomInt(10000000, 99999999)}`,
        address: `${randomInt(1, 999)} Đường ABC, ${randomElement(LOCATIONS)}`
      },
      status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Đã bán' : 'Hết hạn') : 'Đang bán',
      images: [
        getModelImage(model),
        `https://picsum.photos/seed/car${i}_2/600/400`,
        `https://picsum.photos/seed/car${i}_3/600/400`,
        `https://picsum.photos/seed/car${i}_4/600/400`
      ],
      tags: [brand, model, condition, `${year}`, engine],
      datePosted: new Date(Date.now() - randomInt(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
    };
    cars.push(car);
  }
  return cars;
}

export const mockCars = generateMockCars(500);

export const getBrands = () => Object.keys(BRANDS_MODELS);
export const getModelsByBrand = (brand: string) => BRANDS_MODELS[brand] || [];
export const getLocations = () => LOCATIONS;
export const getBodyStyles = () => BODY_STYLES;
