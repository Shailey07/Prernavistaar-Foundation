import React from 'react';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaUtensils, FaUsers, FaBullseye } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-poppins"
          >
            About PrernaVistaar Foundation
          </motion.h1>

          <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
            PrernaVistaar Foundation is a non-profit organization dedicated to
            empowering youth, ensuring food security, and building environmental
            sustainability. Since 2007, we've been working with communities across
            India to create lasting change.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <FaBullseye className="text-accent text-5xl mb-5" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-8">
              To empower youth with skills and opportunities, ensure no family
              goes hungry, and protect our environment through sustainable,
              community-driven programs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <FaHandsHelping className="text-accent text-5xl mb-5" />
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-8">
              A society where every individual has access to opportunity,
              nutrition, and a healthy environment — empowering communities to
              thrive independently.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">What We Do</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">
              <FaUtensils className="text-5xl text-accent mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">Food Security</h3>
              <p className="text-gray-600">
                Regular distribution of nutritious meals to underprivileged
                families and community kitchens.
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">
              <FaUsers className="text-5xl text-accent mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">Youth Empowerment</h3>
              <p className="text-gray-600">
                Skill development, mentorship, and opportunities for young people
                to become changemakers.
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">
              <FaHandsHelping className="text-5xl text-accent mx-auto mb-5" />
              <h3 className="font-bold text-xl mb-3">Environmental Sustainability</h3>
              <p className="text-gray-600">
                Tree planting, waste management, and environmental education
                programs across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <h2 className="text-5xl font-bold text-primary">18+</h2>
              <p className="mt-3 text-gray-600">Years of Service</p>
            </div>
            <div>
              <h2 className="text-5xl font-bold text-primary">500+</h2>
              <p className="mt-3 text-gray-600">Volunteers</p>
            </div>
            <div>
              <h2 className="text-5xl font-bold text-primary">10K+</h2>
              <p className="mt-3 text-gray-600">Lives Impacted</p>
            </div>
            <div>
              <h2 className="text-5xl font-bold text-primary">100%</h2>
              <p className="mt-3 text-gray-600">Community Driven</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;