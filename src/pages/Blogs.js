import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/blogs')
            .then(response => {
                setBlogs(response.data);
                setSearchResults(response.data); // Initialize search results to all blogs
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
                    setSearchResults(searchResults.filter(blog => blog._id !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the blog!', error);
                });
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/api/blogs/search?search=${encodeURIComponent(searchQuery)}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('There was an error fetching the search results!', error);
        }
    };

    return (
        <div>
            <h1>Blog List</h1>
            <Link to="/add-blog" className="btn btn-primary mb-3">Add Blog</Link>
            <form className="d-flex mb-3" onSubmit={handleSearch}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
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
                {searchResults.map((blog, index) => (
                    <tr key={index}>
                        <td>{blog.title}</td>
                        <td>{blog.content}</td>
                        <td><img src={blog.image} alt={blog.title} style={{ width: "100px" }} /></td>
                        <td>{blog.user_id?.username}</td>
                        <td>
                            <Link to={`/blogs/edit/${blog._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                {searchResults.length === 0 && (
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
