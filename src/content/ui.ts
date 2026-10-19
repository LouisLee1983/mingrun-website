import type { Locale } from "@/lib/i18n";

export type UiStrings = {
  langName: string;
  nav: { home: string; products: string; solutions: string; about: string; contact: string };
  hero: { title: string; subtitle: string; ctaProducts: string; ctaQuote: string };
  stats: { label: string; value: string }[];
  sections: {
    products: string;
    productsSub: string;
    why: string;
    whySub: string;
    solutions: string;
    solutionsSub: string;
    cases: string;
    casesSub: string;
    epc: string;
    services: string;
    pre: string;
    during: string;
    after: string;
    about: string;
    culture: string;
    contact: string;
    contactSub: string;
  };
  why: { title: string; text: string }[];
  product: {
    viewDetails: string;
    keySpecs: string;
    principle: string;
    features: string;
    applications: string;
    materials: string;
    paramsTable: string;
    paramsNote: string;
    askQuote: string;
    related: string;
    allProducts: string;
  };
  culture: { philosophy: string; spirit: string; policy: string };
  contact: {
    phone: string;
    afterSales: string;
    email: string;
    address: string;
    formTitle: string;
    name: string;
    company: string;
    country: string;
    contactInfo: string;
    contactInfoHint: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  chat: {
    open: string;
    title: string;
    subtitle: string;
    welcome: string;
    placeholder: string;
    send: string;
    suggestions: string[];
    error: string;
    leadSaved: string;
  };
  footer: { rights: string; quickLinks: string };
  photoPending: string;
  founded: string;
};

const en: UiStrings = {
  langName: "English",
  nav: { home: "Home", products: "Products", solutions: "Solutions", about: "About Us", contact: "Contact" },
  hero: {
    title: "Grinding, Sand Making & Screening Equipment from China",
    subtitle: "Complete production lines for powder grinding, sand making, screening and automatic packing. From process design to installation and training, we deliver turnkey projects worldwide.",
    ctaProducts: "Explore Products",
    ctaQuote: "Get a Free Quote",
  },
  stats: [
    { value: "1–150 t/h", label: "Capacity range" },
    { value: "7", label: "Product series" },
    { value: "EPC", label: "Turnkey projects" },
    { value: "24/7", label: "Technical support" },
  ],
  sections: {
    products: "Our Products",
    productsSub: "Proven machines for powder processing, aggregate production and precise screening.",
    why: "Why Choose Mingrun",
    whySub: "One partner for the whole production line.",
    solutions: "Solutions",
    solutionsSub: "Complete lines designed around your material, capacity and budget.",
    cases: "Project Cases",
    casesSub: "Production lines running across China.",
    epc: "EPC Turnkey Service",
    services: "Service & Support",
    pre: "Before sale",
    during: "During sale",
    after: "After sale",
    about: "About Mingrun",
    culture: "Our Values",
    contact: "Contact Us",
    contactSub: "Tell us your material, capacity and fineness. Our engineers will reply with a solution and quotation.",
  },
  why: [
    { title: "Own R&D and factory", text: "Design and manufacturing under one roof for consistent quality." },
    { title: "Free process design", text: "Site planning, sample analysis and equipment selection at no cost." },
    { title: "Turnkey EPC", text: "Design, procurement, construction, commissioning and training." },
    { title: "Lifetime support", text: "Installation guidance, operator training and technical service." },
  ],
  product: {
    viewDetails: "View details",
    keySpecs: "Key specifications",
    principle: "Working principle",
    features: "Advantages",
    applications: "Applications",
    materials: "Suitable materials",
    paramsTable: "Technical parameters",
    paramsNote: "Parameters are for reference. Contact us to confirm the model that fits your capacity.",
    askQuote: "Request a quote",
    related: "Other products",
    allProducts: "All products",
  },
  culture: { philosophy: "Philosophy", spirit: "Spirit", policy: "Policy" },
  contact: {
    phone: "Sales hotline (WhatsApp / WeChat)",
    afterSales: "After-sales service",
    email: "Email",
    address: "Factory address",
    formTitle: "Send an inquiry",
    name: "Your name",
    company: "Company",
    country: "Country",
    contactInfo: "Phone / WhatsApp / Email",
    contactInfoHint: "So our engineer can reach you",
    message: "Material, capacity (t/h) and required fineness",
    submit: "Send inquiry",
    sending: "Sending…",
    success: "Thank you! Our engineer will contact you shortly.",
    error: "Sending failed. Please call or email us directly.",
  },
  chat: {
    open: "Chat with us",
    title: "Mingrun AI Assistant",
    subtitle: "Online 24/7 · replies in your language",
    welcome: "Hello! I'm Mingrun's AI assistant. Tell me what material you process and the capacity you need, and I'll recommend suitable equipment.",
    placeholder: "Type your question…",
    send: "Send",
    suggestions: ["Which mill for limestone powder?", "Sand making line 100 t/h", "Do you ship to Africa?"],
    error: "Sorry, the assistant is unavailable right now. Please leave your contact on the Contact page.",
    leadSaved: "Your contact details have been sent to our sales engineer.",
  },
  footer: { rights: "All rights reserved.", quickLinks: "Quick links" },
  photoPending: "Photo coming soon",
  founded: "Founded",
};

const zh: UiStrings = {
  langName: "中文",
  nav: { home: "首页", products: "产品中心", solutions: "解决方案", about: "关于我们", contact: "联系我们" },
  hero: {
    title: "磨粉、制砂、筛分设备源头厂家",
    subtitle: "提供磨粉、制砂、筛分和自动包装码垛整线解决方案。从工艺设计到安装培训，为全球客户交付交钥匙工程。",
    ctaProducts: "查看产品",
    ctaQuote: "免费获取方案",
  },
  stats: [
    { value: "1–150 t/h", label: "产能范围" },
    { value: "7", label: "产品系列" },
    { value: "EPC", label: "总包交钥匙" },
    { value: "7×24", label: "技术支持" },
  ],
  sections: {
    products: "产品中心",
    productsSub: "成熟可靠的粉体加工、砂石骨料和精密筛分设备。",
    why: "为什么选择铭润",
    whySub: "整条生产线，一个合作伙伴。",
    solutions: "解决方案",
    solutionsSub: "根据物料、产量和预算量身设计整线方案。",
    cases: "工程案例",
    casesSub: "遍布全国的生产线现场。",
    epc: "EPC 总包服务",
    services: "服务支持",
    pre: "售前",
    during: "售中",
    after: "售后",
    about: "关于铭润",
    culture: "企业文化",
    contact: "联系我们",
    contactSub: "告诉我们您的物料、产量和细度要求，工程师将为您提供方案和报价。",
  },
  why: [
    { title: "自主研发与制造", text: "设计和生产一体化，品质稳定可靠。" },
    { title: "免费工艺设计", text: "免费场地规划、样品分析和设备选型。" },
    { title: "EPC 交钥匙工程", text: "设计、采购、施工、调试、培训一站式完成。" },
    { title: "长期技术支持", text: "安装指导、操作培训和持续技术服务。" },
  ],
  product: {
    viewDetails: "查看详情",
    keySpecs: "主要参数",
    principle: "工作原理",
    features: "性能优势",
    applications: "应用领域",
    materials: "适用物料",
    paramsTable: "技术参数",
    paramsNote: "参数仅供参考，欢迎咨询适合您产量的型号。",
    askQuote: "获取报价",
    related: "其他产品",
    allProducts: "全部产品",
  },
  culture: { philosophy: "企业理念", spirit: "企业精神", policy: "企业方针" },
  contact: {
    phone: "销售热线（微信同号）",
    afterSales: "售后服务",
    email: "邮箱",
    address: "生产基地",
    formTitle: "在线询价",
    name: "您的姓名",
    company: "公司名称",
    country: "国家 / 地区",
    contactInfo: "电话 / 微信 / 邮箱",
    contactInfoHint: "方便工程师联系您",
    message: "物料、产量（吨/小时）和细度要求",
    submit: "提交询价",
    sending: "提交中…",
    success: "提交成功！工程师会尽快与您联系。",
    error: "提交失败，请直接致电或发邮件联系我们。",
  },
  chat: {
    open: "在线咨询",
    title: "铭润 AI 客服",
    subtitle: "7×24 小时在线 · 支持多语种",
    welcome: "您好！我是铭润机械的 AI 客服。请告诉我您要加工的物料和需要的产量，我来为您推荐合适的设备。",
    placeholder: "请输入您的问题…",
    send: "发送",
    suggestions: ["石灰石磨粉用哪款设备？", "100 吨/小时制砂生产线", "可以出口到非洲吗？"],
    error: "抱歉，客服暂时无法连接，请在联系我们页面留下联系方式。",
    leadSaved: "您的联系方式已发送给我们的销售工程师。",
  },
  footer: { rights: "版权所有。", quickLinks: "快速链接" },
  photoPending: "图片即将更新",
  founded: "成立于",
};

const ru: UiStrings = {
  langName: "Русский",
  nav: { home: "Главная", products: "Продукция", solutions: "Решения", about: "О компании", contact: "Контакты" },
  hero: {
    title: "Мельницы, пескоделательные машины и грохоты из Китая",
    subtitle: "Комплектные линии для помола, производства песка, грохочения и автоматической фасовки. От проектирования технологии до монтажа и обучения — проекты «под ключ» по всему миру.",
    ctaProducts: "Смотреть продукцию",
    ctaQuote: "Получить расчёт бесплатно",
  },
  stats: [
    { value: "1–150 т/ч", label: "Производительность" },
    { value: "7", label: "Серий оборудования" },
    { value: "EPC", label: "Проекты «под ключ»" },
    { value: "24/7", label: "Техподдержка" },
  ],
  sections: {
    products: "Наша продукция",
    productsSub: "Надёжное оборудование для помола, производства заполнителей и точного грохочения.",
    why: "Почему Mingrun",
    whySub: "Один партнёр для всей производственной линии.",
    solutions: "Решения",
    solutionsSub: "Комплектные линии под ваш материал, производительность и бюджет.",
    cases: "Реализованные проекты",
    casesSub: "Работающие линии по всему Китаю.",
    epc: "EPC «под ключ»",
    services: "Сервис и поддержка",
    pre: "До продажи",
    during: "При поставке",
    after: "После продажи",
    about: "О компании Mingrun",
    culture: "Наши ценности",
    contact: "Свяжитесь с нами",
    contactSub: "Укажите материал, производительность и требуемую тонкость — наши инженеры подготовят решение и коммерческое предложение.",
  },
  why: [
    { title: "Собственные НИОКР и завод", text: "Проектирование и производство в одних руках — стабильное качество." },
    { title: "Бесплатное проектирование", text: "Планировка площадки, анализ проб и подбор оборудования бесплатно." },
    { title: "EPC «под ключ»", text: "Проектирование, закупки, строительство, пусконаладка и обучение." },
    { title: "Поддержка на весь срок службы", text: "Шеф-монтаж, обучение персонала и техническое сопровождение." },
  ],
  product: {
    viewDetails: "Подробнее",
    keySpecs: "Основные характеристики",
    principle: "Принцип работы",
    features: "Преимущества",
    applications: "Области применения",
    materials: "Перерабатываемые материалы",
    paramsTable: "Технические параметры",
    paramsNote: "Параметры приведены для справки. Свяжитесь с нами для подбора модели под вашу производительность.",
    askQuote: "Запросить цену",
    related: "Другая продукция",
    allProducts: "Вся продукция",
  },
  culture: { philosophy: "Философия", spirit: "Дух компании", policy: "Политика" },
  contact: {
    phone: "Отдел продаж (WhatsApp / WeChat)",
    afterSales: "Сервисная служба",
    email: "Эл. почта",
    address: "Адрес завода",
    formTitle: "Отправить запрос",
    name: "Ваше имя",
    company: "Компания",
    country: "Страна",
    contactInfo: "Телефон / WhatsApp / Email",
    contactInfoHint: "Чтобы инженер мог связаться с вами",
    message: "Материал, производительность (т/ч) и требуемая тонкость",
    submit: "Отправить запрос",
    sending: "Отправка…",
    success: "Спасибо! Наш инженер скоро свяжется с вами.",
    error: "Не удалось отправить. Пожалуйста, позвоните или напишите нам.",
  },
  chat: {
    open: "Онлайн-консультант",
    title: "AI-ассистент Mingrun",
    subtitle: "Онлайн 24/7 · отвечает на вашем языке",
    welcome: "Здравствуйте! Я AI-ассистент Mingrun. Расскажите, какой материал вы перерабатываете и какая нужна производительность, и я подберу оборудование.",
    placeholder: "Введите вопрос…",
    send: "Отправить",
    suggestions: ["Какая мельница для известняка?", "Линия производства песка 100 т/ч", "Доставляете в Казахстан?"],
    error: "Извините, ассистент сейчас недоступен. Оставьте контакты на странице «Контакты».",
    leadSaved: "Ваши контакты переданы нашему инженеру по продажам.",
  },
  footer: { rights: "Все права защищены.", quickLinks: "Быстрые ссылки" },
  photoPending: "Фото скоро появится",
  founded: "Год основания",
};

const ar: UiStrings = {
  langName: "العربية",
  nav: { home: "الرئيسية", products: "المنتجات", solutions: "الحلول", about: "من نحن", contact: "اتصل بنا" },
  hero: {
    title: "معدات الطحن وصناعة الرمل والغربلة من الصين",
    subtitle: "خطوط إنتاج متكاملة لطحن المساحيق وصناعة الرمل والغربلة والتعبئة الآلية. من تصميم العملية إلى التركيب والتدريب، ننفّذ مشاريع تسليم مفتاح حول العالم.",
    ctaProducts: "استكشف المنتجات",
    ctaQuote: "احصل على عرض سعر مجاني",
  },
  stats: [
    { value: "1–150 طن/ساعة", label: "نطاق الطاقة الإنتاجية" },
    { value: "7", label: "سلاسل منتجات" },
    { value: "EPC", label: "مشاريع تسليم مفتاح" },
    { value: "24/7", label: "دعم فني" },
  ],
  sections: {
    products: "منتجاتنا",
    productsSub: "معدات موثوقة لمعالجة المساحيق وإنتاج الركام والغربلة الدقيقة.",
    why: "لماذا مينغرون",
    whySub: "شريك واحد لخط الإنتاج بأكمله.",
    solutions: "الحلول",
    solutionsSub: "خطوط متكاملة مصممة وفق مادتكم وطاقتكم الإنتاجية وميزانيتكم.",
    cases: "مشاريع منفّذة",
    casesSub: "خطوط إنتاج تعمل في أنحاء الصين.",
    epc: "خدمة EPC تسليم مفتاح",
    services: "الخدمة والدعم",
    pre: "قبل البيع",
    during: "أثناء البيع",
    after: "بعد البيع",
    about: "عن مينغرون",
    culture: "قيمنا",
    contact: "اتصل بنا",
    contactSub: "أخبرونا بالمادة والطاقة الإنتاجية والنعومة المطلوبة، وسيرد مهندسونا بحل وعرض سعر.",
  },
  why: [
    { title: "بحث وتطوير ومصنع خاص", text: "التصميم والتصنيع تحت سقف واحد لجودة ثابتة." },
    { title: "تصميم عملية مجاني", text: "تخطيط الموقع وتحليل العينات واختيار المعدات مجاناً." },
    { title: "EPC تسليم مفتاح", text: "التصميم والمشتريات والتنفيذ والتشغيل والتدريب." },
    { title: "دعم طوال عمر المعدات", text: "إرشاد التركيب وتدريب المشغلين والخدمة الفنية." },
  ],
  product: {
    viewDetails: "عرض التفاصيل",
    keySpecs: "المواصفات الرئيسية",
    principle: "مبدأ العمل",
    features: "المزايا",
    applications: "مجالات الاستخدام",
    materials: "المواد المناسبة",
    paramsTable: "المعايير الفنية",
    paramsNote: "المعايير للاسترشاد فقط. تواصلوا معنا لتأكيد الطراز المناسب لطاقتكم.",
    askQuote: "اطلب عرض سعر",
    related: "منتجات أخرى",
    allProducts: "جميع المنتجات",
  },
  culture: { philosophy: "الفلسفة", spirit: "الروح", policy: "السياسة" },
  contact: {
    phone: "خط المبيعات (واتساب / وي تشات)",
    afterSales: "خدمة ما بعد البيع",
    email: "البريد الإلكتروني",
    address: "عنوان المصنع",
    formTitle: "أرسل استفساراً",
    name: "الاسم",
    company: "الشركة",
    country: "الدولة",
    contactInfo: "الهاتف / واتساب / البريد الإلكتروني",
    contactInfoHint: "ليتمكن مهندسنا من التواصل معكم",
    message: "المادة والطاقة الإنتاجية (طن/ساعة) والنعومة المطلوبة",
    submit: "إرسال الاستفسار",
    sending: "جارٍ الإرسال…",
    success: "شكراً لكم! سيتواصل معكم مهندسنا قريباً.",
    error: "تعذّر الإرسال. يرجى الاتصال بنا هاتفياً أو عبر البريد الإلكتروني.",
  },
  chat: {
    open: "تحدث معنا",
    title: "مساعد مينغرون الذكي",
    subtitle: "متصل 24/7 · يرد بلغتك",
    welcome: "مرحباً! أنا المساعد الذكي لشركة مينغرون. أخبرني بالمادة التي تعالجها والطاقة الإنتاجية المطلوبة، وسأوصي بالمعدات المناسبة.",
    placeholder: "اكتب سؤالك…",
    send: "إرسال",
    suggestions: ["أي مطحنة لمسحوق الحجر الجيري؟", "خط صناعة رمل 100 طن/ساعة", "هل تشحنون إلى مصر؟"],
    error: "عذراً، المساعد غير متاح حالياً. يرجى ترك بيانات التواصل في صفحة اتصل بنا.",
    leadSaved: "تم إرسال بيانات التواصل إلى مهندس المبيعات لدينا.",
  },
  footer: { rights: "جميع الحقوق محفوظة.", quickLinks: "روابط سريعة" },
  photoPending: "الصورة قريباً",
  founded: "تأسست عام",
};

const vi: UiStrings = {
  langName: "Tiếng Việt",
  nav: { home: "Trang chủ", products: "Sản phẩm", solutions: "Giải pháp", about: "Về chúng tôi", contact: "Liên hệ" },
  hero: {
    title: "Thiết bị nghiền bột, làm cát và sàng từ Trung Quốc",
    subtitle: "Dây chuyền trọn bộ cho nghiền bột, làm cát, sàng phân loại và đóng bao tự động. Từ thiết kế công nghệ đến lắp đặt và đào tạo, chúng tôi bàn giao dự án chìa khóa trao tay trên toàn thế giới.",
    ctaProducts: "Xem sản phẩm",
    ctaQuote: "Nhận báo giá miễn phí",
  },
  stats: [
    { value: "1–150 t/h", label: "Dải năng suất" },
    { value: "7", label: "Dòng sản phẩm" },
    { value: "EPC", label: "Chìa khóa trao tay" },
    { value: "24/7", label: "Hỗ trợ kỹ thuật" },
  ],
  sections: {
    products: "Sản phẩm",
    productsSub: "Thiết bị đã được kiểm chứng cho chế biến bột, sản xuất cốt liệu và sàng chính xác.",
    why: "Vì sao chọn Mingrun",
    whySub: "Một đối tác cho toàn bộ dây chuyền.",
    solutions: "Giải pháp",
    solutionsSub: "Dây chuyền trọn bộ thiết kế theo vật liệu, năng suất và ngân sách của bạn.",
    cases: "Dự án tiêu biểu",
    casesSub: "Các dây chuyền đang vận hành khắp Trung Quốc.",
    epc: "Dịch vụ tổng thầu EPC",
    services: "Dịch vụ và hỗ trợ",
    pre: "Trước bán hàng",
    during: "Trong bán hàng",
    after: "Sau bán hàng",
    about: "Về Mingrun",
    culture: "Giá trị cốt lõi",
    contact: "Liên hệ với chúng tôi",
    contactSub: "Cho chúng tôi biết vật liệu, năng suất và độ mịn yêu cầu. Kỹ sư sẽ gửi giải pháp và báo giá.",
  },
  why: [
    { title: "Tự nghiên cứu và sản xuất", text: "Thiết kế và chế tạo khép kín, chất lượng ổn định." },
    { title: "Thiết kế công nghệ miễn phí", text: "Quy hoạch mặt bằng, phân tích mẫu và chọn thiết bị miễn phí." },
    { title: "Tổng thầu EPC", text: "Thiết kế, mua sắm, thi công, chạy thử và đào tạo." },
    { title: "Hỗ trợ lâu dài", text: "Hướng dẫn lắp đặt, đào tạo vận hành và dịch vụ kỹ thuật." },
  ],
  product: {
    viewDetails: "Xem chi tiết",
    keySpecs: "Thông số chính",
    principle: "Nguyên lý hoạt động",
    features: "Ưu điểm",
    applications: "Lĩnh vực ứng dụng",
    materials: "Vật liệu phù hợp",
    paramsTable: "Thông số kỹ thuật",
    paramsNote: "Thông số chỉ mang tính tham khảo. Liên hệ để xác nhận model phù hợp năng suất của bạn.",
    askQuote: "Yêu cầu báo giá",
    related: "Sản phẩm khác",
    allProducts: "Tất cả sản phẩm",
  },
  culture: { philosophy: "Triết lý", spirit: "Tinh thần", policy: "Phương châm" },
  contact: {
    phone: "Hotline bán hàng (WhatsApp / WeChat)",
    afterSales: "Dịch vụ hậu mãi",
    email: "Email",
    address: "Địa chỉ nhà máy",
    formTitle: "Gửi yêu cầu",
    name: "Họ tên",
    company: "Công ty",
    country: "Quốc gia",
    contactInfo: "Điện thoại / WhatsApp / Email",
    contactInfoHint: "Để kỹ sư liên hệ với bạn",
    message: "Vật liệu, năng suất (t/h) và độ mịn yêu cầu",
    submit: "Gửi yêu cầu",
    sending: "Đang gửi…",
    success: "Cảm ơn bạn! Kỹ sư của chúng tôi sẽ sớm liên hệ với bạn.",
    error: "Gửi không thành công. Vui lòng gọi điện hoặc gửi email cho chúng tôi.",
  },
  chat: {
    open: "Tư vấn trực tuyến",
    title: "Trợ lý AI Mingrun",
    subtitle: "Trực tuyến 24/7 · trả lời bằng ngôn ngữ của bạn",
    welcome: "Xin chào! Tôi là trợ lý AI của Mingrun. Hãy cho tôi biết vật liệu bạn cần xử lý và năng suất mong muốn, tôi sẽ gợi ý thiết bị phù hợp.",
    placeholder: "Nhập câu hỏi của bạn…",
    send: "Gửi",
    suggestions: ["Máy nghiền nào cho bột đá vôi?", "Dây chuyền làm cát 100 t/h", "Có giao hàng tới Việt Nam không?"],
    error: "Xin lỗi, trợ lý tạm thời không khả dụng. Vui lòng để lại liên hệ ở trang Liên hệ.",
    leadSaved: "Thông tin liên hệ của bạn đã được gửi tới kỹ sư bán hàng.",
  },
  footer: { rights: "Bảo lưu mọi quyền.", quickLinks: "Liên kết nhanh" },
  photoPending: "Ảnh sắp cập nhật",
  founded: "Thành lập năm",
};

export const ui: Record<Locale, UiStrings> = { en, zh, ru, ar, vi };
