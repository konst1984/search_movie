// eslint-disable-next-line no-unused-vars,import/order
import React from 'react';

import './Rating.css';
import PropTypes from 'prop-types';

const Rating = ({ vote }) => {
  let color;
  if (vote < 3) {
    color = '#E90000';
  } else if (vote >= 3 && vote < 5) {
    color = '#E97E00';
  } else if (vote >= 5 && vote <= 7) {
    color = '#E9D100';
  } else color = '#66E900';

  return (
    <div className="rating-box" style={{ border: `2px solid ${color}` }}>
      <span>{vote}</span>
    </div>
  );
};

Rating.defaultProps = {
  vote: 0,
};

Rating.propTypes = {
  vote: PropTypes.number,
};

export default Rating;
