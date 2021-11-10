import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getMessages from '../api/getMessages';

export const MessageList = () => {
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
      from: message.sender_id,
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
        disableMultipleSelection
      />
    </Box>
  );
};

export default MessageList;
