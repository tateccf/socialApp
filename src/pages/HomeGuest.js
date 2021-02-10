import React, { useState } from 'react';
import Page from '../components/Page';
import { auth, db } from '../firebase';

const HomeGuest = () => {
  // State of Email and Password
  const [inputsForm, setInputsForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  // Set State with new values when some of the input changes
  const handleFormChange = ({ target }) => {
    setInputsForm(prev => {
      return { ...prev, [target.name]: target.value };
    });
  };

  // Submit the form to firebase auth API
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await auth.createUserWithEmailAndPassword(
        inputsForm.email,
        inputsForm.password
      );

      // We have also to save the user in the Firestore. If we dont do this, we wont we able to fetch the users by email.

      await db.collection('users').doc(res.user.uid).set({
        userName: inputsForm.username,
        userEmail: inputsForm.email,
        userId: res.user.uid,
        followers: [],
        following: [],
      });
    } catch (err) {
      console.log(err.message);
    }
    // Clear the form inputs
    setInputsForm({ email: '', password: '', username: '' });
  };

  return (
    <Page wide={true} title="Home">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Remember Writing?</h1>
          <p className="lead text-muted">
            Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts
            that are reminiscent of the late 90&rsquo;s email forwards? We believe
            getting back to actually writing is the key to enjoying the internet
            again.
          </p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Pick an username"
                autoComplete="off"
                onChange={handleFormChange}
                value={inputsForm.username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                value={inputsForm.email}
                onChange={handleFormChange}
                id="email-register"
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input
                value={inputsForm.password}
                onChange={handleFormChange}
                id="password-register"
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Sign up for ComplexApp
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default HomeGuest;
