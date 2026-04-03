import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FS</span>
              </div>
              <span className="font-bold text-lg">FoodShare</span>
            </div>
            <p className="text-gray-600 text-sm">
              Connecting donors and receivers to reduce food waste and fight hunger.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/donations" className="hover:text-primary-600 transition">
                  Browse Donations
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@foodshare.com">info@foodshare.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>India</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition">
                <span className="text-primary-600 font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition">
                <span className="text-primary-600 font-bold">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition">
                <span className="text-primary-600 font-bold">in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 FoodShare. All rights reserved. Made with <Heart size={16} className="inline text-red-500" />
          </p>
          <div className="flex gap-6 text-sm text-gray-600 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-600 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-600 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
