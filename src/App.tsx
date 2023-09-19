import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Users from './components/users/Users';
import Weather from './components/weather/Weather';
import Movies from './components/movies/Movies';

const App: FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/movie" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
