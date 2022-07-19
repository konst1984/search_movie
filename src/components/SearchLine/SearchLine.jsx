// eslint-disable-next-line no-unused-vars
import React, { createRef } from 'react';
import debounce from 'lodash.debounce';
import { Input } from 'antd';
import PropTypes from 'prop-types';

export default class SearchLine extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }
  componentDidMount() {
    this.searchRef.current.focus();
  }

  static defaultProps = {
    onSearch: () => {},
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  render() {
    const { onSearch } = this.props;
    return (
      <>
        <Input placeholder="Type to search..." onChange={debounce(onSearch, 500)} ref={this.searchRef} />
      </>
    );
  }
}
