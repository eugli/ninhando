import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Game from './Game';
import Home from './Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/game" element={ <Game/> }/>
          <Route exact path="/" element={ <Home/> }/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;