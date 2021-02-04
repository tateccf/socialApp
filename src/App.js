import React from 'react';

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
