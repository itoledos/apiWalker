import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import DataList from './components/list';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/:id" element={<DataList/>} />
            <Route path="/" element={<Link to="./:id">Ir a solicitud</Link>} />
          </Routes>
          {/* <DataList /> */}
          {/* <Link to="./:id">Ir a solicitud</Link> */}
        </div>
    </BrowserRouter>
  );
}

export default App;
