import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import StateContext from '../context/StateContext';
import { db } from '../firebase';
import gravatarUrl from 'gravatar-url';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import NotFound from '../pages/NotFound';

const ViewSinglePost = () => {
  // Get the post ID from the page URL
  const { id } = useParams();
  const appState = useContext(StateContext);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
  if (notFound) return <NotFound />;
  if (isLoading) return <Spinner />;

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.userId === post.createdBy;
    }
    return false;
  }

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
