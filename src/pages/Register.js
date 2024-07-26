import React, { useState } from 'react';
import axios from 'axios';
import AddBlogForm from "./addBlog";
import { useParams, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const UserData = {username, password};
            console.log("data: ", UserData)
            if (confirmPassword == password) {
                const response = await axios.post(
                    'http://localhost:3001/api/auth/register/',
                    UserData
                );
                alert('Sign Up Success');
                navigate('/login');
            }else {
                alert('Confirm password wrong')
            }
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
                <input type="password" className="form-control" id="exampleFormControlTextarea1" rows="3"
                          value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="exampleFormControlTextarea1" rows="3"
                           value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
        </>
    )

}
export default Register;

