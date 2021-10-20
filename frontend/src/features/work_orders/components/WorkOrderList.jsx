import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getWorkOrders from '../api/getWorkOrders';

export const WorkOrderList = ({ onSelectionChange }) => {
  const [workOrders, setWorkOrders] = React.useState([]);

  React.useEffect(() => {
    if (workOrders.length === 0) {
      getWorkOrders().then((responseData) => setWorkOrders(responseData));
    }
  });

  const columns = [
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'remarks', headerName: 'Creator Remarks', width: 300 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  const rows = workOrders.map((workOrder) => (
    {
      id: workOrder.id,
      room: workOrder.room_id,
      subject: workOrder.subject,
      remarks: workOrder.creator_remarks,
      status: workOrder.status,
    }
  ));

  return (
    <Box sx={{ height: '400px', width: '100%' }}>
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

WorkOrderList.propTypes = {
  onSelectionChange: PropTypes.func,
};

WorkOrderList.defaultProps = {
  onSelectionChange: () => {},
};

export default WorkOrderList;