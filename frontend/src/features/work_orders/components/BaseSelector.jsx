import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

import getBases from '@/api/getBases';

export const BaseSelector = ({ disabled, baseId, onSelectionChanged }) => {
  const [bases, setBases] = React.useState([]);

  React.useEffect(() => {
    getBases().then((responseData) => setBases(responseData));
  }, []);

  return (
    <Select
      label="Base"
      value={baseId}
      disabled={disabled}
      onChange={(event) => { onSelectionChanged(event.target.value); }}
    >
      <MenuItem disabled value={0}><em>Please select a base...</em></MenuItem>
      {bases.map((base) => (<MenuItem value={base.id}>{base.name}</MenuItem>))}
    </Select>
  );
};

BaseSelector.propTypes = {
  disabled: PropTypes.bool,
  baseId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

BaseSelector.defaultProps = {
  disabled: false,
  baseId: 0,
  onSelectionChanged: () => {},
};

export default BaseSelector;
