import React from 'react';

import { Alert } from 'antd';
import PropTypes from 'prop-types';

import Card from '../Card';
import './CardsList.css';

const CardsList = ({ cards, disabledStar }) => {
  const addCard = (card) => <Card key={card.id} disabledStar={disabledStar} {...card} />;

  return (
    <div className="cards__list">
      {cards.length ? (
        cards.map((card) => {
          return addCard(card);
        })
      ) : (
        <Alert showIcon={false} message="Movies matching your search were not found" banner />
      )}
    </div>
  );
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
