import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@mui/material';

import getMyWorkOrders from '@/api/getMyWorkOrders';

export const WorkOrder = () => {
  const [workOrders, setWorkOrders] = React.useState([]);

  React.useEffect(() => {
    getMyWorkOrders().then((responseData) => setWorkOrders(responseData));
  }, []);

  const statusString = (workOrder) => {
    let r = '';
    if (workOrder.status === 0) {
      r = 'Not Started';
    } else if (workOrder.status === 1) {
      r = 'In Progress';
    } else if (workOrder.status === 2) {
      r = 'Stalled';
    } else if (workOrder.status === 3) {
      r = 'Complete';
    }
    return r;
  };

  return (
    <Card
      sx={{ minHeight: 400, minWidth: 600 }}
      variant="outlined"
    >
      <CardContent>
        <Stack
          direction="column"
          spacing={1}
        >
          <Typography variant="h6">Work Orders</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workOrders.map((workOrder) => (
                <TableRow>
                  <TableCell>{workOrder.subject}</TableCell>
                  <TableCell>{statusString(workOrder)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WorkOrder;
