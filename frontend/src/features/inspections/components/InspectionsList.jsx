import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getRoomInspections from '../api/getRoomInspections';

export const InspectionsList = ({ onSelectionChange }) => {
  const [roomInspections, setRoomInspections] = React.useState([]);

  React.useEffect(() => {
    if (roomInspections.length === 0) {
      getRoomInspections().then((responseData) => setRoomInspections(responseData));
    }
  });

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'resident', headerName: 'Resident', width: 200 },
    { field: 'dorm_manager', headerName: 'Dorm Manager', width: 200 },
    { field: 'inspector', headerName: 'Inspector', width: 200 },
  ];

  const rows = roomInspections.map((inspection) => (
    {
      id: inspection.id,
      date: inspection.timestamp,
      room: inspection.room_id,
      resident: inspection.personnel_id,
      dorm_manager: inspection.dorm_manager_id,
      inspector: inspection.inspector_name,
    }
  ));

  return (
    <Box sx={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={onSelectionChange}
        disableMultipleSelection
      />
    </Box>
  );
};

InspectionsList.propTypes = {
  onSelectionChange: PropTypes.func,
};

InspectionsList.defaultProps = {
  onSelectionChange: () => {},
};

export default InspectionsList;
