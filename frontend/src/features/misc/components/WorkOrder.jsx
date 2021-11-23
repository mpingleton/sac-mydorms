import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

export const WorkOrder = () => (
  <Card
    sx={{ minHeight: 245, minWidth: 200 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Work Orders</Typography>
      <Button variant="contained">
        First card
      </Button>
    </CardContent>
  </Card>
);

export default WorkOrder;
