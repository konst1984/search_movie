// eslint-disable-next-line import/order
import React from 'react';
import 'antd/dist/antd.min.css';

import { Alert } from 'antd';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import PageContent from '../PageContent';

export default class Page extends React.Component {
  static defaultProps = {
    cards: null,
    searchValue: null,
    disabledStar: false,
    onSwitchPage: () => {},
  };

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    currentPage: PropTypes.number,
    moviePerPage: PropTypes.number,
    searchValue: PropTypes.string,
    totalPages: PropTypes.number,
    disabledStar: PropTypes.bool,
    countPagination: PropTypes.number,
    onSwitchPage: PropTypes.func,
    searchLine: PropTypes.object,
  };

  render() {
    const {
      cards,
      isLoading,
      hasError,
      moviePerPage,
      searchValue,
      totalPages,
      currentPage,
      countPagination,
      onSwitchPage,
      disabledStar,
      searchLine,
    } = this.props;

    const hasData = !(isLoading || hasError);
    const error = hasError ? (
      navigator.onLine ? (
        <Alert className="" message="Error:" showIcon={false} description="Data error" type="error" banner />
      ) : (
        <Alert
          showIcon={false}
          message="No internet connection"
          description="You need pay for internet as soon as possible"
          banner
        />
      )
    ) : null;

    let emptyRequest =
      searchValue && cards.length === 0 ? (
        <Alert showIcon={false} message="Movies matching your search were not found" banner />
      ) : null;

    return (
      <>
        {searchLine || null}
        <PageContent
          emptyRequest={emptyRequest}
          hasData={hasData}
          error={error}
          moviePerPage={moviePerPage}
          currentPage={currentPage}
          searchValue={searchValue}
          cards={cards}
          totalPages={totalPages}
          countPagination={countPagination}
          onSwitchPage={onSwitchPage}
          disabledStar={disabledStar}
        />
      </>
    );
  }
}
