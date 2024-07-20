import React, { useState } from 'react';
import axios from 'axios';
import AddBlogForm from "./addBlog";

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const UserData = {username, password};
            console.log("data: ", UserData)
            const response = await axios.post(
                'http://localhost:3001/api/auth/register/',
                UserData
            );
            alert('Sign Up Success');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }

    return (
        <>
            <h1 style={{
                textAlign:"center"
            }}>Register</h1>

            <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" >User name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                       value={username} onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                <input className="form-control" id="exampleFormControlTextarea1" rows="3"
                          value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
        </>
    )

}
export default Register;

