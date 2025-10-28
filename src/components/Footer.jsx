import React from 'react';
import { 
  Car, 
  Users, 
  FileText, 
  Shield, 
  BookOpen, 
  MessageCircle, 
  Users2,
  ArrowRight,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Company Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Car size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">SmartPark AI</h3>
                <p className="text-gray-400">Intelligent Parking Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revolutionizing urban mobility with AI-powered parking management. 
              Seamless booking, real-time monitoring, and smart analytics for modern cities.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://github.com/smartpark-ai" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com/company/smartpark-ai" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <Linkedin size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://twitter.com/smartparkai" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <Twitter size={18} className="text-gray-400 group-hover:text-sky-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-white font-semibold mb-6">Core Features</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <Car size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>Dynamic Pricing</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <Users size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>User Dashboard</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <Shield size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>Admin Panel</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <FileText size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>Reports & Analytics</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <BookOpen size={16} className="text-green-400 group-hover:text-green-300 transition-colors" />
                <span>Documentation</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <MessageCircle size={16} className="text-green-400 group-hover:text-green-300 transition-colors" />
                <span>API Reference</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <Users2 size={16} className="text-green-400 group-hover:text-green-300 transition-colors" />
                <span>Support</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 group">
                <ArrowRight size={16} className="text-green-400 group-hover:text-green-300 transition-colors" />
                <span>Community</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/about" className="hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="/privacy" className="hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-all duration-200 cursor-pointer hover:translate-x-1 inline-block">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 SmartPark AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button type="button" className="hover:text-gray-400 transition-all duration-200 cursor-pointer hover:scale-105">License</button>
              <button type="button" className="hover:text-gray-400 transition-all duration-200 cursor-pointer hover:scale-105">Security</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
