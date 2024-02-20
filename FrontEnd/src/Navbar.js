// src/components/Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-cyan-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white  text-4xl ">منصة المحترفين</div>
        <div className="hidden md:flex space-x-4 "> {/* Hide on small screens, show on medium and larger */}
          <a href="#" className="text-white ml-6 ">الرئيسية</a>
          <a href="#" className="text-white">عن المنصة</a>
          <a href="#" className="text-white ">تواصل معنا</a>
        </div>
        <div className="md:hidden flex items-center"> {/* Show on small screens, hide on medium and larger */}
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyan-700 p-4">
          <a href="#" className="block text-white py-2">الرئيسية</a>
          <a href="#" className="block text-white py-2">عن المنصة</a>
          <a href="#" className="block text-white py-2">تواصل معنا</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
