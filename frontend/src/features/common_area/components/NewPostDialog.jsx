import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Modal,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import createPost from '@/api/createPost';

const Joi = require('joi');

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

export const NewPostDialog = ({ modalOpen, onClose }) => {
  const [resPost, setPost] = React.useState('');

  const postValidation = Joi.string().min(1).max(1000).required()
    .validate(resPost);

  const submitPost = () => {
    createPost({
      text: resPost,
    }).then(() => { onClose(); });
  };

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography
            variant="h6"
            color="text.primary"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            New Post
          </Typography>
          <TextField
            label={`Begin typing here: (${resPost.length}/1000)`}
            multiline
            rows={4}
            onChange={(event) => { setPost(event.target.value); }}
            error={postValidation.error && resPost.length > 0}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={submitPost}
              disabled={postValidation.error}
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

NewPostDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewPostDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewPostDialog;
