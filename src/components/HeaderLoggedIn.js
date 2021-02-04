import React from 'react';
import gravatarUrl from 'gravatar-url';

const HeaderLoggedIn = ({ setLoggedIn }) => {
  //When clicking LogOut button, we set the loggedIn state to false and we clean the local Storage
  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.clear();
  };
  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <a href="#" className="mr-2">
        <img
          className="small-header-avatar"
          src={gravatarUrl(localStorage.getItem('socialappEmail'), { size: 200 })}
        />
      </a>
      <a className="btn btn-sm btn-success mr-2" href="/create-post">
        Create Post
      </a>
      <button className="btn btn-sm btn-secondary" onClick={handleLogOut}>
        Sign Out
      </button>
    </div>
  );
};

export default HeaderLoggedIn;
