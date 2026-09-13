import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchId, setSearchId] = useState('');
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fallbackAuthorities = [
    { _id: '1', name: 'Bharat Seturiya', designation: 'Founder / Director', description: 'Leading the foundation with a vision for empowered communities.', photoUrl: '/images/authority1.png' },
    { _id: '2', name: 'Mohit Mittal', designation: 'Program Coordinator', description: 'Managing daily operations and volunteer coordination.', photoUrl: '/images/authority2.png' },
    { _id: '3', name: 'Somya Singh', designation: 'Team Member', description: 'Dedicated to community outreach and program support.', photoUrl: '/images/authority3.png' },
    { _id: '4', name: 'Aruna Roy', designation: 'Team Member', description: 'Focused on education and awareness initiatives.', photoUrl: '/images/authority4.png' },
    { _id: '5', name: 'Kirti Pallav', designation: 'Team Member', description: 'Supporting foundation growth and community engagement.', photoUrl: '/images/authority5.png' },
    { _id: '6', name: 'Manav Malhotra', designation: 'Team Member', description: 'Overseeing operations and field activities.', photoUrl: '/images/authority6.png' },
    { _id: '7', name: 'Dr. Vijay Deshmukh', designation: 'Advisor', description: 'Providing strategic guidance on health and nutrition.', photoUrl: '/images/authority7.png' },
    { _id: '8', name: 'Bhavna Mittal', designation: 'Team Member', description: 'Coordinating events and volunteer activities.', photoUrl: '/images/authority8.png' },
    { _id: '9', name: 'Sneha Singh', designation: 'Team Member', description: 'Passionate about youth empowerment and skill development.', photoUrl: '/images/authority9.png' },
  ];

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/authorities`);
        if (response.ok) {
          const data = await response.json();
          setAuthorities(data.length > 0 ? data : fallbackAuthorities);
        } else {
          setAuthorities(fallbackAuthorities);
        }
      } catch (error) {
        console.error('Failed to fetch authorities', error);
        setAuthorities(fallbackAuthorities);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorities();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    navigate(`/verify/${encodeURIComponent(searchId.trim())}`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpeg"
            alt="Pernnavistaar Foundation"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/1920x1080/0F172A/ffffff?text=Pernnavistaar+Foundation';
            }}
          />
          <div className="absolute inset-0 bg-primary/75"></div>
        </div>
        <motion.div
          className="relative z-10 max-w-4xl px-4 sm:px-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 font-poppins leading-tight">
            Empowering Communities Since 2007
          </h1>
          <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 font-inter px-2">
            Join Pernnavistaar Foundation in our mission to empower youth, ensure food security, and build environmental sustainability across India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Link to="/stories" className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition text-sm sm:text-base">
              Read Stories
            </Link>
            <Link to="/register" className="bg-accent text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition transform hover:-translate-y-1 text-sm sm:text-base">
              Become Volunteer / Intern
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Foundation */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 font-poppins">
                About Pernnavistaar Foundation
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Since 2007, Pernnavistaar Foundation has been dedicated to creating lasting change in communities across India through youth empowerment, food security, and environmental sustainability.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-bold text-accent text-lg sm:text-xl">Our Mission</h3>
                  <p className="text-gray-600 text-sm sm:text-base">To empower youth, ensure food security, and protect the environment through sustainable community-driven programs.</p>
                </div>
                <div>
                  <h3 className="font-bold text-accent text-lg sm:text-xl">Our Vision</h3>
                  <p className="text-gray-600 text-sm sm:text-base">A society where every individual has access to opportunity, nutrition, and a healthy environment.</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <img
                src="/images/gallery1.jpeg"
                alt="About Us"
                className="rounded-2xl shadow-2xl w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/0F172A/ffffff?text=About+Us';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Authorities */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-12 font-poppins"
          >
            Our Team
          </motion.h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-cards rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 bg-gray-200"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {authorities.map((auth, index) => (
                <motion.div
                  key={auth._id || index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.08 } }
                  }}
                  className="bg-cards rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <img
                    src={auth.photoUrl}
                    alt={auth.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/128x128/0F172A/ffffff?text=' + encodeURIComponent(auth.name);
                    }}
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{auth.name}</h3>
                  <p className="text-accent font-medium text-sm sm:text-base mb-3">{auth.designation}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{auth.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary font-poppins">Our Impact in Action</h2>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Glimpses of our recent programs and activities.</p>
            </motion.div>
            <Link to="/gallery" className="mt-4 sm:mt-0 text-accent font-semibold hover:underline text-sm sm:text-base">
              View All Gallery &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-cards rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={`/images/gallery${item}.jpeg`}
                    alt={`Event ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x400/0F172A/ffffff?text=Event+Image';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                    {item === 1 ? 'Community Outreach Program' : 'Youth Empowerment Drive'}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {item === 1
                      ? 'Reaching out to communities with food, resources, and support.'
                      : 'Training and mentoring youth for a brighter future.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verify Certificate */}
      <section className="py-12 sm:py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-poppins">
              Verify Certificate
            </h2>
            <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base px-4">
              Enter the Registration Number to verify a certificate issued by Pernnavistaar Foundation.
            </p>

            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto px-4">
              <input
                type="text"
                placeholder="e.g. PVF/V/2026/1463 or PVF/I/2026/1001"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-grow px-4 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="bg-accent px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition text-sm sm:text-base"
              >
                Verify
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;