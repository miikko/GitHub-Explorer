import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { GitHubProject } from '../../interfaces';
import RatingStars from '../RatingStars';

interface Props {
  /**
   * Determines whether this dialog is open
   */
  isOpen: boolean;
  /**
   * This handler is called when the dialog is supposed to close.
   */
  onClose: () => void;
  /**
   * This handler is called when a new project is ready to be submitted.
   */
  onSubmit: (proj: GitHubProject) => void;
}

const AddProjectDialog = (props: Props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [rating, setRating] = useState(3);

  const resetState = () => {
    setName('');
    setUrl('');
    setRating(3);
  };

  const handleSubmit = () => {
    const newProj = { name, url, rating, createdAt: new Date(), id: uuidv4() };
    props.onSubmit(newProj);
    resetState();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        resetState();
        props.onClose();
      }}
    >
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setName(e.target.value)}
          autoFocus
          label="Name"
        />
        <TextField
          onChange={(e) => setUrl(e.target.value)}
          label="GitHub URL"
        />
        <DialogContentText>Assign rating:</DialogContentText>
        <RatingStars
          id="new-project-rating"
          rating={rating}
          onClick={(index) => setRating(index + 1)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            resetState();
            props.onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!name || !url} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectDialog;
