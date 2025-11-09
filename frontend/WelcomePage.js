import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginStyles.css'; // Import parallax styles

const WelcomePage = () => {
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

            {/* Welcome Box (Glassmorphic) */}
            <div className="login" style={{ width: '600px', height: 'auto', padding: '40px' }}> 
                
                <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>
                    Welcome to Adaptive Learning Platform
                </h2>
                <p style={{ fontSize: '1.25em', color: '#8f2c24' }}>
                    Please login or register to continue.
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
                    
                    <Link to="/login">
                        <div className="inputBox">
                            {/* Uses the #btn style from CSS */}
                            <input type="button" value="Login" id="btn" style={{ width: '150px' }} />
                        </div>
                    </Link>
                    
                    <Link to="/register">
                        <div className="inputBox">
                            <input type="button" value="Register" id="btn" style={{ width: '150px' }} />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WelcomePage;