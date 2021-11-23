import React from 'react';
import PropTypes from 'prop-types';

import { Box, Stack, Typography } from '@mui/material';

import { Head } from '@/components/elements/Head';

export const ContentLayout = ({ children, title }) => (
  <Box sx={{ width: '100%', height: '100%' }}>
    <Head title={title} />
    <Stack direction="column" sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ width: '100%', height: '15px' }} />
      <Typography variant="h5" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>{title}</Typography>
      {children}
    </Stack>
  </Box>
);

ContentLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

ContentLayout.defaultProps = {
  title: '',
};

export default ContentLayout;
