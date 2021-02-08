import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ==== CONTEXTS ====
import StateContext from './context/StateContext';
import DispatchContext from './context/DispatchContext';

// ==== REDUCERS ====

import { appReducer, initialState } from './reducers/appReducer';

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
import Profile from './pages/Profile';
import EditPost from './pages/EditPost';

const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (appState.loggedIn) {
      localStorage.setItem('socialappUserId', appState.user.userId);
      localStorage.setItem('socialappEmail', appState.user.userEmail);
      localStorage.setItem('socialappUsername', appState.user.username);
    }
  }, [
    appState.loggedIn,
    appState.user.userId,
    appState.user.userEmail,
    appState.user.username,
  ]);

  return (
    <StateContext.Provider value={appState}>
      <DispatchContext.Provider value={appDispatch}>
        <Router>
          <FlashMessage messages={appState.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {appState.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/about-us" exact>
              <About />
            </Route>
            <Route path="/terms" exact>
              <Terms />
            </Route>
            <Route path="/new-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id" exact>
              <ViewSinglePost />
            </Route>
            <Route path="/post/:id/edit" exact>
              <EditPost />
            </Route>
            <Route path="/profile/:userEmail">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
