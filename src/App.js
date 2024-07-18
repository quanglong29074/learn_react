import React from 'react';
import BlogList from './data';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import EditBlog from './pages/EditBlog';
import AddBlogForm from './pages/addBlog';
import Login from './pages/Login'; // Import Login component

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="blogs/edit/:id" element={<EditBlog />} />
                    <Route path="add-blog" element={<AddBlogForm />} />
                    <Route path="login" element={<Login />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}
