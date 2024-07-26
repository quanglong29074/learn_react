import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1); // Default number of items per page

    useEffect(() => {
        axios.get('http://localhost:3001/api/blogs')
            .then(response => {
                setBlogs(response.data);
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blogs!', error);
            });
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults(blogs);
        } else {
            const filteredResults = blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
        setCurrentPage(1);
    }, [searchQuery, blogs]);

    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentBlogs = searchResults.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:3001/api/blogs/deleteBlog/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setBlogs(blogs.filter(blog => blog._id !== id));
                    setSearchResults(searchResults.filter(blog => blog._id !== id));
                    setCurrentPage(1);
                })
                .catch(error => {
                    console.error('There was an error deleting the blog!', error);
                });
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>Blog List</h1>
            <Link to="/add-blog" className="btn btn-primary mb-3">Add Blog</Link>
            <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
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
            <div className="mb-3 text-end">

                <select
                    id="itemsPerPage"
                    className="form-select custom-dropdown"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
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
                {currentBlogs.map((blog, index) => (
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
                {currentBlogs.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(number + 1)}>
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Blogs;
