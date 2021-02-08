import React from 'react';
import Page from '../components/Page';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Page title="Page not found">
      <div className="text-center">
        <h2>Whoops, we cannot find that page</h2>
        <div className="lead text-muted">
          You can always visit the <Link to="/">home page</Link>
        </div>
      </div>
    </Page>
  );
};

export default NotFound;
