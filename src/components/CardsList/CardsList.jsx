// eslint-disable-next-line no-unused-vars
import React from 'react';
import './CardsList.css';
import PropTypes from 'prop-types';

import Card from '../Card';

const CardsList = ({ cards, disabledStar }) => {
  let cardsList = null;

  const addCard = (card) => <Card key={card.id} disabledStar={disabledStar} {...card} />;
  if (cards.length) {
    cardsList = cards.map((card) => {
      return addCard(card);
    });
  }

  return <div className="cards__list">{cardsList}</div>;
};

CardsList.defaultProps = {
  cards: null,
  disabledStar: PropTypes.bool,
};

CardsList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  disabledStar: PropTypes.bool,
};

export default CardsList;
