import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Community Programs', 'Volunteer Activities', 'Awareness Drives'];

  const images = [
    { id: 1, src: '/images/gallery1.jpeg', category: 'Community Programs', title: 'Community Outreach', location: 'Asind, Rajasthan', date: 'Jan 2026' },
    { id: 2, src: '/images/gallery2.jpeg', category: 'Volunteer Activities', title: 'Volunteer Meetup', location: 'Bhilwara', date: 'Feb 2026' },
    { id: 3, src: '/images/gallery3.jpeg', category: 'Awareness Drives', title: 'Awareness Campaign', location: 'Asind', date: 'Mar 2026' },
    { id: 4, src: '/images/gallery4.jpeg', category: 'Community Programs', title: 'Food Distribution Drive', location: 'Asind, Rajasthan', date: 'Apr 2026' },
    { id: 5, src: '/images/gallery5.jpeg', category: 'Volunteer Activities', title: 'Team Building', location: 'Bhilwara', date: 'May 2026' },
    { id: 6, src: '/images/gallery6.jpeg', category: 'Community Programs', title: 'Nutrition Program', location: 'Bhilwara', date: 'Jun 2026' },
    { id: 7, src: '/images/gallery7.jpeg', category: 'Awareness Drives', title: 'Environmental Drive', location: 'Asind', date: 'Jul 2026' },
    { id: 8, src: '/images/gallery8.jpeg', category: 'Community Programs', title: 'Youth Skill Workshop', location: 'Bhilwara', date: 'Aug 2026' },
    { id: 9, src: '/images/gallery9.jpeg', category: 'Volunteer Activities', title: 'Volunteer Orientation', location: 'Asind', date: 'Sep 2026' },
    { id: 10, src: '/images/gallery10.jpeg', category: 'Awareness Drives', title: 'Community Gathering', location: 'Bhilwara', date: 'Oct 2026' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter((img) => img.category === filter);

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
            Our Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the moments of joy, hard work, and impact created by our dedicated team and volunteers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === cat
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer group"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">View</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-accent font-bold uppercase tracking-wider">
                    {img.category}
                  </span>
                  <h3 className="text-lg font-bold text-primary mt-1">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                <button
                  className="absolute -top-12 right-0 text-white hover:text-accent p-2 text-3xl z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg text-white">
                  <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-300">
                    <span>📍 {selectedImage.location}</span>
                    <span>📅 {selectedImage.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;