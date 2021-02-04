import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ==== MY COMPONENTS ====
import Header from './components/Header';
import Footer from './components/Footer';

// ==== MY Pages ====
import HomeGuest from './pages/HomeGuest';
import About from './pages/About';
import Terms from './pages/Terms';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeGuest} />
        <Route path="/about-us" component={About} />
        <Route path="/terms" component={Terms} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
