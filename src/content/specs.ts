import type { Locale } from "@/lib/i18n";

// Model tables transcribed from the original site's parameter images (see gx-site/content/specs-zh.json).
type L = Record<Locale, string>;
type Column = { key: string; label: L; unit?: string | L };
export type SpecTable = { columns: Column[]; rows: Record<string, string | L>[] };

const label = (en: string, zh: string, ru: string, ar: string, vi: string): L => ({ en, zh, ru, ar, vi });

const C = {
  model: label("Model", "型号", "Модель", "الطراز", "Model"),
  power: label("Power", "功率", "Мощность", "القدرة", "Công suất"),
  layers: label("Decks", "筛网层数", "Ярусы сит", "عدد الطبقات", "Số tầng"),
  screenArea: label("Screen area", "筛分面积", "Площадь сита", "مساحة الغربلة", "Diện tích sàng"),
  inclination: label("Inclination", "倾斜角", "Угол наклона", "زاوية الميل", "Góc nghiêng"),
};

export const specTables: Record<string, SpecTable> = {
  "mr-grinding-mill": {
    columns: [
      { key: "model", label: C.model },
      { key: "rollers", label: label("Rollers", "磨辊个数", "Валков", "عدد البكرات", "Số con lăn") },
      { key: "ringDiameter", label: label("Ring diameter", "磨环直径", "Диаметр кольца", "قطر الحلقة", "Đường kính vành"), unit: "mm" },
      { key: "maxFeedSize", label: label("Max. feed size", "最大进料粒径", "Макс. крупность", "أقصى حجم تغذية", "Cỡ nạp tối đa"), unit: "mm" },
      { key: "fineness", label: label("Product fineness", "成品粒度", "Тонкость продукта", "نعومة المنتج", "Độ mịn thành phẩm"), unit: "mm" },
      { key: "capacity", label: label("Capacity", "产量", "Производительность", "الطاقة", "Năng suất"), unit: "t/h" },
      { key: "power", label: label("Total power", "整机功率", "Общая мощность", "القدرة الكلية", "Tổng công suất"), unit: "kW" },
    ],
    rows: [
      ["MR1080", "3", "1080", "≤20", "2–6", "101"],
      ["MR1390", "4", "1390", "≤20", "4–15", "198.5"],
      ["MR1500", "4", "1500", "≤25", "5–18", "264"],
      ["MR1650", "4", "1650", "≤30", "7–20", "314"],
      ["MR1850", "5", "1850", "≤35", "9–25", "400"],
      ["MR2050", "5", "2050", "≤35", "12–30", "537"],
    ].map(([model, rollers, ringDiameter, maxFeedSize, capacity, power]) => ({
      model, rollers, ringDiameter, maxFeedSize, capacity, power,
      fineness: { en: "0.038–0.18 (80–400 mesh)", zh: "0.038–0.18（80–400目）", ru: "0,038–0,18 (80–400 меш)", ar: "0.038–0.18 (80–400 ميش)", vi: "0,038–0,18 (80–400 mesh)" },
    })),
  },
  "sf-sand-making-machine": {
    columns: [
      { key: "model", label: C.model },
      { key: "feedSize", label: label("Feed size", "进料粒度", "Крупность загрузки", "حجم التغذية", "Cỡ nạp liệu"), unit: "mm" },
      { key: "hammerLayers", label: label("Hammer rows", "锤头层数", "Рядов молотков", "صفوف المطارق", "Số tầng búa") },
      { key: "hammers", label: label("Hammers", "锤头个数", "Молотков", "عدد المطارق", "Số búa") },
      { key: "power", label: label("Motor power", "电机功率", "Мощность двигателя", "قدرة المحرك", "Công suất động cơ"), unit: "kW" },
      { key: "fineness", label: label("Product size", "产品细度", "Крупность продукта", "حجم المنتج", "Độ mịn sản phẩm") },
      { key: "throughput", label: label("Throughput", "通过量", "Пропускная способность", "الإنتاجية", "Lưu lượng"), unit: "t/h" },
    ],
    rows: [
      ["SF1250", "90", "30–40"],
      ["SF1750", "200", "70–80"],
      ["SF2000", "280", "130–150"],
    ].map(([model, power, throughput]) => ({
      model, power, throughput, feedSize: "≤120", hammerLayers: "4", hammers: "16",
      fineness: label("~70% at 10–140 mesh", "10–140目占比约70%", "~70% в диапазоне 10–140 меш", "نحو 70% بين 10–140 ميش", "~70% trong khoảng 10–140 mesh"),
    })),
  },
  "automatic-packing-palletizing-line": {
    columns: [
      { key: "model", label: C.model },
      { key: "efficiency", label: label("Palletizing rate", "码垛效率", "Скорость паллетирования", "معدل التكديس", "Tốc độ xếp pallet"), unit: label("bags/h", "包/小时", "мешков/ч", "كيس/ساعة", "bao/giờ") },
      { key: "bagWeight", label: label("Bag weight", "包装重量", "Вес мешка", "وزن الكيس", "Trọng lượng bao"), unit: "kg" },
      { key: "stackHeight", label: label("Stack height", "码垛高度", "Высота штабеля", "ارتفاع الكومة", "Chiều cao chồng"), unit: "mm" },
      { key: "airPressure", label: label("Air pressure", "气源压力", "Давление воздуха", "ضغط الهواء", "Áp suất khí"), unit: "MPa" },
      { key: "power", label: label("Line power", "整线功率", "Мощность линии", "قدرة الخط", "Công suất dây chuyền"), unit: "kW" },
      { key: "materials", label: label("Typical powders", "使用粉体", "Типичные порошки", "المساحيق النموذجية", "Loại bột") },
    ],
    rows: [
      {
        model: "MRMD600", efficiency: "400–600", bagWeight: "5–50", stackHeight: "60–2200", airPressure: "0.5–0.7", power: "20–40",
        materials: label("Calcium carbonate, activated carbon", "碳酸钙、活性炭", "Карбонат кальция, активированный уголь", "كربونات الكالسيوم، الكربون المنشط", "Canxi cacbonat, than hoạt tính"),
      },
      {
        model: "MRMD800", efficiency: "800–1000", bagWeight: "5–50", stackHeight: "60–2200", airPressure: "0.5–0.7", power: "35–80",
        materials: label("Coal powder, barite powder, etc.", "煤粉、重晶石粉等", "Угольная пыль, баритовый порошок и др.", "مسحوق الفحم، مسحوق الباريت وغيرها", "Bột than, bột barit, v.v."),
      },
    ],
  },
  "square-tumbler-screen": {
    columns: [
      { key: "model", label: C.model },
      { key: "screenSize", label: label("Screen size", "筛网尺寸", "Размер сита", "مقاس الغربال", "Kích thước lưới"), unit: "m" },
      { key: "screenArea", label: C.screenArea, unit: "m²" },
      { key: "inclination", label: C.inclination, unit: "°" },
      { key: "layers", label: C.layers },
      { key: "power", label: C.power, unit: "kW" },
      { key: "rotationSpeed", label: label("Gyrations", "回转次数", "Частота качаний", "عدد الدورات", "Số vòng lắc"), unit: label("/min", "次/分", "/мин", "/دقيقة", "/phút") },
      { key: "stroke", label: label("Stroke", "行程距离", "Ход", "الشوط", "Hành trình") },
    ],
    rows: [
      { model: "MRFX1540", screenSize: "1.5×3.5", screenArea: "4.5–9", inclination: "5–8", layers: "1–10", power: "5.5", rotationSpeed: "180–260", stroke: "25–60" },
      { model: "MRFX2040", screenSize: "2.0×4.0", screenArea: "8–9", inclination: "5–8", layers: "1–10", power: "7.5", rotationSpeed: "180–260", stroke: "25–60" },
    ],
  },
  "round-tumbler-screen": {
    columns: [
      { key: "model", label: C.model },
      { key: "diameter", label: label("Diameter", "直径", "Диаметр", "القطر", "Đường kính"), unit: "mm" },
      { key: "screenArea", label: C.screenArea, unit: "m²" },
      { key: "spaceRequired", label: label("Space required", "空间要求", "Требуемая площадь", "المساحة المطلوبة", "Diện tích lắp đặt") },
      { key: "maxLayers", label: label("Max. decks", "最多筛层", "Макс. ярусов", "أقصى عدد طبقات", "Số tầng tối đa") },
      { key: "power", label: C.power, unit: "kW" },
    ],
    rows: [
      ["MRYX1000", "1040", "0.71", "1.2", "1.5"],
      ["MRYX1200", "1250", "1.11", "1.6", "2.2"],
      ["MRYX1600", "1580", "1.83", "2.5", "2.2/4"],
      ["MRYX2000", "1880", "2.62", "4", "2.2/4"],
      ["MRYX2200", "2100", "3.46", "4.84", "3/4"],
      ["MRYX2600", "2650", "5.31", "7", "5.5"],
    ].map(([model, diameter, screenArea, spaceRequired, power]) => ({ model, diameter, screenArea, spaceRequired, power, maxLayers: "5" })),
  },
  "linear-vibrating-screen": {
    columns: [
      { key: "model", label: C.model },
      { key: "size", label: label("Size", "尺寸", "Размер", "المقاس", "Kích thước"), unit: "mm" },
      { key: "particleSize", label: label("Particle size", "粒度", "Крупность", "حجم الجسيمات", "Cỡ hạt"), unit: "mm" },
      { key: "vibrationFrequency", label: label("Vibrations", "振次", "Частота колебаний", "عدد الاهتزازات", "Tần số rung") },
      { key: "inclination", label: C.inclination, unit: "°" },
      { key: "amplitude", label: label("Amplitude", "振幅", "Амплитуда", "السعة", "Biên độ") },
      { key: "layers", label: C.layers },
      { key: "power", label: label("Motors × power", "电机×功率", "Двигатели × мощность", "المحركات × القدرة", "Động cơ × công suất"), unit: "kW" },
    ],
    rows: [
      ["MRZX520", "500×2000", "0.074–20", "2 × 0.37–0.75"],
      ["MRZX525", "500×2500", "0.074–20", "2 × 0.37–0.75"],
      ["MRZX530", "500×3000", "0.074–20", "2 × 0.37–0.75"],
      ["MRZX1020", "1000×2000", "0.074–40", "2 × 0.37–1.1"],
      ["MRZX1025", "1000×2500", "0.074–40", "2 × 0.37–1.1"],
      ["MRZX1030", "1000×3000", "0.074–40", "2 × 0.37–1.1"],
      ["MRZX1225", "1000×2500", "0.074–40", "2 × 0.37–1.5"],
    ].map(([model, size, particleSize, power]) => ({
      model, size, particleSize, power, vibrationFrequency: "960", inclination: "1–7", amplitude: "1–4.5", layers: "1–6",
    })),
  },
};

export const cell = (v: string | L, locale: Locale) => (typeof v === "string" ? v : v[locale]);
