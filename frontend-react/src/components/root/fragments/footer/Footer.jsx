import React from "react";

function Footer() {
  const websiteLinks = [
    { name: "HCMUT", url: "https://hcmut.edu.vn/" },
    { name: "MyBK", url: "https://mybk.hcmut.edu.vn/" },
    { name: "BKSI", url: "https://mybk.hcmut.edu.vn/bksi/public/vi/" }
  ];

  const contactInfo = [
    {
      icon: "src/images/address-footer.png",
      alt: "address icon",
      text: "268 Lý Thường Kiệt, P.14, Q.10, TP.HCM"
    },
    {
      icon: "src/images/calling-footer.png",
      alt: "phone icon",
      text: "(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)"
    },
    {
      icon: "src/images/email-footer.png",
      alt: "email icon",
      text: "spss@hcmut.edu.vn"
    }
  ];

  return (
    <footer className="w-full bg-white">
      {/* Main Content Section */}
      <div
        className="relative px-6 md:px-12 lg:px-16 py-12 text-white bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(13, 92, 161, 0.9), rgba(13, 92, 161, 0.9)), url(https://e-learning.hcmut.edu.vn/theme/image.php/boost/theme/1685588876/hcmut2)`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Smart Printing Service Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">
              SMART PRINTING SERVICE
            </h3>
            <img 
              src="src/images/logo-footer.png" 
              alt="logo" 
              className="w-24 h-24 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Website Links Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">WEBSITE</h3>
            <div className="flex flex-col space-y-2">
              {websiteLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-base hover:text-blue-200 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">LIÊN HỆ</h3>
            <div className="flex flex-col space-y-3">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-2 group"
                >
                  <img 
                    src={info.icon} 
                    alt={info.alt} 
                    className="w-5 h-5 mt-1 group-hover:scale-110 transition-transform duration-300" 
                  />
                  <p className="text-base flex-1">
                    {info.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#164399] text-white py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base font-medium">
            &copy; 2007-2024 BK-SPSS. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="text-sm">
              Developed by HCMUT
            </span>
            <div className="h-4 w-px bg-white/30"></div>
            <span className="text-sm">
              Version 1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;