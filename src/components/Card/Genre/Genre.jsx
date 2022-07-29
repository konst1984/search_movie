import React from 'react';
import PropTypes from 'prop-types';
import './Genre.css';

export default class Genre extends React.Component {
  static propTypes = {
    genre: PropTypes.array,
    genreData: PropTypes.array,
  };

  state = {
    data: [],
  };

  componentDidMount() {
    this.addGenreInItem(this.props.genreData, this.props.genre);
  }

  addGenreInItem = (arr, prop) => {
    const data = prop.map((num) => {
      return arr.reduce((acc, item) => {
        return item.id === num ? (acc, item.name) : acc;
      }, []);
    });
    this.setState({
      data,
    });
  };

  addItem = (arr) => {
    return arr.map((item, index) => (
      <span key={index} className="genre__item">
        {item}
      </span>
    ));
  };

  render() {
    return <div className="genre">{this.state.data ? this.addItem(this.state.data) : null}</div>;
  }
}
