// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }
        try {
            const response = await axios.post('/api/forgot-password', { email });
            setMessage('Password reset link sent to your email');
        } catch (error) {
            setError('Error sending password reset link');
        }
    };

    return (
        <div className="forgot-password">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Send Reset Link</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
