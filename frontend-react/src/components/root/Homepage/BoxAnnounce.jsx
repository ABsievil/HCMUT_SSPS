import React from 'react';
import { Award, Gift } from 'lucide-react';

// Dữ liệu các tính năng
const featuresData = [
  {
    title: "Sản phẩm Độc Quyền",
    description: "Khám phá các dịch vụ in ấn độc đáo chỉ có tại Student Smart Printing Service (SSPS). Tận hưởng trải nghiệm in ấn chất lượng cao với những tính năng độc quyền dành riêng cho sinh viên, từ các tùy chọn in đa dạng đến những ưu đãi đặc biệt.",
    icon: <Award className="w-6 h-6 text-white" aria-label="Award Icon" />,
    backgroundImage: "src/images/banner-homepage-2.jpeg"
  },
  {
    title: "Ưu Đãi Đặc Biệt",
    description: "Hãy gia nhập cộng đồng SSPS ngay hôm nay để độc quyền nhận các ưu đãi đặc biệt. Với chương trình thành viên, bạn sẽ được hưởng những ưu đãi độc quyền và giảm giá đặc biệt mỗi khi sử dụng dịch vụ in của chúng tôi. Đừng quên đăng ký nhận bản tin để luôn cập nhật thông tin về các chương trình khuyến mãi mới.",
    icon: <Gift className="w-6 h-6 text-white" aria-label="Gift Icon" />,
    backgroundImage: "src/images/banner-homepage-3.jpeg"
  }
];

// Component Badge Icon
const IconBadge = ({ children, className = '' }) => (
  <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// Component Section Heading
const SectionHeading = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
      {icon}
    </div>
    <h2 className="text-xl font-semibold">{title}</h2>
  </div>
);

// Component Feature Card
const FeatureCard = ({ title, description, icon, backgroundImage }) => (
  <div
    className="group relative overflow-hidden hover:shadow-2xl transition-shadow rounded-lg bg-cover bg-center min-h-[300px] p-6 flex flex-col justify-between text-white"
    style={{ backgroundImage: `url('${backgroundImage}')` }}
  >
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />

    <div className="relative z-10 transition-transform transform group-hover:scale-105">
      <h3 className="text-2xl font-bold mb-4 group-hover:text-white text-white">
        {title}
      </h3>
      <p className="text-gray-200 leading-relaxed group-hover:text-gray-100">
        {description}
      </p>
    </div>

    <div className="mt-4 relative z-10">
      <IconBadge>{icon}</IconBadge>
    </div>
  </div>
);

// Component Check Icon
const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="Check Icon">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Component Chính SmartPrintingService
const SmartPrintingService = () => (
  <div className="flex flex-col w-full max-w-7xl mx-auto p-6 space-y-8">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Student Smart Printing Service - Trải nghiệm in ấn thông minh cho sinh viên
      </h1>
    </div>

    <section className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 space-y-4">
        <SectionHeading
          icon={<CheckIcon />}
          title="Chất Lượng Đảm Bảo"
        />
        <p className="text-gray-600 leading-relaxed">
          Mọi lần in đều được đảm bảo về chất lượng tại SPPS. Hệ thống kiểm soát
          chất lượng nghiêm ngặt giúp đảm bảo mọi tài liệu in của bạn đều rõ nét
          và chất lượng. Chúng tôi cam kết mang đến trải nghiệm in ấn tốt nhất cho
          cộng đồng sinh viên.
        </p>
      </div>
      <div className="flex-1">
        <img
          src="src/images/banner-homepage-1.jpeg"
          alt="Printer Quality Assurance"
          className="rounded-lg shadow-lg w-full object-cover"
          loading="lazy"
        />
      </div>
    </section>

    <section className="grid md:grid-cols-2 gap-6 mt-8">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          backgroundImage={feature.backgroundImage}
        />
      ))}
    </section>
  </div>
);

export default SmartPrintingService;
