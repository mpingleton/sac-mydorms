import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

import getPersonnelAssignedToBase from '@/api/getPersonnelAssignedToBase';

export const PersonnelSelector = ({ disabled, baseId, personnelId, onSelectionChanged }) => {
  const [personnel, setPersonnel] = React.useState([]);

  React.useEffect(() => {
    getPersonnelAssignedToBase(baseId)
      .then((responseData) => setPersonnel(responseData));
  }, [baseId]);

  return (
    <Select
      label="Personnel"
      value={personnelId}
      disabled={disabled || baseId <= 0}
      onChange={(event) => { onSelectionChanged(event.target.value); }}
    >
      <MenuItem disabled value={0}><em>{baseId > 0 ? 'Please select a person...' : ''}</em></MenuItem>
      {personnel.map((person) => (
        <MenuItem value={person.id}>
          {`${person.rank} ${person.first_name} ${person.middle_name} ${person.last_name}`}
        </MenuItem>
      ))}
    </Select>
  );
};

PersonnelSelector.propTypes = {
  disabled: PropTypes.bool,
  baseId: PropTypes.number,
  personnelId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

PersonnelSelector.defaultProps = {
  disabled: false,
  baseId: 0,
  personnelId: 0,
  onSelectionChanged: () => {},
};

export default PersonnelSelector;
