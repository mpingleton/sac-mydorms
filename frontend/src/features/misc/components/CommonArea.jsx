import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export const CommonArea = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Common Area</Typography>
    </CardContent>
  </Card>
);

export default CommonArea;
