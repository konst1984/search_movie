import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './SearchLine.css';

export default class SearchLine extends PureComponent {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  state = {
    search: '',
  };

  searchRequest = (e) => {
    this.setState({ search: e.target.value }, () => this.props.onSearch(this.state.search));
  };

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
    return (
      <>
        <Input
          placeholder="Type to search..."
          onChange={debounce((e) => this.searchRequest(e), 500)}
          ref={this.searchRef}
        />
      </>
    );
  }
}
