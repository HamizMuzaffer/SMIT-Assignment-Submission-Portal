import React, { useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Rating, Container, Typography } from '@mui/material';
import axios from 'axios';

function SubmissionTable({ submissions }) {
  const [editedRating, setEditedRating] = useState({});
  const [readOnly, setReadOnly] = useState({});


  const handleRatingChange = (submissionId, newValue) => {
    setEditedRating((prevRatings) => ({
      ...prevRatings,
      [submissionId]: newValue,
    }));
  };

  const handleSubmitRating = async (submissionId) => {
    try {
      const rating = editedRating[submissionId];
      console.log(rating)
      await axios.post('http://localhost:3000/teacher/assignment/update', {
        _id: submissionId,
        rating,
      });
      setReadOnly((prevReadOnly) => ({
        ...prevReadOnly,
        [submissionId]: true,
      }));
      console.log(`Rating submitted for ${submissionId}: ${rating}`);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Submission Link</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              { submissions ? submissions.filter((submission)=>submission.rating === null).map((submission) => (
                <TableRow key={submission._id}>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>
                    <a href={submission.submissionLink} target="_blank" rel="noopener noreferrer">
                      View Submission
                    </a>
                  </TableCell>
                  <TableCell>
                    <Rating
                      name={`rating-${submission._id}`}
                      value={editedRating[submission._id] || 0}
                      onChange={(event, newValue) => handleRatingChange(submission._id, newValue)}
                      readOnly={readOnly[submission._id] || false}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleSubmitRating(submission._id)}
                      variant="contained"
                      color="primary"
                      disabled={readOnly[submission._id] || false}
                    >
                      Submit Rating
                    </Button>
                  </TableCell>
                </TableRow>
              ))
             : (
              <TableRow>
                <TableCell colSpan={4}>No submissions available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SubmissionTable;
