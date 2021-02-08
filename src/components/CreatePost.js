import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import DispatchContext from '../context/DispatchContext';
import StateContext from '../context/StateContext';
import { db } from '../firebase';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await db.collection('posts').add({
        title,
        body,
        createdBy: appState.user.userId,
      });

      //Show a Flash message
      appDispatch({
        type: 'ADD_FLASH_MESSAGE',
        payload: 'Post Created Successfully!',
      });
      // Redirect to the new post URL
      history.push(`/post/${res.id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Page title="Create new Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary">Create New Post</button>
      </form>
    </Page>
  );
};

export default CreatePost;
