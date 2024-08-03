import React, { useEffect, useState } from 'react'
import MiniDrawer from '../../components/Drawer'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import getAllStudents from '../../api/getStudent';
import getSubmissions from '../../api/submissions';

function Leaderboard() {
  const teacherInfo = useSelector((state) => state.teacher.info);
  const dispatch = useDispatch();
  const [students, setStudents] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUser());
      const data = await getAllStudents()
      const response = await getSubmissions()
      setStudents(data)
      setSubmissions(response)
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0 && submissions.length > 0 && teacherInfo) {
      const filter = students.filter((student) => student.teacherName === teacherInfo.name)
      const studentData = filter.map((student, index) => {
        const studentSubmissions = submissions.filter(submission => submission.studentId === student._id)
        const totalSubmissions = studentSubmissions.length
        const averageRating = totalSubmissions > 0
          ? studentSubmissions.reduce((sum, sub) => sum + sub.rating, 0) / totalSubmissions
          : 0

        return {
          ...student,
          serialNo: index + 1,
          totalSubmissions,
          averageRating: averageRating.toFixed(2)
        }
      })

      // Sort students by total submissions (descending) and then by average rating (descending)
      const sortedStudents = studentData.sort((a, b) => {
        if (b.totalSubmissions !== a.totalSubmissions) {
          return b.totalSubmissions - a.totalSubmissions
        }
        return b.averageRating - a.averageRating
      })

      setFilteredStudents(sortedStudents)
    }
  }, [students, submissions, teacherInfo]);

  return (
    <>
      <MiniDrawer teacherInfo={teacherInfo} />
      <Typography variant='h3' sx={{ textAlign: 'center', mb: 3 }}>Leaderboard</Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell align="center">Total Submissions</TableCell>
              <TableCell align="center">Average Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student, index) => (
              <TableRow key={student._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell align="center">{student.totalSubmissions}</TableCell>
                <TableCell align="right">{student.averageRating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Leaderboard