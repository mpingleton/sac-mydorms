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

const rows = [
  { id: 1, User: 'Hello', Comment: 'World' },
  { id: 2, User: 'DataGridPro', Comment: 'is Awesome' },
  { id: 3, User: 'MUI', Comment: 'is Amazing' },
];

const columns = [
  { field: 'User', headerName: 'User', width: 100 },
  { field: 'Comment', headerName: 'Comment', width: 390 },
  { field: 'TimeStamp', headerName: 'TimeStamp', width: 100 },
];

export const ViewPostDialog = ({ postObject, modalOpen, onClose }) => {
  const [resPost, setPost] = React.useState('');

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h9" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{postObject.header}</Typography>
          <Typography variant="h5" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{postObject.postBody}</Typography>
          <Box sx={{ width: '100%', height: 200 }}>
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
              variant="filled"
              label="Comment"
              fullWidth="100"
              onChange={(event) => { setPost(event.target.value); }}
              error={resPost.length > 1000}
            />
            <Button
              variant="contained"
              onClick={onClose}
              disabled={resPost.length <= 0 || resPost.length > 1000}
            >
              Comment
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
