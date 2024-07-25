import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Sử dụng named import

const AddBlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const loggedUserId = decodedToken.user_id;
            const blogData = { title, content, image, userId: loggedUserId }; // Đảm bảo userId được đưa vào request với đúng tên thuộc tính
            console.log('Blog Data:', blogData);
            const response = await axios.post(
                'http://localhost:3001/api/blogs/createBlog',
                blogData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Response:', response.data);
            alert('Blog added successfully!');
            window.location.href = '/blogs';
        } catch (error) {
            console.error('Error:', error.response.data);
            alert('Failed to add blog. Please check your input.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" >Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                       value={title} onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                          value={content} onChange={e => setContent(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                       value={image} onChange={e => setImage(e.target.value)}
                />
            </div>

            <button type="submit">Add Blog</button>
        </form>
    );
};

export default AddBlogForm;