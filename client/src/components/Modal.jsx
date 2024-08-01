import React, { useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Snackbar,
    Alert
} from '@mui/material';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalComponent = ({ open, handleClose,onSubmit }) => {
    // States Initialize

    const steps = ['Title & Description', 'Due Date', 'File Upload'];
    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(dayjs());
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);


    // To handle Validation 
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [fileError, setFileError] = useState(false);

    const handleNext = () => {
        if (activeStep === 0) {
            setTitleError(!title);
            setDescriptionError(!description);
            if (!title || !description) return;
          }
          if (activeStep === 2) {
            setFileError(!file);
            if (!file) return;
          }
        if (activeStep < steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else { 
            onSubmit({ title, description, dueDate, file });
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setAlertOpen(true);
                setActiveStep(0);
                setTitle('');
                setDescription('');
                setDueDate(dayjs());
                setFile(null);
                handleClose();
            }, 1000);
            console.log({ title, description, dueDate, file});
            handleClose();
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileError(false);
      };
    
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Post Assignment
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ mt: 2, mb: 2 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 && (
                        <>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setTitleError(false);
                                  }}
                                error = {titleError}  
                                helperText={titleError && "Title is required"}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    setDescriptionError(false)
                                }}
                                error = {descriptionError}
                                helperText={descriptionError && "Description is required"}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}
                    {activeStep === 1 && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Due Date"
                                inputFormat="MM/DD/YYYY"
                                value={dueDate}
                                sx={{ width: '100%' }}
                                onChange={(newValue) => setDueDate(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    )}
                    {activeStep === 2 && (
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Upload File
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Assignment posted successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ModalComponent;
