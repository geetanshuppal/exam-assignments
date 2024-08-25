import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Grid, TextField, MenuItem, Checkbox, FormControlLabel, Paper } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Select  
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import styles from './AddExam.module.css'; 
import ExamDetailsModal from './ExamDetailsModal';

const AddExam = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [examName, setExamName] = useState('');
  const [examDuration, setExamDuration] = useState('');
  const [questionPicking, setQuestionPicking] = useState('Auto');
  const [topics, setTopics] = useState([{ id: 1, topic: '', easy: '', medium: '', hard: '' }]);
  const [negativeMarking, setNegativeMarking] = useState(0);
  const [marks, setMarks] = useState({ easy: '', medium: '', hard: '' });
  const [passingScore, setPassingScore] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [captureImage, setCaptureImage] = useState(false);
  const [captureInterval, setCaptureInterval] = useState('');
  const [instructions, setInstructions] = useState('Default instructions...');
  const [errors, setErrors] = useState({});
  const steps = ['Basic Settings', 'Advanced Settings'];
  const dummyTopics = ["Math", "Science", "History", "Geography"]; 
  const [openModal, setOpenModal] = useState(false);


  const handleNext = () => {
    const validationErrors = {};
    if (!examName) validationErrors.examName = "Exam Name is required";
    if (!examDuration) validationErrors.examDuration = "Exam Duration is required";
    if (!questionPicking) validationErrors.questionPicking = "Question Picking is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveExam = () => {
    console.log({
      examName,
      examDuration,
      questionPicking,
      topics,
      negativeMarking,
      marks,
      passingScore,
      showRegistrationForm,
      captureImage,
      captureInterval,
      instructions,
    });
    setOpenModal(true);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTopicChange = (id, field, value) => {
    const updatedTopics = topics.map((topic) => {
      if (topic.id === id) {
        return { ...topic, [field]: value };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };

  const handleAddRow = () => {
    const newId = topics.length > 0 ? topics[topics.length - 1].id + 1 : 1;
    setTopics([...topics, { id: newId, topic: '', easy: '', medium: '', hard: '' }]);
  };

  const handleRemoveRow = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handlePercentageChange = (e, setStateCallback) => {
    let value = e.target.value;
    if (value === '' || parseInt(value, 10) < 0) {
      value = 0;
    } else if (parseInt(value, 10) > 100) {
      value = 100;
    }
    setStateCallback(value);
  };

  const renderBasicSettings = () => (
    <>
      <Grid className={styles.gridContainer} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Exam Name"
            variant="outlined"
            fullWidth
            required
            value={examName}
            onChange={(e) => {
              setErrors({})
              setExamName(e.target.value)}
            }
            error={!!errors.examName}
            className={styles.textField}
            helperText={errors.examName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Exam Duration (minutes)"
            variant="outlined"
            type="number"
            fullWidth
            required
            inputProps={{ min: 0 }}
            value={examDuration}
            onChange={(e) => {
              setErrors({})
              setExamDuration(e.target.value)}
            }
            error={!!errors.examDuration}
            helperText={errors.examDuration}
            className={styles.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            label="Question Picking"
            variant="outlined"
            fullWidth
            required
            value={questionPicking}
            onChange={(e) => setQuestionPicking(e.target.value)}
            className={styles.selectField}
          >
            <MenuItem defaultChecked value="Auto">Auto</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {questionPicking === 'Manual' && (
                <Paper className={styles.tableContainer} style={{ marginTop: 20, padding: 20 }}>
                <Typography className={styles.tableTitle}>Topic-wise Question Distribution</Typography>
                <TableContainer>
                  <Table className={styles.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Topic</TableCell>
                        <TableCell>Easy</TableCell>
                        <TableCell>Medium</TableCell>
                        <TableCell>Hard</TableCell>
                        <TableCell>Total Questions</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topics.map((topic) => (
                        <TableRow key={topic.id}>
                          <TableCell>
                            <Select
                              value={topic.topic}
                              onChange={(e) => handleTopicChange(topic.id, 'topic', e.target.value)}
                              fullWidth
                            >
                              {dummyTopics.map((t, index) => (
                                <MenuItem key={index} value={t}>
                                  {t}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0 }}
                              value={topic.easy}
                              onChange={(e) => handleTopicChange(topic.id, 'easy', e.target.value)}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0 }}
                              value={topic.medium}
                              onChange={(e) => handleTopicChange(topic.id, 'medium', e.target.value)}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0 }}
                              value={topic.hard}
                              onChange={(e) => handleTopicChange(topic.id, 'hard', e.target.value)}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            {parseInt(topic.easy || 0) + parseInt(topic.medium || 0) + parseInt(topic.hard || 0)}
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleRemoveRow(topic.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRow}
                  startIcon={<AddIcon />}
                  style={{ marginTop: 20 }}
                >
                  Add Topic
                </Button>
              </Paper>
      )}
    </>
  );

  const renderAdvancedSettings = () => (
    <>
      <Grid className={styles.gridContainer} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Negative Marking (%)"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={negativeMarking}
            inputProps={{ min: 0 , max: 100 }}
            onChange={(e) => handlePercentageChange(e,setNegativeMarking)}
            className={styles.textField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Minimum Passing Score (%)"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={passingScore}
            inputProps={{ min: 0 , max: 100 }}
            onChange={(e) => handlePercentageChange(e,setPassingScore)}
            className={styles.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Assign Marks</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Easy"
                variant="outlined"
                fullWidth
                value={marks.easy}
                onChange={(e) => setMarks({ ...marks, easy: e.target.value })}
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Medium"
                variant="outlined"
                fullWidth
                value={marks.medium}
                onChange={(e) => setMarks({ ...marks, medium: e.target.value })}
                className={styles.textField}

              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Hard"
                variant="outlined"
                fullWidth
                value={marks.hard}
                onChange={(e) => setMarks({ ...marks, hard: e.target.value })}
                className={styles.textField}

              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <FormControlLabel
            control={<Checkbox checked={showRegistrationForm} onChange={(e) => setShowRegistrationForm(e.target.checked)} />}
            label="Registration Form"
          />
          <FormControlLabel
            control={<Checkbox checked={captureImage} onChange={(e) => setCaptureImage(e.target.checked)} />}
            label="Capture image during the exam"
          />
          {captureImage && (
            <TextField
              label="Capture Interval (seconds)"
              variant="outlined"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={captureInterval}
              onChange={(e) => setCaptureInterval(e.target.value)}
              className={styles.textField}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography>Instructions</Typography>
          <ReactQuill value={instructions} onChange={setInstructions} />
        </Grid>
      </Grid>
    </>
  );

  return (
    <div className={styles.formContainer}>
      <Typography className={styles.formTitle} variant="h4" gutterBottom>Add Exam</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && renderBasicSettings()}
        {activeStep === 1 && renderAdvancedSettings()}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSaveExam}>
            Save Exam
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
      <ExamDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        examName={examName}
        examDuration={examDuration}
        questionPicking={questionPicking}
        topics={topics}
        negativeMarking={negativeMarking}
        marks={marks}
        passingScore={passingScore}
        showRegistrationForm={showRegistrationForm}
        captureImage={captureImage}
        captureInterval={captureInterval}
        instructions={instructions}
      />
    </div>
  );
};

export default AddExam;
