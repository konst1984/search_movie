// eslint-disable-next-line import/order
import React from 'react';

import './Card.css';
import 'antd/dist/antd.min.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import MyContext from '../ApiContext/ApiContext';

import Rating from './Rating';
import Genre from './Genre';
import RatingStars from './RatingStars';

export default class Card extends React.Component {
  static defaultProps = {
    vote: 0,
    describe: 'Not found description',
    disabledStar: false,
  };

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
    genre: PropTypes.array,
    vote: PropTypes.number,
    describe: PropTypes.string,
    disabledStar: PropTypes.bool,
    poster: PropTypes.string,
  };

  cropText = (text, cropNumber) => {
    return text.length < cropNumber || text.indexOf(' ', cropNumber) === -1
      ? text.trim()
      : text.substring(0, text.indexOf(' ', cropNumber)).trim() + ' ...';
  };

  render() {
    const { poster, vote, title, date, genre, id, disabledStar, describe } = this.props;
    const dateRelease = date ? format(new Date(date), 'MMMM d, yyyy') : null;
    return (
      <div className="card">
        <div className="card__image">
          {poster ? (
            <img className="img" src={`https://image.tmdb.org/t/p/w154${poster}`} alt="Poster" />
          ) : (
            <div className="img img_false">Picture not found</div>
          )}
        </div>
        <Rating vote={vote} />
        <h2 className="card__title">{title}</h2>
        <div className="release-date">{dateRelease}</div>
        <MyContext.Consumer>{({ genreData }) => <Genre genre={genre} genreData={genreData} />}</MyContext.Consumer>
        <div className="describe">{this.cropText(describe, 150)}</div>
        <RatingStars vote={vote} id={id} disabledStar={disabledStar} />
      </div>
    );
  }
}
