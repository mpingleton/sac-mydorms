import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

import getBuildingsByBase from '../../../api/getBuildingsByBase';

export const BuildingSelector = ({ disabled, baseId, buildingId, onSelectionChanged }) => {
  const [buildings, setBuildings] = React.useState([]);

  React.useEffect(() => {
    getBuildingsByBase(baseId)
      .then((responseData) => setBuildings(responseData));
  }, [baseId]);

  return (
    <Select
      label="Building"
      value={buildingId}
      disabled={disabled || baseId <= 0}
      onChange={(event) => { onSelectionChanged(event.target.value); }}
    >
      <MenuItem disabled value={0}><em>{baseId > 0 ? 'Please select a building...' : ''}</em></MenuItem>
      {buildings.map((building) => (<MenuItem value={building.id}>{`${building.building_number}: ${building.building_name}`}</MenuItem>))}
    </Select>
  );
};

BuildingSelector.propTypes = {
  disabled: PropTypes.bool,
  baseId: PropTypes.number,
  buildingId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

BuildingSelector.defaultProps = {
  disabled: false,
  baseId: 0,
  buildingId: 0,
  onSelectionChanged: () => {},
};

export default BuildingSelector;
