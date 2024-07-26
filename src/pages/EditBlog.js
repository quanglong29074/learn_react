import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams(); // Lấy id của blog từ URL
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        image: ''

    });
    const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng trang

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBlog(prevState => ({
                ...prevState,
                image: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/blogs/${id}`);
                console.log(response.data)
                const fetchedBlog = response.data[0]; // Lấy blog đầu tiên từ response
                setBlog({
                    title: fetchedBlog.title,
                    content: fetchedBlog.content,
                    image: fetchedBlog.image
                });
            } catch (error) {
                console.error('There was an error fetching the blog!', error);
            }
        };
        fetchBlog();

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {

            navigate('login');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3001/api/blogs/updateBlog/${id}`,
                blog,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate('/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div>
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                    <img src={blog.image} width={150} height={150} />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditBlog;
