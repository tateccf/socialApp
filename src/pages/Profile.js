import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import gravatarUrl from 'gravatar-url';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import ProfilePosts from '../components/ProfilePosts';
import Spinner from '../components/Spinner';
import StateContext from '../context/StateContext';
import DispatchContext from '../context/DispatchContext';

const Profile = () => {
  const { userEmail } = useParams();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [user, setUser] = useState({});
  const history = useHistory();
  const [followRequestCount, setFollowRequestCount] = useState(0);
  const [stopFollowingRequestCount, setStopFollowingRequestCount] = useState(0);

  function handleFollowRequest() {
    setFollowRequestCount(followRequestCount + 1);
  }

  function handleStopFollowing() {
    setStopFollowingRequestCount(stopFollowingRequestCount + 1);
  }

  useEffect(() => {
    if (stopFollowingRequestCount === 0) return;

    async function stopFollowing() {
      // Update in DB the followers of the profile account
      await db
        .collection('users')
        .doc(user.userId)
        .update({
          followers: user.followers.filter(foll => foll !== appState.user.userId), //[...user.followers, appState.user.userId],
        });

      //Update in State
      setUser(prev => ({
        ...prev,
        followers: user.followers.filter(foll => foll !== appState.user.userId),
      }));

      console.log('UNFOLLOW COMPLETED', user);

      //Update in DBthe following of the logged in account
      await db
        .collection('users')
        .doc(appState.user.userId)
        .update({
          following: appState.user.following.filter(foll => foll !== user.userId), //[...appState.user.following, user.userId],
        });

      const newState = {
        ...appState.user,
        following: appState.user.following.filter(foll => foll !== user.userId),
      };

      appDispatch({ type: 'UPDATE_PROFILE', payload: newState });
      console.log('UNFOLLOW COMPLETED', newState);
    }

    stopFollowing();
  }, [stopFollowingRequestCount]);

  useEffect(() => {
    if (followRequestCount === 0) return;
    async function startFollowing() {
      // Update in DB the followers of the profile account
      await db
        .collection('users')
        .doc(user.userId)
        .update({
          followers: [...user.followers, appState.user.userId],
        });

      //Update in State
      setUser(prev => ({
        ...prev,
        followers: [...user.followers, appState.user.userId],
      }));

      //Update in DBthe following of the logged in account
      await db
        .collection('users')
        .doc(appState.user.userId)
        .update({
          following: [...appState.user.following, user.userId],
        });

      const newState = {
        ...appState.user,
        following: [...appState.user.following, user.userId],
      };

      appDispatch({ type: 'UPDATE_PROFILE', payload: newState });
      history.push(`/profile/${user.userEmail}`);
    }

    startFollowing();
  }, [followRequestCount]);

  useEffect(() => {
    // Fetch users from firebase
    async function getUser() {
      try {
        const res = await db.collection('users');
        const users = await res.get();

        // Set the user who matches the email in the URL of the page
        users.docs.forEach(doc => {
          if (doc.data().userEmail === userEmail) {
            setUser({
              ...doc.data(),
            });
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getUser();
  }, []);

  function showFollowButton() {
    //To show the follow button
    //The user has to be logged In
    //The user cannot follow himself
    //The user is not following already the other user

    if (
      appState.loggedIn &&
      user.userEmail !== appState.user.userEmail &&
      !appState.user.following?.includes(user.userId)
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Page title="Your Profile">
      <h2>
        <img
          alt="user avatar"
          className="avatar-small"
          src={user ? gravatarUrl(userEmail, { size: 200 }) : 'example@gmail.com'}
        />
        {user?.userName}
        {showFollowButton() && (
          <button
            onClick={handleFollowRequest}
            className="btn btn-primary btn-sm ml-2"
          >
            Follow <i className="fas fa-user-plus"></i>
          </button>
        )}
        {!showFollowButton() && appState.user.following.includes(user.userId) && (
          <button
            onClick={handleStopFollowing}
            className="btn btn-danger btn-sm ml-2"
          >
            Stop following <i className="fas fa-user-minus"></i>
          </button>
        )}
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a to="#" className="active nav-item nav-link">
          Posts
        </a>
        <a to="#" className="nav-item nav-link">
          Followers: {user.followers?.length}
        </a>
        <a to="#" className="nav-item nav-link">
          Following: {user.following?.length}
        </a>
      </div>
      {user.userId ? <ProfilePosts user={user} /> : <Spinner />}
    </Page>
  );
};

export default Profile;
