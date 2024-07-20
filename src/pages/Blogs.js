import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, redirect} from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blogs!', error);
            });
    }, []);

    const handleDelete = (id) => {

        if (window.confirm('Are you sure you want to delete this blog?')) {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:3001/api/blogs/deleteBlog/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setBlogs(blogs.filter(blog => blog._id !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the blog!', error);
                });
        }
    };

    return (
        <div>
            <h1>Blog List</h1>
            <Link to="/add-blog" className="btn btn-primary mb-3">Add Blog</Link>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Image</th>
                    <th scope="col">Username</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map((blog, index) => (
                    <tr key={index}>
                        <td>{blog.title}</td>
                        <td>{blog.content}</td>
                        <td><img src={blog.image} alt={blog.title} style={{ width: "100px" }} /></td>
                        <td>{blog.user_id?.username}</td>
                        <td>
                            <a href={`/blogs/edit/${blog._id}`} className="btn btn-warning btn-sm me-2">Edit</a>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                {blogs.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Blogs;
