import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import getMyRoomInspections from '@/api/getMyRoomInspections';

export const Inspection = () => {
  const [inspections, setInspections] = React.useState([]);

  React.useEffect(() => {
    getMyRoomInspections().then((responseData) => setInspections(responseData));
  }, []);

  const columns = [
    {
      field: 'inspector',
      headerName: 'Inspector',
      width: 150,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 150,
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 300,
    },
  ];

  const rows = inspections.map((inspection) => ({
    id: inspection.id,
    inspector: inspection.inspector_name,
    time: inspection.timestamp,
    remarks: inspection.inspector_remarks,
  }));

  return (
    <Card
      sx={{ minHeight: 400, minWidth: 600 }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h6">Inspections</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </CardContent>
    </Card>
  );
};

export default Inspection;
