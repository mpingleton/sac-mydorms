import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

export const CommonArea = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Common Area</Typography>
      <Button variant="contained">
        Third card
      </Button>
    </CardContent>
  </Card>
);

export default CommonArea;
