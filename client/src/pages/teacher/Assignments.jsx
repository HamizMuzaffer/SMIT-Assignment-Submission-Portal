import React,{useEffect, useState} from 'react'
import MiniDrawer from '../../components/Drawer';
import axios from 'axios'
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography, Container, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import SelectSmall from '../../components/Select';
import ModalComponent from '../../components/Modal';
import { fetchUser } from '../../features/teacher/teacherSlice';
import getAssignments from '../../api/assignments';
import BasicCard from '../../components/Card';
function TeacherAssignments() {
  useAuthRedirect()
  const dispatch = useDispatch();
  const teacherInfo = useSelector((state) => state.teacher.info);
  const [assignments,setAssignments] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        dispatch(fetchUser());
        const data = await getAssignments();
        setAssignments(data);

    };
    fetchData();
}, [dispatch]);


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('dueDate', data.dueDate);
        formData.append('file',data.file)
        formData.append('teacherId',teacherInfo._id)
        const response = await axios.post('http://localhost:3000/teacher/assignment', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setOpen(true);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};
  return (
    <>,
      <MiniDrawer teacherInfo={teacherInfo} />
      <div className="containerWithDrawer">
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h3'>
            Assignments
          </Typography>
          <Box sx={{ width: '80%', bgcolor: 'whitesmoke', height: '10vh', mt: 2, borderRadius: '20px', display: 'flex', justifyContent : 'space-between', px : 2,alignItems : 'center'}} >
            <SelectSmall />
            <Button startIcon = {<AddIcon />} onClick={handleOpen} sx={{bgcolor : '#1976d2', px : 3, borderRadius : 2, color : 'white','&:hover' : {bgcolor : '#1976d2'}}} >Add New Assignment</Button>
            <ModalComponent open={open} handleClose={handleClose} onSubmit={handleSubmit}/>
        </Box>
        {assignments.filter((assignment)=> assignment.teacherId === teacherInfo?._id).map((filteredAssignment)=><BasicCard key={filteredAssignment._id} assignments={filteredAssignment}/>)}
        </Container>
      </div>
    </>
  )
}
export default TeacherAssignments