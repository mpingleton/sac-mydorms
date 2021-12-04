import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import getUpcomingEvents from '@/api/getUpcomingEvents';

export const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getUpcomingEvents().then((responseData) => setEvents(responseData));
  }, []);

  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      width: 200,
    },
    {
      field: 'scheduled',
      headerName: 'Date',
      width: 90,
    },
  ];

  const rows = events.map((evnt) => ({
    id: evnt.id,
    subject: evnt.subject,
    scheduled: evnt.scheduled.toString(),
  }));

  return (
    <Card
      sx={{ minHeight: 400, minWidth: 600 }}
      variant="outlined"
    >
      <CardContent>
        <Typography>Events</Typography>
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

export default Events;
