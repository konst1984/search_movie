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

  currentPage = 1;

  componentDidMount() {
    this.upDateState(this.props.cards, 1);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cards !== this.props.cards) {
      this.upDateState(this.props.cards);
    }
    if (prevState.page !== this.state.page) {
      this.onSwitchPage(this.state.page);
    }
  }

  upDateState = (newItems, page) => {
    if (newItems && newItems.length) {
      this.setState(({ totalCards }) => {
        if (page !== this.currentPage) {
          this.currentPage = page;
          return {
            totalCards: totalCards,
            itemsOnPage: totalCards.slice(0, 20),
            page: 1,
          };
        } else {
          this.currentPage = page;
          return {
            totalCards: [...newItems],
            itemsOnPage: [...newItems].slice(0, 20),
            page: 1,
          };
        }
      });
    } else {
      this.setState(({ totalCards }) => {
        this.currentPage = page;
        return {
          totalCards: totalCards,
          itemsOnPage: totalCards,
        };
      });
    }
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
    const { cards, moviePerPage, ...itemProps } = this.props;
    const { itemsOnPage, page } = this.state;
    let totalRatePage;

    if (cards.length) {
      totalRatePage = Math.ceil(cards.length / moviePerPage);
    }

    return (
      <>
        {!cards.length ? (
          <div className="message" style={{ fontSize: '32px', color: 'dodgerblue' }}>
            The rating list is empty
          </div>
        ) : (
          <Page
            {...itemProps}
            moviePerPage={moviePerPage}
            currentPage={page}
            cards={itemsOnPage.length ? itemsOnPage : cards}
            countPagination={totalRatePage}
            totalPages={cards.length}
            onSwitchPage={this.onSwitchPage}
            disabledStar={true}
          />
        )}
      </>
    );
  }
}
