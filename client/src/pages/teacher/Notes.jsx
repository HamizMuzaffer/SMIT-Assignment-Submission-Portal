import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/teacher/teacherSlice';
import MiniDrawer from '../../components/Drawer';
import { fetchNotes, addNote, updateNote, deleteNote } from '../../features/notes/notesSlice';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';
import { Typography, Container, TextField, Button, Grid, Card, CardContent, CardActions, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../App.css';

const drawerWidth = 240;

function TeacherNotes() {
    useTeacherAuthRedirect()
    const dispatch = useDispatch();
    const teacherInfo = useSelector((state) => state.teacher.info);
    const notes = useSelector((state) => state.notes.notes);
    const status = useSelector((state) => state.notes.status);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [open, setOpen] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'idle' && teacherInfo) {
            console.log('Fetching notes for user:', teacherInfo._id);
            dispatch(fetchNotes(teacherInfo._id));
            console.log(notes.length)
        }
    }, [status, teacherInfo]);


    const handleAddOrUpdateNote = () => {
        if (newNote.title && newNote.content) {
            const noteWithUser = { ...newNote, userId: teacherInfo._id };
            if (editingNoteId !== null) {
                dispatch(updateNote({
                    id: editingNoteId,
                    note: noteWithUser,
                }));
                setEditingNoteId(null);
            } else {
                dispatch(addNote(noteWithUser));
            }
            setNewNote({ title: '', content: '' });
        }
    };

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id));
    };

    const handleEditNote = (note) => {
        setNewNote({ title: note.title, content: note.content });
        setEditingNoteId(note._id);
    };
    return (
        <>        <MiniDrawer teacherInfo={teacherInfo} />
        <Box sx={{ display: 'flex', width : '100%' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    marginLeft: `-${drawerWidth}px`,
                    ...(open && {
                        transition: theme => theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        marginLeft: 0,
                    }),
                }}
            >
                <Container maxWidth="lg" sx={{
                    mt: 4,
                    mb: 4,
                    px: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
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
                            onClick={handleAddOrUpdateNote}
                            sx={{ mt: 2, width: isMobile ? '100%' : 'auto' }}
                        >
                            {editingNoteId !== null ? 'Update Note' : 'Add Note'}
                        </Button>
                    </Box>
                        {notes.length > 0 ? (
                            notes.filter((note)=> note?.userId === teacherInfo._id).map((note) => (
                                <Grid container spacing={2} justifyContent="center" key={note._id}>

                                <Grid item xs={12} sm={6} md={4} key={note?._id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" component="div" noWrap>
                                                {note?.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                            }}>
                                                {note?.content}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton  aria-label="edit" onClick={() => handleEditNote(note)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleDeleteNote(note._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                                    </Grid>

                            ))
                        ) : (
                            <Typography variant="h6" align="center" color="text.secondary">
                                No notes available
                            </Typography>
                        )}

                </Container>
            </Box>
        </Box>
        </>

    );
}

export default TeacherNotes;
