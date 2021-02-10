import React, { useState, useContext } from 'react';
import DispatchContext from '../context/DispatchContext';
import { auth, db } from '../firebase';

const HeaderLoggedOut = () => {
  const appDispatch = useContext(DispatchContext);
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

      const user = await db.collection('users').doc(res.user.uid).get();
      console.log(user.data());
      appDispatch({ type: 'LOGIN', payload: user.data() });
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
