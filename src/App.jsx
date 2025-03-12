import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ApplicationForm from './pages/ApplicationForm';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<ApplicationForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
