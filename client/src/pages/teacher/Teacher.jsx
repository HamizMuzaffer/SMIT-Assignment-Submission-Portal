import React,{useEffect,useState}from 'react'
import useAuthRedirect from '../../hooks/CheckAuth';
import MiniDrawer from '../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';

function Teacher() {
  useAuthRedirect()
  const dispatch = useDispatch();
  const teacherInfo = useSelector((state) => state.teacher.info);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUser());
      const data = await getAssignments();
      setAssignments(data);
    };
    fetchData();
  }, [dispatch]);

  return (
    <MiniDrawer teacherInfo={teacherInfo} />
  )
}

export default Teacher