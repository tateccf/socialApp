import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import gravatarUrl from 'gravatar-url';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import ProfilePosts from '../components/ProfilePosts';
import Spinner from '../components/Spinner';

const Profile = () => {
  const { userEmail } = useParams();

  const [user, setUser] = useState({
    userId: '',
    userName: '...',
    email: 'example@gmail.com',
    counts: { postCount: 0, followerCount: 0, followingCount: 0 },
  });

  useEffect(() => {
    // Fetch users from firebase
    async function getUser() {
      try {
        const res = await db.collection('users');
        const users = await res.get();

        // Set the user who matches the email in the URL of the page
        users.docs.forEach(doc => {
          console.log(doc.data());
          if (doc.data().email === userEmail) {
            setUser({
              ...doc.data(),
              counts: { postCount: 0, followerCount: 0, followingCount: 0 },
            });
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getUser();
  }, [userEmail]);
  console.log(user);

  return (
    <Page title="Your Profile">
      <h2>
        <img
          alt="user avatar"
          className="avatar-small"
          src={gravatarUrl(user.email, { size: 200 })}
        />
        {user.userName}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a to="#" className="active nav-item nav-link">
          Posts: {user.counts.postCount}
        </a>
        <a to="#" className="nav-item nav-link">
          Followers: {user.counts.followerCount}
        </a>
        <a to="#" className="nav-item nav-link">
          Following: {user.counts.followingCount}
        </a>
      </div>
      {user.userId ? <ProfilePosts user={user} /> : <Spinner />}
    </Page>
  );
};

export default Profile;
