import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export const Inspection = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Inspections</Typography>
    </CardContent>
  </Card>
);

export default Inspection;
