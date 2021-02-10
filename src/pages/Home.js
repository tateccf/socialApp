import React, { useContext } from 'react';
import Page from '../components/Page';
import StateContext from '../context/StateContext';

const Home = () => {
  const appState = useContext(StateContext);
  return (
    <Page title="Your feed">
      <h2 className="text-center">
        Hello <strong>{appState.user.username}</strong>!
      </h2>
      <p className="lead text-muted text-center">
        Here you can find the latest posts in our network!
      </p>
      {}
    </Page>
  );
};

export default Home;
