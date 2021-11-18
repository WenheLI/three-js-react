import React, { useState } from 'react';
import './App.css';
import App3D from './3D/index';

function App() {
  const [camera, setCamera] = useState<THREE.PerspectiveCamera>();
  return (
    <div id='master-container'>
      <App3D />
    </div>    
  );
}

export default App;
