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

import getMyRoomInspections from '@/api/getMyRoomInspections';

export const Inspection = () => {
  const [inspections, setInspections] = React.useState([]);

  React.useEffect(() => {
    getMyRoomInspections().then((responseData) => setInspections(responseData));
  }, []);

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
          <Typography variant="h6">Inspections</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Inspector</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inspections.map((inspection) => (
                <TableRow>
                  <TableCell>{inspection.inspector_name}</TableCell>
                  <TableCell>{new Date(inspection.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{inspection.inspector_remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Inspection;
