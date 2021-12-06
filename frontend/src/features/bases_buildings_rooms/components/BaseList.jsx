import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getBases from '@/api/getBases';

export const BaseList = ({ baseId, onSelectionChanged }) => {
  const [bases, setBases] = React.useState([]);

  React.useEffect(() => {
    getBases().then((responseData) => setBases(responseData));
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
  ];

  const rows = bases.map((base) => (
    {
      id: base.id,
      name: base.name,
    }
  ));

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        value={baseId}
        onSelectionModelChange={(selection) => {
          onSelectionChanged(selection.length > 0 ? selection[0] : 0);
        }}
        disableMultipleSelection
      />
    </Box>
  );
};

BaseList.propTypes = {
  baseId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

BaseList.defaultProps = {
  baseId: 0,
  onSelectionChanged: () => {},
};

export default BaseList;
