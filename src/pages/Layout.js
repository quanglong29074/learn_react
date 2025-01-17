import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios"; // Sử dụng named import

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
                setIsLoggedIn(true);
            } else {
                handleLogout(); // Token hết hạn, tự động đăng xuất
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
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
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs">Blogs</Link>
                            </li>
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;
