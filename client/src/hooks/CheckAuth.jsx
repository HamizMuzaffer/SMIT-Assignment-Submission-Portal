import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/student/login');
    }
    else {
    navigate('/student/home')
    }
  }, [navigate]);
};

export default useAuthRedirect;
