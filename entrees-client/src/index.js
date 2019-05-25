import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// turns off warnings from async-validator
const warn = console.warn
console.warn = (...args) => {
  if(typeof args[0] === 'string' && args[0].startsWith('async-validator:')) return

  warn(...args)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
