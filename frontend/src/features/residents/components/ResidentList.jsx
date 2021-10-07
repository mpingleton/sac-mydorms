import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getResidents from '../api/getResidents';

export const ResidentList = ({ onSelectionChange }) => {
  const [residents, setResidents] = React.useState([]);

  React.useEffect(() => {
    if (residents.length === 0) {
      getResidents().then((responseData) => setResidents(responseData));
    }
  });

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'middle_name', headerName: 'Middle Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 350 },
  ];

  const rows = residents.map((resident) => (
    {
      id: resident.id,
      rank: resident.rank,
      first_name: resident.first_name,
      middle_name: resident.middle_name,
      last_name: resident.last_name,
      email: resident.email,
    }
  ));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={onSelectionChange}
        disableMultipleSelection
      />
    </Box>
  );
};

ResidentList.propTypes = {
  onSelectionChange: PropTypes.func,
};

ResidentList.defaultProps = {
  onSelectionChange: () => {},
};

export default ResidentList;
