import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export const Events = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Events</Typography>
    </CardContent>
  </Card>
);

export default Events;
