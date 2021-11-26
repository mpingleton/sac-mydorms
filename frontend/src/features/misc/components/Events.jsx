import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

export const Events = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Events</Typography>
      <Button variant="contained">
        Forth card
      </Button>
    </CardContent>
  </Card>
);

export default Events;
