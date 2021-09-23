import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export const Head = ({ title = '', description = '' } = {}) => (
  <Helmet
    title={title ? `${title} | Striker Airmen Coders` : undefined}
    defaultTitle="Striker Airmen Coders"
  >
    <meta name="description" content={description} />
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Head.defaultProps = {
  title: '',
  description: '',
};

export default Head;
