import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import ForgotPassword from "./pages/login/forgotPassword";
import HomePage from "./pages/home/homePage";
import AdminHomePage from "./pages/home/AdminHomePage";
import TeamHub from "./pages/teamHub/teamHub";
import RegistrationPage from "./pages/registration/registrationPage";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import EditArticle from "./pages/editArticle/editArticle";
import Profile from "./pages/profile/profile";
import ArticlePage from "./pages/article/articlePage";
import ResetPassword from "./pages/login/resetPassword";
import CategoryPage from "./pages/category_team_page/categoryPage";
import ArticlesByCategoryAdmin from "./pages/allArticlesAdmin/ArticllesByCategoryAdmin";
import IsActiveArticlesByCatAdmin from "./pages/allArticlesAdmin/IsActiveArticlesByCatAdmin";
import AddArticle from "./pages/addArticle/addArticle";
import AddTeam from "./pages/addTeam/addTeam";

const root = ReactDOM.createRoot(document.getElementById('root'));

function getUserRole() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user)
    if (user != null) {
        return JSON.parse(localStorage.getItem("user")).role;
    } else {
        return null;
    }
}

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="/" index element={getUserRole() === "ADMIN" ? <AdminHomePage/> : <HomePage/>}/>
                    <Route path="forgot" element={<ForgotPassword/>}/>
                    <Route path="add-team" element={<AddTeam/>}/>
                    <Route path="registration" element={<RegistrationPage/>}/>
                    <Route path="edit-article/:id/:title" element={<EditArticle/>}/>
                    <Route path="add-article/:title" element={<AddArticle/>}/>
                    <Route path="update-user-information/:profile" element={<Profile/>}/>
                    <Route path="articles/:id" element={<ArticlePage/>}/>
                    <Route path="teams" element={<TeamHub/>}/>
                    <Route path="admin/articles/category/:category"
                           element={getUserRole() === "ADMIN" ? <ArticlesByCategoryAdmin/> : <Navigate to={"/"}/>}/>
                    <Route path="admin/articles/category/:category/is_active/:isActive"
                           element={getUserRole() === "ADMIN" ? <IsActiveArticlesByCatAdmin/> : <Navigate to={"/"}/>}/>
                    <Route path="reset/password/:token" element={<ResetPassword/>}/>
                    <Route path="category/:id" element={<CategoryPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
