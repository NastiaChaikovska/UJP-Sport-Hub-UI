import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Outlet/>
        </div>
    );
}

export default App;
