// eslint-disable-next-line import/order
import React from 'react';

import './Main.css';

import RequestApi from '../../Request-api/Request-api';
import SearchLine from '../SearchLine/SearchLine';
import SearchPage from '../SearchPage/SearchPage';
import RatedPage from '../RatedPage/RatedPage';
import TabsList from '../TabsList/TabsList';
import MyContext from '../ApiContext/ApiContext';

export default class Main extends React.Component {
  moviesApp = new RequestApi();
  genreData;
  ratedList = [];
  state = {
    cards: [],
    totalPages: 10,
    totalResults: null,
    isLoading: false,
    hasError: false,
    moviePerPage: 20,
    searchValue: '',
    currentPage: 1,
    ratedListCards: [],
  };

  componentDidMount() {
    this.updateAllMovie();
    this.getGenre();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.updateAllMovie(this.state.searchValue, 1);
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
  }

  updateAllMovie = (query, page = 1) => {
    if (query) {
      this.moviesApp
        .getAllMovie(query, page)
        .then((res) => {
          this.setState({
            totalPages: Math.ceil(res.total_results / this.state.moviePerPage),
            totalResults: res.total_results,
            searchValue: query,
            isLoading: true,
          });
          return res.results.map(this.moviesApp._layoutCard);
        })
        .then((data) => {
          this.setState({
            cards: data,
            isLoading: true,
            hasError: false,
          });
        })
        .catch(this.onError);
    }
    return null;
  };

  getGenre = () => {
    this.moviesApp.getAllGenre().then((res) => {
      this.genreData = res.genres;
    });
  };

  onError = () => {
    this.setState({
      hasError: true,
      isLoading: false,
    });
  };

  onSwitchPage = async (page) => {
    await this.setState(({ ratedListCards }) => {
      return {
        currentPage: page,
        isLoading: false,
        ratedListCards: ratedListCards,
      };
    });
    this.updateAllMovie(this.state.searchValue, this.state.currentPage);
  };

  onSearch = (str) => {
    this.setState({ currentPage: 1 });
    this.updateAllMovie(str, 1);
  };

  onRate = (value, id) => {
    return this.setState(({ cards, ratedListCards }) => {
      const idx = cards.findIndex((el) => el.id === id);

      const newItem = { ...cards[idx], vote: value };

      const newCards = [...cards.slice(0, idx), newItem, ...cards.slice(idx + 1)];

      let ratedCards = [];
      if (newCards) {
        ratedCards = newCards.filter((card) => card.vote > 0 && !this.ratedList.includes(card.id));
      }

      let arrUniqRateId = [...new Set([...this.ratedList, ...ratedCards.map((item) => item.id)])];
      this.ratedList = [...new Set([...this.ratedList, ...arrUniqRateId])];

      return {
        cards: newCards,
        ratedListCards: [...ratedListCards, ...ratedCards],
      };
    });
  };

  render() {
    const { cards, isLoading, hasError, moviePerPage, totalPages, searchValue, currentPage, ratedListCards } =
      this.state;

    const tabsWithPage = (
      <TabsList
        disabled={!ratedListCards.length}
        left={
          <>
            <SearchLine onSearch={this.onSearch} />
            <SearchPage
              cards={cards}
              hasError={hasError}
              searchValue={searchValue}
              isLoading={isLoading}
              currentPage={currentPage}
              moviePerPage={moviePerPage}
              totalPages={totalPages}
              countPagination={totalPages}
              onSwitchPage={this.onSwitchPage}
            />
          </>
        }
        right={<RatedPage cards={ratedListCards} isLoading={isLoading} moviePerPage={moviePerPage} />}
      />
    );

    return (
      <div className={'main'}>
        <MyContext.Provider
          value={{
            genreData: this.genreData,
            onRate: this.onRate,
          }}
        >
          {tabsWithPage}
        </MyContext.Provider>
      </div>
    );
  }
}
