import { useNavigate } from 'react-router-dom';

export const CheckLogin = () => {
    const navigate = useNavigate();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            navigate('/login');
        }
    };

    return { checkAuth };
};
