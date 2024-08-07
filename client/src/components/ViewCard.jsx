import * as React from 'react';
import Card from '@mui/material/Card';
import { Button, Container } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function ViewCard({ assignment, teacher }) {
  const isoDateString = assignment.dueDate;
  const date = new Date(isoDateString);
  const pstOffset = 5 * 60 * 60 * 1000;
  const pstDate = new Date(date.getTime() + pstOffset);

  const readableDate = pstDate.toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/student/assignments/${assignment._id}`);
  };

  return (
    <Card
      sx={{
        my: 3,
        width: {
          xs: '100%', // 100% width on small screens
          sm: 'auto', // auto width on larger screens
        },
        maxWidth: 400,
        mx: {
          xs: 0, // no horizontal margin on small screens
          sm: 3, // horizontal margin on larger screens
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={teacher.name}
        subheader={`Due Date : ${readableDate}`}
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {assignment.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {assignment.description}
        </Typography>
        <Button
          variant="contained"
          onClick={handleViewDetails}
          color="primary"
          sx={{ mt: 2 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
