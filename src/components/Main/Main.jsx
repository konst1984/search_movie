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
    ratedCards: [],
  };

  componentDidMount() {
    this.updateAllMovie();
    this.getGenre();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.updateAllMovie(this.state.searchValue, 1);
    }
  }

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

  onError = (err) => {
    this.setState({
      hasError: true,
      isLoading: false,
    });
  };

  onSwitchPage = async (page) => {
    await this.setState(({ ratedCards }) => {
      return {
        currentPage: page,
        isLoading: false,
        ratedCards: ratedCards,
      };
    });
    this.updateAllMovie(this.state.searchValue, this.state.currentPage);
  };

  onSearch = (e) => {
    this.setState({ currentPage: 1 });
    this.updateAllMovie(e.target.value, 1);
  };

  onRate = (value, id) => {
    return this.setState(({ cards, ratedCards }) => {
      const idx = cards.findIndex((el) => el.id === id);

      const newItem = { ...cards[idx], vote: value };

      const newCards = [...cards.slice(0, idx), newItem, ...cards.slice(idx + 1)];

      let rateCards = [];
      if (newCards) {
        rateCards = newCards.filter((card) => card.vote > 0 && !this.ratedList.includes(card.id));
      }

      let arrUniqRateId = [...new Set([...this.ratedList, ...rateCards.map((item) => item.id)])];
      this.ratedList = [...new Set([...this.ratedList, ...arrUniqRateId])];

      return {
        cards: newCards,
        ratedCards: [...ratedCards, ...rateCards],
      };
    });
  };

  render() {
    const { cards, isLoading, hasError, moviePerPage, totalPages, searchValue, currentPage } = this.state;
    const tabsWithPage = (
      <TabsList
        left={
          <>
            <SearchLine onSearch={this.onSearch} />
            <SearchPage
              // searchLine={<SearchLine onSearch={this.onSearch} />}
              hasError={hasError}
              searchValue={searchValue}
              cards={cards}
              isLoading={isLoading}
              currentPage={currentPage}
              moviePerPage={moviePerPage}
              totalPages={totalPages}
              countPagination={totalPages}
              onSwitchPage={this.onSwitchPage}
            />
          </>
        }
        right={<RatedPage cards={this.state.ratedCards} isLoading={isLoading} moviePerPage={moviePerPage} />}
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
