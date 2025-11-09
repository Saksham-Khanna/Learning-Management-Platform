import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginStyles.css'; // Import parallax styles

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'learner'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('✅ Registration successful! Please log in.');
                navigate('/login'); 
            } else {
                alert('❌ ' + (data.message || 'Registration failed'));
            }
        } catch (error) {
            console.error('Network Error during registration:', error);
            alert('⚠️ Something went wrong. Check console for details.');
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

            {/* Register Box (Glassmorphic) */}
            <div className="login" style={{ width: '550px' }}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="inputBox">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="inputBox">
                        {/* Select box styled using the CSS input styles */}
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="learner">Learner</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>
                    <div className="inputBox">
                        <input type="submit" value="Register" id="btn" />
                    </div>
                    <div className="group">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;