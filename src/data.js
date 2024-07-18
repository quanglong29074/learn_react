import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogList = () => {
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

    return (
        <div>
            <h1>Blog List</h1>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Image</th>
                    <th scope="col">Username</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map((blog, index) => (
                    <tr key={index}>
                        <td>{blog.title}</td>
                        <td>{blog.content}</td>
                        <td><img src={blog.image} alt={blog.title} style={{ width: "100px" }} /></td>
                        <td>{blog.user_id?.username}</td>
                    </tr>
                ))}
                {blogs.length === 0 && (
                    <tr>
                        <td colSpan="4" className="text-center">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default BlogList;
