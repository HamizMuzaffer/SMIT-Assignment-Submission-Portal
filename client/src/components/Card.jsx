import * as React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router';


export default function BasicCard({ assignments }) {
    const isoDateString = assignments.dueDate;
    const date = new Date(isoDateString);
    const navigate = useNavigate()
    const pstOffset = 5 * 60 * 60 * 1000; // Offset in milliseconds
    const pstDate = new Date(date.getTime() + pstOffset);

    const readableDate = pstDate.toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const handleViewDetails = () => {
        navigate(`/teacher/assignment/${assignments._id}`);
      };
    return (
        <Card sx={{ minWidth: 275, width: '80%', my: 3, bgcolor: 'whitesmoke' }}>
            <CardContent>
                <Typography variant='h4' color="title" gutterBottom>
                    {assignments.title}
                </Typography>
                <CardMedia
                    component="img"
                    image={`http://localhost:3000${assignments.file}`}
                    alt="Description"

                    sx={{ width: '100%', height: '200px', mb: 2, objectFit: 'contain', }}
                />

            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Button onClick={handleViewDetails} size="small" variant='contained'>View Submissions</Button>
            </CardActions>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="body2">
                    Deadline : {readableDate}
                </Typography>
                <Typography>
                    Total Submissions : {assignments.totalSubmissions}
                </Typography>
            </Box>
        </Card>
    );
}
