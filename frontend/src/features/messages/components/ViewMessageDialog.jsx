import React from 'react';
import PropTypes from 'prop-types';

import { Button, Stack, Box, Modal, Typography } from '@mui/material';

import getMessageById from '@/api/getMessageById';

const style = {
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

export const ViewMessageDialog = ({ modalOpen, onClose, messageId }) => {
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    if (messageId > 0) {
      getMessageById(messageId).then((data) => setMessage(data));
    }
  }, [messageId]);

  if (message.id === undefined) {
    return null;
  }

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h5">{message.subject}</Typography>
          <Typography>
            {`
              To:
              ${message.recipientObject.rank}
              ${message.recipientObject.first_name}
              ${message.recipientObject.last_name}
            `}
          </Typography>
          <Typography>
            {`
              From:
              ${message.senderObject.rank}
              ${message.senderObject.first_name}
              ${message.senderObject.last_name}
            `}
          </Typography>
          <Typography>
            {`
              Sent:
              ${new Date(message.timestamp).toLocaleString()}
            `}
          </Typography>
          <Typography
            sx={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#CCCCCC', padding: 1 }}
          >
            {message.body}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() => onClose()}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ViewMessageDialog.propTypes = {
  modalOpen: PropTypes.func,
  onClose: PropTypes.func,
  messageId: PropTypes.number,
};

ViewMessageDialog.defaultProps = {
  modalOpen: () => {},
  onClose: () => {},
  messageId: 0,
};

export default ViewMessageDialog;
