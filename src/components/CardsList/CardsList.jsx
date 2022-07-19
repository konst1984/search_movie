// eslint-disable-next-line no-unused-vars
import React from 'react';
import './CardsList.css';
import PropTypes from 'prop-types';

import Card from '../Card';

const CardsList = ({ cards, disabledStar }) => {
  let cardsList = null;

  const addCard = (item) => (
    <Card
      key={item.id}
      poster={item.poster}
      vote={item.vote}
      id={item.id}
      genre={item.genre}
      title={item.title}
      date={item.date}
      describe={item.describe}
      disabledStar={disabledStar}
    />
  );

  if (cards.length) {
    cardsList = cards.map((item) => {
      return addCard(item);
    });
  }

  return <div className="cards__list cards__list--margin">{cardsList}</div>;
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
