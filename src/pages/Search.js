import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DispatchContext from '../context/DispatchContext';
import { db } from '../firebase';
import gravatarUrl from 'gravatar-url';

const Search = () => {
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useState({
    searchTerm: '',
    searchResults: [],
    show: 'neither',
    requestCount: 0,
  });

  function handleInput({ target }) {
    const value = target.value;

    // Set search term in state
    setState(prev => ({ ...prev, searchTerm: value }));
  }

  // When the Search Component renders, we add an event listener for the ESC key
  useEffect(() => {
    document.addEventListener('keyup', searchKeyPressHandler);

    return () => {
      document.removeEventListener('keyup', searchKeyPressHandler);
    };
  }, []);

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState(prev => ({ ...prev, show: 'loading' }));
      // We will perfom the request to the backend 1 second after the user stopped typing
      const delay = setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          requestCount: prevState.requestCount + 1,
        }));
      }, 1000);

      //In every key press, when cancel the timer
      return () => {
        clearTimeout(delay);
      };
    } else {
      setState(prev => ({ ...prev, show: 'neither' }));
    }
  }, [state.searchTerm]);

  useEffect(() => {
    // Dont perfom the request when component renders the first time
    if (state.requestCount === 0) return;

    async function fetchResults() {
      //We fetch all the posts from firestore and save in an array
      const postsArr = [];
      const response = await db.collection('posts').get();
      const posts = await response.forEach(doc =>
        postsArr.push({ ...doc.data(), id: doc.id })
      );

      //Filter posts if the title or body includes search term
      const postsFiltered = postsArr.filter(post => {
        if (
          post.title.trim().includes(state.searchTerm) ||
          post.body.trim().includes(state.searchTerm)
        ) {
          return { ...post, id: post.id };
        }
        setState(prev => ({ ...prev, show: 'results' }));
      });
      // We update state with filtered posts
      setState(prev => ({ ...prev, searchResults: [...postsFiltered] }));
    }

    fetchResults();
  }, [state.requestCount]);

  // If we press ESC, we close the Search Overlay
  function searchKeyPressHandler(e) {
    if (e.key === 'Escape') handleCloseSearch();
  }

  function handleCloseSearch(e) {
    appDispatch({ type: 'CLOSE_SEARCH' });
  }
  function renderResults() {
    return state.searchResults.map(post => {
      return (
        <Link
          onClick={() => {
            appDispatch({ type: 'CLOSE_SEARCH' });
          }}
          to={`/post/${post.id}`}
          className="list-group-item list-group-item-action"
          key={post.body}
        >
          <img
            className="avatar-tiny"
            src={gravatarUrl(post.authorEmail, { size: 200 })}
          />{' '}
          <strong>{post.title}</strong>{' '}
          <span className="text-muted small">posted by {post.author}</span>
        </Link>
      );
    });
  }

  console.log(state.searchResults);

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input
            onChange={handleInput}
            autoFocus
            type="text"
            autoComplete="off"
            id="live-search-field"
            className="live-search-field"
            placeholder="What are you interested in?"
          />
          <span onClick={handleCloseSearch} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div
            className={
              'circle-loader ' +
              (state.show == 'loading' ? 'circle-loader--visible' : '')
            }
          ></div>
          <div
            className={
              'live-search-results ' +
              (state.show == 'results' ? ' live-search-results--visible' : '')
            }
          >
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> ({state.searchResults.length} items
                found)
              </div>

              {renderResults()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
