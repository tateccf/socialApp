import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import DispatchContext from '../context/DispatchContext';
import StateContext from '../context/StateContext';

const HeaderLoggedIn = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  //When clicking LogOut button, we set the loggedIn state to false and we clean the local Storage
  const handleLogOut = () => {
    appDispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="flex-row my-3 my-md-0">
      <Link to="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </Link>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.userEmail}`} className="mr-2">
        <img
          alt="avatar"
          className="small-header-avatar"
          src={gravatarUrl(appState.user.userEmail, { size: 200 })}
        />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/new-post">
        Create Post
      </Link>
      <button className="btn btn-sm btn-secondary" onClick={handleLogOut}>
        Sign Out
      </button>
    </div>
  );
};

export default HeaderLoggedIn;
