import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
const [message, setMessage] = useState({})
useEffect(()=>{
  fetch('http://192.168.1.5/test',{mode: 'no-cors'})
    .then(res=> res.json())
    .then(data=> {
      console.log('hello', data);
      setMessage(data.username);

}).catch(err=>console.log(err))
},[setMessage])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         {message.toString()}
        </a>
      </header>
    </div>
  );
}

export default App;
