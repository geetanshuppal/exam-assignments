import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

const ExamDetailsModal = ({
  open,
  onClose,
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
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Exam Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1"><strong>Exam Name:</strong> {examName}</Typography>
        <Typography variant="body1"><strong>Exam Duration:</strong> {examDuration} minutes</Typography>
        <Typography variant="body1"><strong>Question Picking:</strong> {questionPicking}</Typography>
        <Typography variant="body1"><strong>Topics:</strong> {JSON.stringify(topics)}</Typography>
        <Typography variant="body1"><strong>Negative Marking (%):</strong> {negativeMarking}</Typography>
        <Typography variant="body1"><strong>Marks:</strong> Easy: {marks.easy}, Medium: {marks.medium}, Hard: {marks.hard}</Typography>
        <Typography variant="body1"><strong>Minimum Passing Score (%):</strong> {passingScore}</Typography>
        <Typography variant="body1"><strong>Show Registration Form:</strong> {showRegistrationForm ? 'Yes' : 'No'}</Typography>
        <Typography variant="body1"><strong>Capture Image:</strong> {captureImage ? 'Yes' : 'No'}</Typography>
        {captureImage && (
          <Typography variant="body1"><strong>Capture Interval (seconds):</strong> {captureInterval}</Typography>
        )}
        <Typography variant="body1"><strong>Instructions:</strong> {instructions}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamDetailsModal;
