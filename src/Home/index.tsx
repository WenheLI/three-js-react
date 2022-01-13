import { Link } from "react-router-dom";
import React from 'react';
import './index.css';

function Home() {
    return <>
        <div id="menu">
            <Link style={{margin: 'auto'}} to="/3d">3D</Link>
            <Link style={{margin: 'auto'}} to="threejs">threejs</Link>
        </div>
    </>
}

export default Home;