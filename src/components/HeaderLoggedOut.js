import React, { useState } from 'react';
import { auth } from '../firebase';

const HeaderLoggedOut = ({ setLoggedIn }) => {
  // State of Email and Password
  const [inputsForm, setInputsForm] = useState({ email: '', password: '' });

  // Set State with new values when some of the input changes
  const handleFormChange = ({ target }) => {
    setInputsForm(prev => {
      return { ...prev, [target.name]: target.value };
    });
  };

  // Submit the form to firebase auth API

  const handleFormSubmit = async e => {
    e.preventDefault();

    try {
      const res = await auth.signInWithEmailAndPassword(
        inputsForm.email,
        inputsForm.password
      );
      localStorage.setItem('socialappUserId', res.user.uid);
      localStorage.setItem('socialappEmail', res.user.email);
      localStorage.setItem('socialappUsername', res.user.displayName);

      setLoggedIn(true);
    } catch (err) {
      console.log(err.message);
    }
    //Clean the form inputs

    setInputsForm({ email: '', password: '' });
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="mb-0 pt-2 pt-md-0"
      autoComplete="off"
    >
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            value={inputsForm.email}
            onChange={handleFormChange}
            name="email"
            className="form-control form-control-sm input-dark"
            type="email"
            placeholder="Your Email"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            value={inputsForm.password}
            onChange={handleFormChange}
            autoComplete="new-password"
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default HeaderLoggedOut;