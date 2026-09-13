import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Stories = () => {
  const stories = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Volunteer since 2022",
      location: "Bhilwara, Rajasthan",
      quote: "Being part of Pernnavistaar has been life-changing. I've grown as a person while serving communities.",
      story: "When I first joined as a volunteer, I was shy and unsure. But the team here welcomed me with open arms. Over the past two years, I've led nutrition drives, mentored young girls, and found a purpose I never knew I had.",
      image: "/images/gallery5.jpeg",
    },
    {
      id: 2,
      name: "Sonal Pandey",
      role: "Former Intern",
      location: "Ajmer, Rajasthan",
      quote: "The internship gave me real-world experience and a family that cares deeply about impact.",
      story: "I applied for the internship hoping to build my resume. What I got was so much more — real responsibility, mentorship from senior leaders, and the chance to see how change actually happens on the ground.",
      image: "/images/gallery6.jpeg",
    },
    {
      id: 3,
      name: "Anita Devi",
      role: "Beneficiary",
      location: "Asind, Rajasthan",
      quote: "Their food program helped my family through difficult times. Forever grateful.",
      story: "After my husband's illness, our family struggled to put food on the table. The community kitchen didn't just feed us — they taught me nutrition, helped me start a small business, and gave my children a chance to dream again.",
      image: "/images/gallery7.jpeg",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-poppins"
          >
            Stories of Change
          </motion.h1>

          <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
            Real people. Real impact. Real change happening every day.
          </p>
        </div>
      </section>

      {/* Stories list */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-20">
          {stories.map((s, i) => (
            <motion.div
              key={s.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={s.image}
                  alt={s.name}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x400/0F172A/ffffff?text=${encodeURIComponent(s.name)}`;
                  }}
                />
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-accent font-semibold text-sm mb-2">
                  {s.role}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary font-poppins mb-3">
                  {s.name}
                </h2>
                <p className="text-gray-500 text-sm mb-5">📍 {s.location}</p>

                <p className="text-xl text-gray-700 italic mb-5 leading-relaxed">
                  "{s.quote}"
                </p>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {s.story}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins mb-4">
            Your story could be next
          </h2>
          <p className="text-gray-200 mb-8">
            Join us as a volunteer or intern — and start writing your own chapter.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Join Us
            </Link>
            <Link
              to="/gallery"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition"
            >
              See Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stories;