import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useTeacherAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/teacher/login');
    }

    
  }, [navigate]);
};

export default useTeacherAuthRedirect;
