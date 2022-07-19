// eslint-disable-next-line no-unused-vars
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

  data = [];
  currentPage = 1;

  componentDidMount() {
    this.upDateState(this.props.cards);
    this.mountItemsOnPage(this.props.cards, 0, this.props.moviePerPage);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cards !== this.props.cards) {
      this.upDateState(this.props.cards);
    }
  }

  upDateState = (newItems, page) => {
    if (newItems && newItems.length) {
      this.setState(({ totalCards }) => {
        if (page !== this.currentPage) {
          this.currentPage = page;
          this.data = totalCards;
          return {
            totalCards: totalCards,
            itemsOnPage: totalCards.slice(0, 20),
          };
        } else {
          this.currentPage = page;
          return {
            totalCards: [...this.data, ...newItems],
            itemsOnPage: [...this.data, ...newItems],
          };
        }
      });
    } else {
      this.setState(({ totalCards }) => {
        this.currentPage = page;
        this.data = totalCards;
        return {
          totalCards: totalCards,
          itemsOnPage: totalCards.slice(0, 20),
        };
      });
    }
  };

  mountItemsOnPage = (arr, start, end) => {
    let itemsOnPage = arr.slice(start, end);
    this.setState({ itemsOnPage: itemsOnPage });
  };

  onSwitchPage = async (page) => {
    await this.setState(() => {
      const indexOfLastMovie = page * this.props.moviePerPage;

      const indexOfFirstMovie = indexOfLastMovie - this.props.moviePerPage;

      let itemsOnPage = this.state.totalCards.slice(indexOfFirstMovie, indexOfLastMovie);
      return {
        page,
        itemsOnPage,
      };
    });
  };

  render() {
    const { cards, ...itemProps } = this.props;
    let totalRatePage = null;

    if (this.state.totalCards.length) {
      totalRatePage = Math.ceil(this.state.totalCards.length / this.props.moviePerPage);
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
            currentPage={this.state.page}
            cards={this.state.itemsOnPage}
            countPagination={totalRatePage}
            totalPages={this.state.totalCards.length}
            onSwitchPage={this.onSwitchPage}
            disabledStar={true}
          />
        )}
      </>
    );
  }
}
