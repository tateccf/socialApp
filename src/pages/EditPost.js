import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import StateContext from '../context/StateContext';
import DispatchContext from '../context/DispatchContext';
import { db } from '../firebase';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import NotFound from './NotFound';

const EditPost = () => {
  // Get the post ID from the page URL
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  // Send update request to firebase when form is submitted

  const handleSubmit = async e => {
    e.preventDefault();
    // Set loading to true, so we can disable the submit button to prevent multiple requests at the same time

    setIsLoading(true);
    try {
      await db
        .collection('posts')
        .doc(id)
        .update({ ...post, title: post.title, body: post.body });

      // When the post is updated in the DB, redirect to the post page
      history.push(`/post/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Check if the title or body are empty. If yes, set Has Errors to true.
  const handleBlur = e => {
    if (post.title.trim() === '' || post.body.trim() === '') {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };
  // Update post when ONCHANGE input.
  const handleChange = ({ target }) => {
    setHasError(false);
    setPost(prev => {
      return { ...prev, [target.name]: target.value };
    });
  };
  // Fetch post by ID when component renders first time
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await db.collection('posts').doc(id).get();
        if (!res.exists) return setNotFound(true);
        const post = res.data();

        // Check if the user who wants to edit the post is the owner of the post
        if (post.createdBy !== appState.user.userId) {
          //Render a flash message

          appDispatch({
            type: 'ADD_FLASH_MESSAGE',
            payload: 'You do not have permission to edit that post.',
          });
          // Redirect to homepage
          history.push('/');
        }

        setPost(post);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    }
    fetchPost();
  }, [id]);
  if (notFound) return <NotFound />;
  if (isLoading) return <Spinner />;

  return (
    <Page title="Edit Post">
      <Link className="small font-weight-bold" to={`/post/${id}`}>
        {' '}
        &laquo; Back to post
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          {hasError && (
            <div className="alert alert-danger small liveValidateMessage">
              You must provide a title and a message.
            </div>
          )}
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onBlur={handleBlur}
            value={post.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            value={post.body}
            onChange={handleChange}
          ></textarea>
        </div>

        <button disabled={isLoading || hasError} className="btn btn-primary">
          Save Updates
        </button>
      </form>
    </Page>
  );
};

export default EditPost;
