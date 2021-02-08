import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import gravatarUrl from 'gravatar-url';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userEmail } = useParams();

  const [user, setUser] = useState({
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
  }, []);

  console.log(user);

  return (
    <Page title="Your Profile">
      <h2>
        <img className="avatar-small" src={gravatarUrl(user.email, { size: 200 })} />
        {user.userName}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {user.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {user.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {user.counts.followingCount}
        </a>
      </div>

      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{' '}
          <strong>Example Post #1</strong>
          <span className="text-muted small">on 2/10/2020 </span>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{' '}
          <strong>Example Post #2</strong>
          <span className="text-muted small">on 2/10/2020 </span>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{' '}
          <strong>Example Post #3</strong>
          <span className="text-muted small">on 2/10/2020 </span>
        </a>
      </div>
    </Page>
  );
};

export default Profile;
