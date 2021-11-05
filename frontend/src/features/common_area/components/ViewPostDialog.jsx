import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

import {
  Box,
  Modal,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import getCommentsByPost from '../api/getCommentsByPost';
import createComment from '../api/createComment';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ViewPostDialog = ({ postObject, modalOpen, onClose }) => {
  const [comments, setComments] = React.useState([]);
  const [resNewComment, setNewComment] = React.useState('');

  React.useEffect(() => {
    getCommentsByPost(postObject.id).then((responseData) => setComments(responseData));
  }, [postObject.id]);

  const submitComment = () => {
    createComment({
      post_id: postObject.id,
      text: resNewComment,
    }).then(() => {
      setNewComment('');
      getCommentsByPost(postObject.id).then((responseData) => setComments(responseData));
    });
  };

  const columns = [
    { field: 'commenter', headerName: 'Commenter', width: 100 },
    { field: 'text', headerName: 'Text', width: 390 },
    { field: 'timestamp', headerName: 'TimeStamp', width: 100 },
  ];

  const rows = comments.map((comment) => (
    {
      id: comment.id,
      commenter: `${comment.personnelObject.rank} ${comment.personnelObject.first_name} ${comment.personnelObject.last_name}`,
      text: comment.text,
      timestamp: comment.timestamp,
    }
  ));

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h6">{postObject.header}</Typography>
          <Typography>{postObject.postBody}</Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={20}
              rowHeight={52}
              rowsPerPageOptions={[5]}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <TextField
              id="filled-basic"
              label="Comment"
              variant="standard"
              fullWidth="100"
              value={resNewComment}
              onChange={(event) => { setNewComment(event.target.value); }}
              error={resNewComment.length > 1000}
            />
            <Button
              variant="contained"
              onClick={submitComment}
              disabled={resNewComment.length <= 0 || resNewComment.length > 1000}
            >
              Send
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ViewPostDialog.propTypes = {
  postObject: PropTypes.shape({
    id: PropTypes.number,
    header: PropTypes.string,
    postBody: PropTypes.string,
  }),
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ViewPostDialog.defaultProps = {
  postObject: { id: 0, header: 'Loading...', postBody: 'Loading content...' },
  modalOpen: false,
  onClose: () => {},
};

export default ViewPostDialog;
