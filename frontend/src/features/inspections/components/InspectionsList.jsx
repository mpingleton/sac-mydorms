import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getRoomInspections from '@/api/getRoomInspections';
import getRoomInspectionsCreatedByMe from '@/api/getRoomInspectionsCreatedByMe';
import getRoomInspectionsForResident from '@/api/getRoomInspectionsForResident';
import getRoomInspectionsForRoom from '@/api/getRoomInspectionsForRoom';

export const InspectionsList = ({
  listType,
  baseId,
  buildingId,
  roomId,
  personnelId,
  onSelectionChange,
}) => {
  const [roomInspections, setRoomInspections] = React.useState([]);

  React.useEffect(() => {
    if (listType === 'all') {
      getRoomInspections().then((responseData) => setRoomInspections(responseData));
    } else if (listType === 'byme') {
      getRoomInspectionsCreatedByMe()
        .then((responseData) => setRoomInspections(responseData));
    } else if (listType === 'inroom') {
      getRoomInspectionsForRoom(roomId)
        .then((responseData) => setRoomInspections(responseData));
    } else if (listType === 'inresident') {
      getRoomInspectionsForResident(personnelId)
        .then((responseData) => setRoomInspections(responseData));
    } else {
      setRoomInspections([]);
    }
  }, [listType, baseId, buildingId, roomId, personnelId]);

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'resident', headerName: 'Resident', width: 200 },
    { field: 'dorm_manager', headerName: 'Dorm Manager', width: 200 },
    { field: 'inspector', headerName: 'Inspector', width: 200 },
  ];

  const rows = roomInspections.map((inspection) => (
    {
      id: inspection.id,
      date: new Date(inspection.timestamp).toLocaleString(),
      room: inspection.roomObject.room_number,
      resident: `
        ${inspection.residentPersonnelObject.rank}
        ${inspection.residentPersonnelObject.last_name},
        ${inspection.residentPersonnelObject.first_name}
      `,
      dorm_manager: `
        ${inspection.dormManagerPersonnelObject.rank}
        ${inspection.dormManagerPersonnelObject.last_name},
        ${inspection.dormManagerPersonnelObject.first_name}
      `,
      inspector: inspection.inspector_name,
    }
  ));

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
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
  listType: PropTypes.string,
  baseId: PropTypes.number,
  buildingId: PropTypes.number,
  roomId: PropTypes.number,
  personnelId: PropTypes.number,
  onSelectionChange: PropTypes.func,
};

InspectionsList.defaultProps = {
  listType: 'all',
  baseId: 0,
  buildingId: 0,
  roomId: 0,
  personnelId: 0,
  onSelectionChange: () => {},
};

export default InspectionsList;
