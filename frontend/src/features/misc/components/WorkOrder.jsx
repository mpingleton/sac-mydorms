import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export const WorkOrder = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Work Orders</Typography>
    </CardContent>
  </Card>
);

export default WorkOrder;
