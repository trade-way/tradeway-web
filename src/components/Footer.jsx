import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-700 px-4 sm:px-8 md:px-16 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-5 space-y-8 md:space-y-0">
        {/* Logo and Description */}
        <div className="w-full md:max-w-xs">
          <img src="/images/FooterLogo.png" alt="Tradeway" className="h-8 md:h-10 mb-3 md:mb-4" />
          <p className="text-white text-sm leading-relaxed">
            Your go-to marketplace for quality products, great deals, and fast delivery!
          </p>
          <div className="flex gap-4 mt-4 md:mt-6">
            <Facebook className="text-white h-5 w-5 cursor-pointer hover:text-gray-200" />
            <Linkedin className="text-white h-5 w-5 cursor-pointer hover:text-gray-200" />
            <Twitter className="text-white h-5 w-5 cursor-pointer hover:text-gray-200" />
            <Instagram className="text-white h-5 w-5 cursor-pointer hover:text-gray-200" />
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:gap-20">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">About</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Features</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Works</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Career</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">HELP</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Customer Support</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Delivery Details</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Terms & Conditions</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">FAQ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Account</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Manage Deliveries</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Orders</a></li>
              <li><a href="#" className="text-white text-xs md:text-sm hover:text-gray-200">Payments</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods & copyright */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-4 md:gap-3 mt-6 md:mt-8">
        <p className="text-white text-xs md:text-sm text-center md:text-left">Tradeway © 2025, All Rights Reserved</p>
        <img src="/images/PaymentMethod.png" alt="Payment Methods" className="h-8 md:h-12" />
      </div>
    </footer>
  );
};

export default Footer;