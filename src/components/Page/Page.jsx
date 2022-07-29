import React from 'react';
import 'antd/dist/antd.min.css';
import { Alert, Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';

import CardsList from '../CardsList';
import './Page.css';

export default class Page extends React.Component {
  static defaultProps = {
    cards: [],
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
    totalPages: PropTypes.number,
    disabledStar: PropTypes.bool,
    countPagination: PropTypes.number,
    onSwitchPage: PropTypes.func,
  };

  render() {
    const {
      cards,
      isLoading,
      hasError,
      moviePerPage,
      totalPages,
      currentPage,
      countPagination,
      onSwitchPage,
      disabledStar,
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

    const cardlistOrSpin = (
      <>
        {!hasData ? (
          <>
            <CardsList cards={cards} disabledStar={disabledStar} />
            {cards && moviePerPage < totalPages ? (
              <Pagination
                current={currentPage}
                defaultPageSize={1}
                total={countPagination}
                defaultCurrent={1}
                showSizeChanger={false}
                onChange={onSwitchPage}
              />
            ) : null}
          </>
        ) : !cards.length ? null : (
          <Spin tip="Loading..." size="large" />
        )}
      </>
    );

    return <>{error ? error : cardlistOrSpin}</>;
  }
}
