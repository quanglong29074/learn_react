import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams(); // Lấy id của blog từ URL
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        image: ''

    });

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
            // Xử lý khi không có token
            window.location.href = '/login'; // Điều hướng đến trang đăng nhập
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
            console.log('Blog updated successfully:', response.data);
            // Điều hướng về trang danh sách blog sau khi cập nhật thành công
            window.location.href = '/blogs';
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
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={blog.image}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditBlog;
