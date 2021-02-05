import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ==== MY COMPONENTS ====
import Header from './components/Header';
import Footer from './components/Footer';
import FlashMessage from './components/FlashMessage';

// ==== MY Pages ====
import HomeGuest from './pages/HomeGuest';
import About from './pages/About';
import Terms from './pages/Terms';
import Home from './pages/Home';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './pages/ViewSinglePost';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('socialappToken'))
  );

  const [flashMessages, setFlashMessage] = useState([]);

  //Every time we pass a new message, the component will rerender for 5 seconds with the new message
  function addFlashMessage(msg) {
    setFlashMessage(prev => [...prev, msg]);
  }

  return (
    <Router>
      <FlashMessage messages={flashMessages} />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/about-us" exact>
          <About />
        </Route>
        <Route path="/terms" exact>
          <Terms />
        </Route>
        <Route path="/new-post">
          <CreatePost addFlashMessage={addFlashMessage} />
        </Route>
        <Route path="/post/:id">
          <ViewSinglePost />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
