import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

export const Inspection = () => (
  <Card
    sx={{ minHeight: 245, minWidth: 200 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Inspections</Typography>
      <Button variant="contained">
        Second card
      </Button>
    </CardContent>
  </Card>
);

export default Inspection;
