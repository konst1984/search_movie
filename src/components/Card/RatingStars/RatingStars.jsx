// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import MyContext from '../../ApiContext/ApiContext';

export default class RatingStars extends React.Component {
  state = {
    disabled: false,
  };

  checkDisabled = (value, id, callback) => {
    callback(value, id);
    this.setState({ disabled: true });
  };

  static defaultProps = {
    vote: 0,
    disabledStar: false,
  };

  static propTypes = {
    id: PropTypes.number,
    vote: PropTypes.number,
    disabledStar: PropTypes.bool,
  };

  render() {
    const { vote, id, disabledStar } = this.props;

    return (
      <MyContext.Consumer>
        {({ onRate }) => (
          <Rate
            allowHalf
            className="stars-rate"
            count={10}
            value={vote}
            onChange={(value) => this.checkDisabled(value, id, onRate)}
            disabled={this.state.disabled || disabledStar}
          />
        )}
      </MyContext.Consumer>
    );
  }
}
