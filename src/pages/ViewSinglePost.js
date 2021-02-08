import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { db } from '../firebase';
import gravatarUrl from 'gravatar-url';

const ViewSinglePost = () => {
  // Get the post ID from the page URL
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch post by ID when component renders first time
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await db.collection('posts').doc(id).get();
        const post = res.data();

        setPost(post);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    }
    fetchPost();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Page title="Single Post">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <Link to="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </Link>
          <Link to="#" className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </Link>
        </span>
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

      <div className="body-content">{post.body}</div>
    </Page>
  );
};

export default ViewSinglePost;
