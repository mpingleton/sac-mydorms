import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getBuildingsByBase from '@/api/getBuildingsByBase';

export const BuildingList = ({ baseId, buildingId, onSelectionChanged }) => {
  const [buildings, setBuildings] = React.useState([]);

  React.useEffect(() => {
    getBuildingsByBase(baseId).then((responseData) => setBuildings(responseData));
  }, [baseId]);

  const columns = [
    { field: 'number', headerName: 'number', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
  ];

  const rows = buildings.map((building) => (
    {
      id: building.id,
      number: building.building_number,
      name: building.building_name,
    }
  ));

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        value={buildingId}
        onSelectionModelChange={(selection) => {
          onSelectionChanged(selection.length > 0 ? selection[0] : 0);
        }}
        disableMultipleSelection
      />
    </Box>
  );
};

BuildingList.propTypes = {
  baseId: PropTypes.number,
  buildingId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

BuildingList.defaultProps = {
  baseId: 0,
  buildingId: 0,
  onSelectionChanged: () => {},
};

export default BuildingList;
