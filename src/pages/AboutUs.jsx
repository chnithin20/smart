import React from 'react';
import { Target, Users, Award, TrendingUp, User } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About Smart Parking</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Revolutionizing urban parking with smart technology and seamless user experience
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Target size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To make parking effortless and accessible for everyone by leveraging cutting-edge technology
              and providing a seamless booking experience that saves time and reduces stress.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To become the leading smart parking solution globally, transforming how people find,
              book, and pay for parking spaces while contributing to smarter, more sustainable cities.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatCard value="50K+" label="Active Users" />
          <StatCard value="200+" label="Parking Locations" />
          <StatCard value="1M+" label="Bookings Completed" />
          <StatCard value="4.8★" label="User Rating" />
        </div>

        {/* Story */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              Founded in 2020, Smart Parking was born from a simple frustration: finding parking in busy
              urban areas was time-consuming, stressful, and inefficient. Our founders, a team of tech
              enthusiasts and urban planners, envisioned a better way.
            </p>
            <p>
              We started with a single parking facility and a bold idea – to digitize the entire parking
              experience. Today, we've grown to serve thousands of users across multiple cities, offering
              real-time availability, instant booking, and seamless payment processing.
            </p>
            <p>
              Our platform combines IoT sensors, AI-powered analytics, and user-friendly design to create
              a parking experience that's not just convenient, but delightful. We're constantly innovating,
              adding new features, and expanding to new locations.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={Users}
              title="Customer First"
              description="Every decision we make is centered around providing the best experience for our users."
            />
            <ValueCard
              icon={Award}
              title="Innovation"
              description="We continuously push boundaries to bring cutting-edge parking solutions to market."
            />
            <ValueCard
              icon={Target}
              title="Reliability"
              description="Our users trust us with their parking needs, and we deliver consistent, dependable service."
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <TeamMemberCard
              name="GUNDU DHANUSH"
              role="TEAM LEAD"
              gradient="from-blue-600 to-cyan-600"
            />
            <TeamMemberCard
              name="CHALLA NAGASAINITHIN"
              role="UI/UX DESIGNER"
              gradient="from-purple-600 to-pink-600"
            />
            <TeamMemberCard
              name="CHERUKURI MADHU"
              role="API INTEGRATOR"
              gradient="from-green-600 to-emerald-600"
            />
            <TeamMemberCard
              name="UPPATHALA LAXMAN"
              role="MODEL BUILDER"
              gradient="from-orange-600 to-red-600"
            />
          </div>
        </div>

        {/* Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Journey</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and
            customer satisfaction.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label }) => (
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
    <div className="text-3xl font-bold text-blue-400 mb-2">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const TeamMemberCard = ({ name, role, gradient }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
    <div className={`bg-gradient-to-br ${gradient} w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto`}>
      <User size={32} className="text-white" />
    </div>
    <h3 className="text-lg font-bold text-white text-center mb-2">{name}</h3>
    <p className="text-blue-400 text-sm text-center font-semibold">{role}</p>
  </div>
);

export default AboutUs;
