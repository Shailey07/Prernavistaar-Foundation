import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Register = () => {
  const [mode, setMode] = useState('volunteer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const [volunteerData, setVolunteerData] = useState({
    fullName: '', phone: '', email: '', address: '', occupation: '',
    reasonForJoining: '', startDate: '', endDate: '', department: 'General',
  });

  const [internData, setInternData] = useState({
    fullName: '', phone: '', email: '', address: '', college: '', course: '',
    department: 'General', startDate: '', endDate: '', reasonForJoining: '',
  });

  const handleVolunteerChange = (e) =>
    setVolunteerData({ ...volunteerData, [e.target.name]: e.target.value });
  const handleInternChange = (e) =>
    setInternData({ ...internData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const endpoint = mode === 'volunteer' ? 'volunteers' : 'interns';
    const data = mode === 'volunteer' ? volunteerData : internData;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        if (mode === 'volunteer') {
          setVolunteerData({
            fullName: '', phone: '', email: '', address: '', occupation: '',
            reasonForJoining: '', startDate: '', endDate: '', department: 'General',
          });
        } else {
          setInternData({
            fullName: '', phone: '', email: '', address: '', college: '', course: '',
            department: 'General', startDate: '', endDate: '', reasonForJoining: '',
          });
        }
      } else {
        const d = await response.json();
        setError(d.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="py-20 bg-background min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-primary text-white p-8 text-center">
            <h1 className="text-3xl font-bold font-poppins mb-2">
              Join PrernaVistaar Foundation
            </h1>
            <p className="text-gray-300">Register as a Volunteer or Intern</p>
          </div>

          <div className="p-8 md:p-12">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Application Submitted
                </h2>
                <p className="text-gray-600 mb-8">
                  Thank you for applying! Your{' '}
                  {mode === 'volunteer' ? 'volunteer' : 'internship'} application
                  has been received. Our team will review it and get back to you
                  soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  Register Another
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-gray-100 rounded-full p-1">
                    <button
                      type="button"
                      onClick={() => { setMode('volunteer'); setError(''); }}
                      className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
                        mode === 'volunteer' ? 'bg-primary text-white shadow' : 'text-gray-600'
                      }`}
                    >
                      Volunteer
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMode('intern'); setError(''); }}
                      className={`px-6 py-2.5 rounded-full font-semibold text-sm transition ${
                        mode === 'intern' ? 'bg-primary text-white shadow' : 'text-gray-600'
                      }`}
                    >
                      Intern
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={mode === 'volunteer' ? volunteerData.fullName : internData.fullName}
                        onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={mode === 'volunteer' ? volunteerData.phone : internData.phone}
                        onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={mode === 'volunteer' ? volunteerData.email : internData.email}
                        onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      />
                    </div>
                    {mode === 'volunteer' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                        <input
                          type="text"
                          name="occupation"
                          value={volunteerData.occupation}
                          onChange={handleVolunteerChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">College / University</label>
                        <input
                          type="text"
                          name="college"
                          value={internData.college}
                          onChange={handleInternChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                        />
                      </div>
                    )}
                  </div>

                  {mode === 'intern' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course / Stream</label>
                      <input
                        type="text"
                        name="course"
                        value={internData.course}
                        onChange={handleInternChange}
                        required
                        placeholder="e.g. B.Com, B.Tech CSE, BA"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={mode === 'volunteer' ? volunteerData.address : internData.address}
                      onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                      required
                      rows="2"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {mode === 'volunteer' ? 'Volunteering Start Date' : 'Internship Start Date'}
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={mode === 'volunteer' ? volunteerData.startDate : internData.startDate}
                        onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {mode === 'volunteer' ? 'Volunteering End Date' : 'Internship End Date'}
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={mode === 'volunteer' ? volunteerData.endDate : internData.endDate}
                        onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department / Area</label>
                      <select
                        name="department"
                        value={mode === 'volunteer' ? volunteerData.department : internData.department}
                        onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                      >
                        <option value="General">General</option>
                        <option value="Education">Education</option>
                        <option value="Health & Nutrition">Health & Nutrition</option>
                        <option value="Environment">Environment</option>
                        <option value="Community Outreach">Community Outreach</option>
                        <option value="Youth Empowerment">Youth Empowerment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Joining</label>
                    <textarea
                      name="reasonForJoining"
                      value={mode === 'volunteer' ? volunteerData.reasonForJoining : internData.reasonForJoining}
                      onChange={mode === 'volunteer' ? handleVolunteerChange : handleInternChange}
                      required
                      rows="4"
                      placeholder={`Tell us why you want to join as a ${mode}...`}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting
                      ? 'Submitting...'
                      : `Submit ${mode === 'volunteer' ? 'Volunteer' : 'Internship'} Application`}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;