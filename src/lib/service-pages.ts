export type ServicePageData = {
  slug: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  intro: { ar: string; en: string };
  benefits: { ar: string[]; en: string[] };
  audience: { ar: string; en: string };
};

export const servicePages: ServicePageData[] = [
  {
    slug: "corporate-websites",
    title: { ar: "تصميم مواقع الشركات", en: "Corporate Website Design" },
    description: { ar: "تصميم مواقع شركات احترافية تعرّف بخدماتك وتعزز حضور علامتك التجارية على الإنترنت.", en: "Professional corporate website design that presents your services and strengthens your brand's online presence." },
    intro: { ar: "نصمم ونطور موقعاً تعريفياً يشرح نشاط شركتك بوضوح، ويعرض خدماتها ومعلوماتها الأساسية، ويساعد العملاء المحتملين على فهم ما تقدمه والتواصل معك.", en: "We design and develop a clear business website that explains what your company does, presents its services and key information, and helps potential customers get in touch." },
    benefits: {
      ar: ["واجهة متناسقة مع هوية شركتك", "صفحات منظمة للخدمات ومن نحن والتواصل", "تصميم متجاوب مع الجوال والأجهزة المختلفة", "أساسيات SEO الفنية ومعلومات الصفحات", "دعوات واضحة لاتخاذ إجراء والتواصل"],
      en: ["A visual interface aligned with your brand", "Well-structured service, about and contact pages", "Responsive layouts for mobile and desktop", "Technical SEO foundations and page metadata", "Clear calls to action that guide visitors"]
    },
    audience: { ar: "للشركات والمؤسسات والمكاتب المهنية ومقدمي الخدمات الذين يحتاجون إلى حضور رقمي واضح وموثوق.", en: "For companies, organizations, professional firms and service providers that need a clear, credible online presence." }
  },
  {
    slug: "ecommerce-websites",
    title: { ar: "تصميم المتاجر الإلكترونية", en: "E-commerce Website Design" },
    description: { ar: "تصميم متجر إلكتروني منظم لعرض المنتجات ومساعدة العملاء على استكشافها وطلبها بسهولة.", en: "E-commerce website design that organizes products and makes it easier for customers to browse and place orders." },
    intro: { ar: "نبني متجراً إلكترونياً يعرض منتجاتك بصورة مرتبة، مع صفحات واضحة للمنتجات والتصنيفات ومعلومات الطلب. نحدد خصائص الدفع والشحن وفق احتياجات نشاطك والخيارات المتاحة في بلدك.", en: "We build an online store that presents your products clearly, with organized product and category pages and useful ordering information. Payment and shipping features are planned around your business and the options available in your market." },
    benefits: {
      ar: ["تنظيم المنتجات ضمن تصنيفات واضحة", "صفحات منتجات تتضمن الصور والتفاصيل", "تجربة تصفح متجاوبة مع الجوال", "مسار طلب واضح وسهل الاستخدام", "تهيئة أساسية لمحركات البحث"],
      en: ["Products organized into clear categories", "Product pages for images and useful details", "Mobile-friendly browsing experience", "A clear and easy-to-follow ordering flow", "Foundational search engine optimization"]
    },
    audience: { ar: "للمتاجر والعلامات التجارية وأصحاب المنتجات الذين يريدون عرض منتجاتهم وبيعها عبر الإنترنت.", en: "For retailers, brands and product businesses looking to showcase and sell online." }
  },
  {
    slug: "landing-pages",
    title: { ar: "تصميم صفحات الهبوط", en: "Landing Page Design" },
    description: { ar: "صفحات هبوط للحملات الإعلانية والعروض، برسالة مركزة وهدف واضح لزيادة فرص التحويل.", en: "Focused landing pages for campaigns and offers, built around a clear message and conversion goal." },
    intro: { ar: "صفحة الهبوط الجيدة تختصر الطريق بين اهتمام الزائر والخطوة التي تريد منه اتخاذها. نرتب الرسالة والعرض والعناصر البصرية والدعوة إلى الإجراء في صفحة واحدة تناسب حملتك.", en: "A good landing page shortens the distance between a visitor's interest and the action you want them to take. We organize the message, offer, visuals and call to action into one page tailored to your campaign." },
    benefits: {
      ar: ["رسالة رئيسية واضحة ومباشرة", "عرض المزايا بطريقة سهلة المسح والقراءة", "دعوة بارزة للتواصل أو التسجيل أو الشراء", "تصميم متجاوب وسريع التصفح", "إمكانية ربط الصفحة بأدوات قياس الأداء"],
      en: ["A clear, focused primary message", "Benefits presented for quick, easy reading", "Prominent calls to contact, sign up or buy", "Responsive design for smooth browsing", "Option to connect analytics and measurement tools"]
    },
    audience: { ar: "للحملات الإعلانية وإطلاق المنتجات والعروض الخاصة وجمع طلبات العملاء المحتملين.", en: "For advertising campaigns, product launches, special offers and lead generation." }
  },
  {
    slug: "real-estate-websites",
    title: { ar: "تصميم مواقع العقارات", en: "Real Estate Website Design" },
    description: { ar: "مواقع عقارية تعرض العقارات وتفاصيلها بطريقة منظمة وتسهّل على المهتمين الاستفسار والتواصل.", en: "Real estate websites that organize property listings and details and make inquiries easier for visitors." },
    intro: { ar: "نصمم موقعاً عقارياً يساعد الزائر على استكشاف العقارات ومقارنة المعلومات الأساسية والوصول إلى فريق المبيعات أو الوسيط. يمكن تنظيم المحتوى بحسب نوع العقار أو الموقع أو خصائصه وفق طبيعة المشروع.", en: "We design a real estate website that helps visitors explore properties, review key details and contact your team or agents. Listings can be organized by property type, location or relevant features to suit your business." },
    benefits: {
      ar: ["عرض منظم للعقارات والوحدات", "صفحات تفصيلية للصور والمواصفات", "تصنيفات وطرق تصفح واضحة", "أزرار استفسار وتواصل مباشرة", "تجربة استخدام مناسبة للجوال"],
      en: ["Organized property and unit listings", "Detailed pages for images and specifications", "Clear categories and browsing paths", "Direct inquiry and contact actions", "A mobile-friendly user experience"]
    },
    audience: { ar: "لشركات التطوير العقاري والمكاتب والوسطاء والمسوقين العقاريين.", en: "For property developers, real estate agencies, brokers and property marketers." }
  },
  {
    slug: "portfolio-websites",
    title: { ar: "تصميم المواقع الشخصية ومعارض الأعمال", en: "Portfolio Website Design" },
    description: { ar: "مواقع شخصية ومعارض أعمال تعرض خبراتك ومشاريعك وتساعد العملاء وأصحاب العمل على التعرف إليك.", en: "Personal and portfolio websites that showcase your expertise and projects to prospective clients and employers." },
    intro: { ar: "نرتب خبراتك ومهاراتك وأعمالك السابقة في موقع شخصي يعكس أسلوبك المهني. نساعد الزائر على فهم ما تقدمه، ومشاهدة نماذج أعمالك، والوصول إليك بسهولة.", en: "We organize your experience, skills and selected projects into a personal website that reflects your professional style. Visitors can understand what you offer, explore your work and contact you easily." },
    benefits: {
      ar: ["نبذة مهنية واضحة عنك", "معرض أعمال منظم وسهل التصفح", "عرض المهارات والخبرات والخدمات", "روابط مباشرة للتواصل وحساباتك المهنية", "تصميم متجاوب يعكس هويتك"],
      en: ["A clear professional introduction", "An organized, easy-to-browse project gallery", "Sections for skills, experience and services", "Direct links to contact and professional profiles", "Responsive design that reflects your identity"]
    },
    audience: { ar: "للمستقلين والمصممين والمطورين والاستشاريين والمبدعين والباحثين عن فرص مهنية.", en: "For freelancers, designers, developers, consultants, creatives and professionals seeking new opportunities." }
  }
];

export function getServicePage(slug: string) {
  return servicePages.find((item) => item.slug === slug);
}
