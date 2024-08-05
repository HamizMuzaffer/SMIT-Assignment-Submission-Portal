import React from 'react'
import MiniDrawer from '../../components/Drawer';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import getSubmissions from '../../api/submissions'
import SubmissionsTable from '../../components/Table';
function AssignmentDetails() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([])
    useTeacherAuthRedirect()
    const teacherInfo = useSelector((state) => state.teacher.info);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchUser());
                const assignmentResponse = await axios.get(`https://smit-server.vercel.app/teacher/assignment/${id}`);
                const assignmentData = assignmentResponse.data;
                setAssignment(assignmentData);
                const submissionsResponse = await getSubmissions();
                setSubmissions(submissionsResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (assignment && submissions.length > 0) {
            const filtered = submissions.filter((submission) => submission.assignmentId === assignment._id);
            console.log('Filtered Submission:', filtered);
            setFilteredSubmissions(filtered);
        }
    }, [assignment, submissions]);


    return (
        <>
            <MiniDrawer teacherInfo={teacherInfo} />
            <Typography variant='h5'>{assignment?.title}</Typography>
            <SubmissionsTable submissions={filteredSubmissions} />

        </>
    )
}

export default AssignmentDetails