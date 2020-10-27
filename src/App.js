import React , {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TimerControl from './Component/TimerControl';

const App = ()=> {
  return (
    <div className="App">
      <header className="App-header">
       <TimerControl />
      </header>
    </div>
  );
}

export default App;
