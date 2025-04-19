import React from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">StyleCloset</h3>
            <p className="text-gray-600 text-sm">
              Your personal wardrobe assistant helping you look your best every day.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Virtual Closet</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Outfit Planner</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Style Tips</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">Trend Reports</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Twitter size={20} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} StyleCloset. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;