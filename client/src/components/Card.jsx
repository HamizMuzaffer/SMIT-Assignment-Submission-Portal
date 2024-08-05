import * as React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router';

export default function BasicCard({ assignments }) {
    const isoDateString = assignments.dueDate;
    const date = new Date(isoDateString);
    const navigate = useNavigate();
    const pstOffset = 5 * 60 * 60 * 1000; // Offset in milliseconds
    const pstDate = new Date(date.getTime() + pstOffset);

    const readableDate = pstDate.toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleViewDetails = () => {
        navigate(`/teacher/assignments/${assignments._id}`);
    };

    return (
        <Card sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            bgcolor: 'whitesmoke',
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h5' color="textPrimary" gutterBottom noWrap>
                    {assignments.title}
                </Typography>
                <CardMedia
                    component="img"
                    image={`https://smit-server.vercel.app${assignments.file}`}
                    alt="Assignment Image"
                    sx={{ 
                        width: '100%', 
                        height: 200, 
                        objectFit: 'contain',
                        mb: 2 
                    }}
                />
            </CardContent>
            <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Deadline: {readableDate}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Total Submissions: {assignments.totalSubmissions}
                </Typography>
                <CardActions sx={{ justifyContent: 'center', p: 0 }}>
                    <Button 
                        onClick={handleViewDetails} 
                        variant='contained' 
                        fullWidth
                    >
                        View Submissions
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}