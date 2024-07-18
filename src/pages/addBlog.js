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
            if (!token) {
                alert('User not logged in');
                window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
                return;
            }
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // thời gian hiện tại tính bằng giây
            if (decodedToken.exp < currentTime) {
                alert('Token expired, please log in again');
                return;
            }
            const loggedUserId = decodedToken.user_id; // Giả sử user_id có trong payload của token
            const blogData = { title, content, image, userId: loggedUserId }; // Đảm bảo userId được đưa vào request với đúng tên thuộc tính
            console.log('Blog Data:', blogData); // Ghi log dữ liệu để gửi
            const response = await axios.post(
                'http://localhost:3001/api/blogs/createBlog',
                blogData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Đảm bảo định dạng token đúng
                    },
                }
            );
            console.log('Response:', response.data); // Ghi log phản hồi từ server để debug
            alert('Blog added successfully!');
            // Xóa nội dung form nếu cần
            setTitle('');
            setContent('');
            setImage('');
        } catch (error) {
            console.error('Error:', error.response.data); // Ghi log chi tiết lỗi
            alert('Failed to add blog. Please check your input.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" >Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                       value={title} onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                          value={content} onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                       value={image} onChange={(e) => setImage(e.target.value)}
                />
            </div>

            <button type="submit">Add Blog</button>
        </form>
    );
};

export default AddBlogForm;
