import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import getMyWorkOrders from '@/api/getMyWorkOrders';

export const WorkOrder = () => {
  const [workOrders, setWorkOrders] = React.useState([]);

  React.useEffect(() => {
    getMyWorkOrders().then((responseData) => setWorkOrders(responseData));
  }, []);

  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      width: 90,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
  ];

  const rows = workOrders.map((workOrder) => {
    let statusString = '';
    if (workOrder.status === 0) {
      statusString = 'Not Started';
    } else if (workOrder.status === 1) {
      statusString = 'In Progress';
    } else if (workOrder.status === 2) {
      statusString = 'Stalled';
    } else if (workOrder.status === 3) {
      statusString = 'Complete';
    }

    return {
      id: workOrder.id,
      subject: workOrder.subject,
      status: statusString,
    };
  });

  return (
    <Card
      sx={{ minHeight: 400, minWidth: 600 }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h6">Work Orders</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </CardContent>
    </Card>
  );
};

export default WorkOrder;
