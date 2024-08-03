import React, { useState, useEffect } from 'react';
import MiniDrawer from '../../components/Drawer';
import useAuthRedirect from '../../hooks/CheckAuth';
import { Typography, Container, TextField, Button, Grid, Card, CardContent, CardActions, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { useSelector, useDispatch } from 'react-redux';
import '../../App.css';

function TeacherNotes() {
    useAuthRedirect();
    const dispatch = useDispatch();
    const teacherInfo = useSelector((state) => state.teacher.info);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [editingNoteId, setEditingNoteId] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUser());
            // Replace this with actual API call
            setNotes([
                { id: 1, title: 'Lesson Plan', content: 'Prepare lesson plan for next week' },
                { id: 2, title: 'Meeting Notes', content: 'Discuss student progress in next staff meeting' },
            ]);
        };
        fetchData();
    }, [dispatch]);

    const handleAddNote = () => {
        if (newNote.title && newNote.content) {
            if (editingNoteId !== null) {
                setNotes(notes.map(note =>
                    note.id === editingNoteId ? { ...note, ...newNote } : note
                ));
                setEditingNoteId(null);
            } else {
                setNotes([...notes, { id: Date.now(), ...newNote }]);
            }
            setNewNote({ title: '', content: '' });
        }
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEditNote = (note) => {
        setNewNote({ title: note.title, content: note.content });
        setEditingNoteId(note.id);
    };

    return (
        <>
            <MiniDrawer teacherInfo={teacherInfo} />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h3' gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                        Notes
                    </Typography>
                    <Box sx={{ mb: 4, width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            margin="normal"
                            size={isMobile ? "small" : "medium"}
                        />
                        <TextField
                            fullWidth
                            label="Content"
                            multiline
                            rows={isMobile ? 3 : 4}
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            margin="normal"
                            size={isMobile ? "small" : "medium"}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddNote}
                            sx={{ mt: 2, width: isMobile ? '100%' : 'auto' }}
                        >
                            {editingNoteId !== null ? 'Update Note' : 'Add Note'}
                        </Button>
                    </Box>
                    <Grid container spacing={2} justifyContent="center">
                        {notes.map((note) => (
                            <Grid item xs={12} sm={6} md={4} key={note.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="div" noWrap>
                                            {note.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                        }}>
                                            {note.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton aria-label="edit" onClick={() => handleEditNote(note)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteNote(note.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
        </>
    );
}

export default TeacherNotes;
