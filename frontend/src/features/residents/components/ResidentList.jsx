import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getPersonnelInMyBase from '@/api/getPersonnelInMyBase';

export const ResidentList = ({ onSelectionChange }) => {
  const [residents, setResidents] = React.useState([]);

  React.useEffect(() => {
    if (residents.length === 0) {
      getPersonnelInMyBase().then((responseData) => setResidents(responseData));
    }
  });

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 350 },
  ];

  const rows = residents.map((resident) => (
    {
      id: resident.id,
      rank: resident.rank,
      name: `
        ${resident.first_name}
        ${resident.middle_name}
        ${resident.last_name}
      `,
      email: resident.email,
    }
  ));

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
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

ResidentList.propTypes = {
  onSelectionChange: PropTypes.func,
};

ResidentList.defaultProps = {
  onSelectionChange: () => {},
};

export default ResidentList;
