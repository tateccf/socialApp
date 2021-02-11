import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { db } from '../firebase';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import StateContext from '../context/StateContext';

const Home = () => {
  const appState = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (appState.user.following.length === 0) return;
    setIsLoading(true);
    try {
      async function fetchFeedPosts() {
        appState.user.following.forEach(async user => {
          const feedPosts = [];
          const res = await db
            .collection('posts')
            .where('createdBy', '==', user)
            .get();
          res.forEach(doc => {
            feedPosts.push({ ...doc.data(), id: doc.id });
          });
          setIsLoading(false);
          setFeed(feedPosts);
        });
      }
      fetchFeedPosts();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  function renderFeedPosts() {
    return feed.map(post => (
      <Link
        key={post.id}
        to={`/post/${post.id}`}
        className="list-group-item list-group-item-action"
      >
        <img
          className="avatar-tiny"
          src={gravatarUrl(post.authorEmail, { size: 200 })}
        />{' '}
        <strong>{post.title}</strong>
        <span className="text-muted small"> posted by {post.author}</span>
      </Link>
    ));
  }

  function whatToRender() {
    if (feed.length != 0) {
      return (
        <div className="list-group">
          <>
            <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
            {renderFeedPosts()}
          </>
        </div>
      );
    }

    if (feed.length == 0) {
      return (
        <>
          <h2 className="text-center">
            Hello <strong>{appState.user.username}</strong>, your feed is empty.
          </h2>
          <p className="lead text-muted text-center">
            Your feed displays the latest posts from the people you follow. If you
            don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the
            &ldquo;Search&rdquo; feature in the top menu bar to find content written
            by people with similar interests and then follow them.
          </p>
        </>
      );
    }
    if (isLoading) return <Spinner />;
  }

  console.log(feed.length);
  console.log(isLoading);
  console.log(feed);
  return (
    <Page title="Your feed">
      <>{whatToRender()}</>
    </Page>
  );
};

export default Home;
