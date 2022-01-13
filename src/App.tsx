import React from 'react';
import './App.css';
import App3D from './3D/index';
import AppThreejs from './threejs/index';
import Home from './Home/index';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3d" element={<App3D />} />
        <Route path="/threejs" element={<AppThreejs />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
