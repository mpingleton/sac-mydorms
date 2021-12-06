import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getPersonnel from '@/api/getPersonnel';
import getPersonnelInMyBase from '@/api/getPersonnelInMyBase';
import getPersonnelAssignedToBase from '@/api/getPersonnelAssignedToBase';

export const ResidentList = ({ listType, baseId, onSelectionChange }) => {
  const [residents, setResidents] = React.useState([]);

  React.useEffect(() => {
    if (listType === 'all') {
      getPersonnel().then((responseData) => setResidents(responseData));
    } else if (listType === 'mybase') {
      getPersonnelInMyBase().then((responseData) => setResidents(responseData));
    } else if (listType === 'base') {
      if (baseId > 0) {
        getPersonnelAssignedToBase(baseId).then((responseData) => setResidents(responseData));
      } else {
        setResidents([]);
      }
    } else {
      setResidents([]);
    }
  }, [listType, baseId]);

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
  listType: PropTypes.string,
  baseId: PropTypes.number,
  onSelectionChange: PropTypes.func,
};

ResidentList.defaultProps = {
  listType: 'all',
  baseId: 0,
  onSelectionChange: () => {},
};

export default ResidentList;
