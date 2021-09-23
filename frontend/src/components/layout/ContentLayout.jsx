import React from 'react';
import PropTypes from 'prop-types';

import { Head } from '@/components/elements/Head';

export const ContentLayout = ({ children, title }) => (
  <>
    <Head title={title} />
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  </>
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
