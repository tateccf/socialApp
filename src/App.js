import React from 'react';
import { BrosweRouter as Router, Switch, Route } from 'react-router-dom';

// ==== MY COMPONENTS ====
import Header from './components/Header';
import Footer from './components/Footer';

// ==== MY Pages ====
import HomeGuest from './pages/HomeGuest';

const App = () => {
  return (
    <>
      <Header />
      <HomeGuest />
      <Footer />
    </>
  );
};

export default App;
