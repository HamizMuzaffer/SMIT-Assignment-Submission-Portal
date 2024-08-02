import * as React from 'react';
import Card from '@mui/material/Card';
import { Button, Container } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import {useNavigate } from 'react-router-dom';


export default function ViewCard({ assignment, teacher }) {
    const isoDateString = assignment.dueDate;
    const date = new Date(isoDateString);
    const pstOffset = 5 * 60 * 60 * 1000;
    const pstDate = new Date(date.getTime() + pstOffset);
    
    const readableDate = pstDate.toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const currentDate = new Date();
    const isPastDueDate = currentDate > date;
    const navigate = useNavigate()
    const handleViewDetails = () => {
        navigate(`/student/assignments/${assignment._id}`);
      };
    return (
        <Card sx={{ maxWidth: 345, my: 3, width: '100%', mx: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }

                title={teacher.name}
                subheader={`Due Date : ${readableDate}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={`http://localhost:3000${assignment.file}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h4" color="text.secondary">
                    {assignment.title}
                </Typography>
                {!isPastDueDate && (
                    <>

                    <Button variant="contained" onClick={handleViewDetails} color="primary" sx={{ my: 1 }}>
                        Submit
                    </Button>
                    </>
                )}

                {isPastDueDate && (
                    <>
                        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <DoNotDisturbIcon sx={{ color: 'red', mx: 1, mt: 2 }} />
                            <Typography variant="h5" sx={{ color: 'red', mt: 2, display: 'inline' }}>Due Date Passed</Typography>
                        </Container>
                    </>
                )}
            </CardContent>


        </Card>
    );
}
