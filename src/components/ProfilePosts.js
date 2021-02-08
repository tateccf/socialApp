import React, { useState, useEffect } from 'react';
import gravatarUrl from 'gravatar-url';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

const ProfilePosts = props => {
  const { email, userId, userName } = props.user;
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        //Fetch posts by UserId
        console.log(userId);
        const res = await db.collection('posts').where('createdBy', '==', userId);
        const posts = await res.get();

        const postsArr = await posts.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        setPosts(postsArr);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchPosts();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list-group">
      {posts.map(post => {
        return (
          <Link
            className="list-group-item list-group-item-action"
            key={post.id}
            to={`/post/${post.id}`}
          >
            <img
              alt="avatar"
              className="avatar-tiny"
              src={gravatarUrl(email, { size: 200 })}
            />
            <strong>{post.title}</strong>
            <span className="text-muted small"> posted by {userName} </span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
