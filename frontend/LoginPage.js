import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../styles/LoginStyles.css'; // Import parallax styles

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            alert(res.data.message);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login Error:", err);
            alert(err.response?.data?.message || "Login failed! Please check your credentials.");
        }
    };

    // Placeholder Image URLs (REPLACE THESE WITH YOUR ACTUAL ASSET PATHS)
    const bgUrl = "https://placehold.co/1920x1080/4287f5/ffffff?text=Background";
    const treesUrl = "https://wallpaperaccess.com/full/2747979.jpg";
    const girlUrl = "https://placehold.co/100x150/d1936e/ffffff?text=Girl";

    return (
        <section>
            {/* Background Elements */}
            <img src={bgUrl} alt="Background" className="bg" />
            <img src={treesUrl} alt="Trees" className="trees" />
            <img src={girlUrl} alt="Girl" className="girl" />

            {/* Login Box (Glassmorphic) */}
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="inputBox">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="inputBox">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="inputBox">
                        <input type="submit" value="Login" id="btn" />
                    </div>
                    <div className="group">
                        <a href="javascript:void(0);">Forgot Password</a>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;