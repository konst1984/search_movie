// eslint-disable-next-line no-unused-vars
import React from 'react';
import './CardsList.css';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

import Card from '../Card';

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
