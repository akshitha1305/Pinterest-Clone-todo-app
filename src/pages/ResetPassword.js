// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`/api/reset-password`, {
                token: match.params.token,
                password,
            });
            setMessage('Password has been reset successfully');
        } catch (error) {
            setError('Error resetting password');
        }
    };

    return (
        <div className="reset-password">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Reset Password</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
