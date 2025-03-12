import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to Kairos Academy
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Providing exceptional education for the next generation of leaders.
        </p>
        <div className="mt-8">
          <Link
            to="/apply"
            className="btn btn-primary text-lg px-8 py-3"
          >
            Apply Now
          </Link>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Kairos Academy?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary-600 mb-3">Academic Excellence</h3>
            <p className="text-gray-600">Our curriculum is designed to challenge and inspire students to reach their full potential.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary-600 mb-3">Dedicated Faculty</h3>
            <p className="text-gray-600">Our teachers are committed to providing individualized attention and support.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary-600 mb-3">Inclusive Community</h3>
            <p className="text-gray-600">We foster a diverse and welcoming environment where every student feels valued and respected.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
