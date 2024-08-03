import React , {useEffect,useState}from 'react'
import useAuthRedirect from '../../hooks/CheckAuth'
import { Container, Typography, Card, CardContent, CardHeader, Avatar, Box } from '@mui/material';
import MiniDrawer from '../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { red } from '@mui/material/colors';
import '../../App.css'; 

function TeacherAnnouncement() {
  useAuthRedirect()
  const [announcements,setAnnouncements] = useState()
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
    <>
            <MiniDrawer teacherInfo={teacherInfo} />
            <Container sx={{
        
      }}>
        <Box>
        <Typography variant="h4" sx={{ mb: 4,textAlign : 'center' }}>
          All the Major Announcements
        </Typography>
        {announcements.map((announcement) => (
          <Card key={announcement.id} sx={{ mb: 4 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="teacher">
                  {announcement.teacher.charAt(0)}
                </Avatar>
              }
              title={announcement.title}
              subheader={`Posted by: ${announcement.teacher} on ${new Date(announcement.date).toLocaleDateString()}`}
            />
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                {announcement.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
        </Box>
      </Container>

    </>
  )
}

export default TeacherAnnouncement