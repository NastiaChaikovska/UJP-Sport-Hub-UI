import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import ForgotPassword from "./pages/login/forgotPassword";
import HomePage from "./pages/home/homePage";
import RegistrationPage from "./pages/registration/registrationPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="login" element={<LoginPage/>} />
                <Route path="/" element={<HomePage/>} />
                <Route path="forgot" element={<ForgotPassword/>} />
                <Route path="registration" element={<RegistrationPage/>} />
            </Route>
            {/*<Route>*/}
            {/*    <Route path="registration" element={<RegistrationPage/>} />*/}
            {/*    <Route path="login" element={<LoginPage/>} />*/}
            {/*</Route>*/}
        </Routes>
    </BrowserRouter>
);
