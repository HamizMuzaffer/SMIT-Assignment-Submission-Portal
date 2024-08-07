import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useTeacherAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('Token in useTeacherAuthRedirect:', token); // Add this line
    if (!token) {
      navigate('/teacher/login');
    }
  }, [navigate]);
};

export default useTeacherAuthRedirect;
