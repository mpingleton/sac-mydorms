/* eslint-disable react/jsx-one-expression-per-line */

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

import getUpcomingEvents from '@/api/getUpcomingEvents';

export const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getUpcomingEvents().then((responseData) => setEvents(responseData));
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
          <Typography variant="h6">Events</Typography>
          <Typography>
            {
              `There ${events.length === 1 ? 'is' : 'are'} ${events.length} upcoming event${events.length === 1 ? '' : 's'}.`
            }
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((evnt) => (
                <TableRow>
                  <TableCell>{evnt.subject}</TableCell>
                  <TableCell>{new Date(evnt.scheduled).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Events;
