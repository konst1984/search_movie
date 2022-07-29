import React from 'react';

import PropTypes from 'prop-types';

import Page from '../Page';

export default class RatedPage extends React.Component {
  static defaultProps = {
    cards: [],
  };

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    moviePerPage: PropTypes.number,
    itemProps: PropTypes.object,
  };

  state = {
    totalCards: [],
    itemsOnPage: [],
    page: 1,
  };

  componentDidMount() {
    this.updateRatedList(this.props.cards, 1);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cards !== this.props.cards || prevState.page !== this.state.page) {
      this.updateRatedList(this.props.cards);
    }
  }

  updateRatedList = (newItems) => {
    this.setState(
      () => {
        return { itemsOnPage: [...newItems] };
      },
      () => this.onSwitchPage(this.state.page)
    );
  };

  onSwitchPage = (page) => {
    this.setState(() => {
      const indexOfLastMovie = page * this.props.moviePerPage;

      const indexOfFirstMovie = indexOfLastMovie - this.props.moviePerPage;

      let itemsOnPage = this.props.cards.slice(indexOfFirstMovie, indexOfLastMovie);
      return {
        page,
        itemsOnPage,
      };
    });
  };

  render() {
    const { cards, moviePerPage, isLoading } = this.props;
    const { itemsOnPage, page } = this.state;
    let totalRatePage;
    if (cards.length) {
      totalRatePage = Math.ceil(cards.length / moviePerPage);
    }

    return (
      <>
        <Page
          isLoading={isLoading}
          moviePerPage={moviePerPage}
          currentPage={page}
          cards={itemsOnPage}
          countPagination={totalRatePage}
          totalPages={cards.length}
          onSwitchPage={this.onSwitchPage}
          disabledStar={true}
        />
      </>
    );
  }
}
