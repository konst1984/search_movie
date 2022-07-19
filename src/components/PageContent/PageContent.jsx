// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Pagination, Spin } from 'antd';
import './PageContent.css';
import PropTypes from 'prop-types';

import CardsList from '../CardsList';

const PageContent = ({
  error,
  emptyRequest,
  hasData,
  searchValue,
  cards,
  moviePerPage,
  totalPages,
  currentPage,
  countPagination,
  onSwitchPage,
  disabledStar,
}) => {
  const cardlistOrSpin = (
    <>
      {!hasData ? (
        <CardsList cards={cards} disabledStar={disabledStar} />
      ) : !(cards && searchValue) ? null : (
        <Spin tip="Loading..." size="large" />
      )}
      {cards && totalPages > moviePerPage ? (
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
  );

  return <>{error ? error : emptyRequest ? emptyRequest : cardlistOrSpin}</>;
};

PageContent.defaultProps = {
  cards: [],
  searchValue: null,
  emptyRequest: null,
  disabledStar: false,
  onSwitchPage: () => {},
};

PageContent.propTypes = {
  error: PropTypes.object,
  emptyRequest: PropTypes.element,
  hasData: PropTypes.bool,
  searchValue: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  moviePerPage: PropTypes.number,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  countPagination: PropTypes.number,
  onSwitchPage: PropTypes.func,
  disabledStar: PropTypes.bool,
};

export default PageContent;
