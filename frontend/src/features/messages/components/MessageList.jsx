import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getMessages from '@/api/getMessages';

export const MessageList = ({ onSelectionChange }) => {
  const [messageList, setMessageList] = React.useState([]);

  React.useEffect(() => {
    getMessages().then((data) => setMessageList(data));
  }, []);

  const columns = [
    { field: 'time', headerName: 'Date/Time', width: 150 },
    { field: 'from', headerName: 'From', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 450 },
  ];

  const rows = messageList.map((message) => (
    {
      id: message.id,
      time: new Date(message.timestamp).toLocaleString(),
      from: `
        ${message.senderObject.rank}
        ${message.senderObject.first_name}
        ${message.senderObject.last_name}
      `,
      subject: message.subject,
    }
  ));

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={onSelectionChange}
        disableMultipleSelection
      />
    </Box>
  );
};

MessageList.propTypes = {
  onSelectionChange: PropTypes.func,
};

MessageList.defaultProps = {
  onSelectionChange: () => {},
};

export default MessageList;
