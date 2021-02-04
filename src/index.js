import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { db } from './firebase';
console.log(db);

db.collection('cities')
  .doc('LA')
  .set({
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA',
  })
  .then(function () {
    console.log('Document successfully written!');
  })
  .catch(function (error) {
    console.error('Error writing document: ', error);
  });

ReactDOM.render(<App />, document.getElementById('root'));
