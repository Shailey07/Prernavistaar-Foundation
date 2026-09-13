import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className="font-poppins font-bold text-xl sm:text-2xl mb-4">
              Pernnavistaar<span className="text-accent">Foundation</span>
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-7">
              Dedicated to empowering youth, ensuring food security, and
              building environmental sustainability across India since 2007.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-poppins font-bold text-lg mb-4">
              Contact Us
            </h4>

            <p className="text-sm sm:text-base text-gray-300 mb-2">
              Asind, Bhilwara, Rajasthan 311301
            </p>

            <p className="text-sm sm:text-base text-gray-300 mb-2">
              Phone: +91 6284097098
            </p>

            <p className="text-sm sm:text-base text-gray-300 break-all">
              Email: prernavistaarfoundation@gmail.com
            </p>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h4 className="font-poppins font-bold text-lg mb-4">
              Follow Us
            </h4>

            <div className="flex justify-center md:justify-start space-x-5">
              <a
                href="#"
                className="text-gray-300 hover:text-accent transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-accent transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-accent transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-accent transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright — NO Admin link */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Pernnavistaar Foundation. All rights
            reserved. | Estd. 2007
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;