import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import StateContext from '../context/StateContext';
import DispatchContext from '../context/DispatchContext';
import { db } from '../firebase';
import gravatarUrl from 'gravatar-url';
import { Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import NotFound from '../pages/NotFound';

const ViewSinglePost = () => {
  // Get the post ID from the page URL
  const { id } = useParams();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const history = useHistory();
  // Fetch post by ID when component renders first time
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await db.collection('posts').doc(id).get();
        const post = res.data();

        if (!res.exists) return setNotFound(true);

        if (!res.empty) setPost(post);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    }
    fetchPost();
  }, [id]);

  async function deleteHandler() {
    const areYouSure = window.confirm('Do you really want to delete this post?');

    if (areYouSure) {
      //Send to firebase delete request
      try {
        await db.collection('posts').doc(id).delete();

        //If successfully deleted, render a flash message and redirect to homepage
        appDispatch({
          type: 'ADD_FLASH_MESSAGE',
          payload: 'The post has been deleted successfully',
        });

        history.push('/');
      } catch (err) {
        console.log('There was a problem');
      }
    }
  }

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.userId === post.createdBy;
    }
    return false;
  }
  if (notFound) return <NotFound />;
  if (isLoading) return <Spinner />;

  return (
    <Page title="Single Post">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>

        {/* SHOW EDIT AND DELETE BUTTON ONLY IF THE USER IS THE OWNER OF THE POST  */}
        {isOwner() && (
          <span className="pt-2">
            <Link
              to={`/post/${id}/edit/`}
              data-tip="Edit Post"
              data-for="edit"
              className="text-primary mr-2"
              title="Edit"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" />
            <Link
              onClick={deleteHandler}
              to="#"
              data-tip="Delete Post"
              data-for="delete"
              className="delete-post-button text-danger"
              title="Delete"
            >
              <i className="fas fa-trash"></i>
            </Link>
            <ReactTooltip id="delete" />
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.authorEmail}`}>
          <img
            alt="avatar"
            className="avatar-tiny"
            src={gravatarUrl(post.authorEmail, { size: 200 })}
          />
        </Link>
        Posted by <Link to={`/profile/${post.authorEmail}`}>{post.author}</Link>
      </p>

      <div className="body-content">
        <ReactMarkdown
          allowedTypes={[
            'paragraph',
            'strong',
            'emphasis',
            'text',
            'heading',
            'list',
            'listItem',
          ]}
        >
          {post.body}
        </ReactMarkdown>
      </div>
    </Page>
  );
};

export default ViewSinglePost;
