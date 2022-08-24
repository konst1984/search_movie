import React from 'react';

import Index from '../../api';
import MyContext from '../../context';
import RatedPage from '../RatedPage';
import SearchLine from '../SearchLine';
import SearchPage from '../SearchPage';
import TabsList from '../TabsList';

import './Main.css';

export default class Main extends React.Component {
  moviesApp = new Index();
  genreData;
  ratedList = [];
  ratedListCards = [];
  state = {
    cards: [],
    totalPages: 10,
    totalResults: null,
    isLoading: false,
    hasError: false,
    moviePerPage: 20,
    searchValue: '',
    currentPage: 1,
  };

  componentDidMount() {
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
      this.setState({ isLoading: false });
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
    await this.setState({ currentPage: page, isLoading: false });
    this.updateAllMovie(this.state.searchValue, this.state.currentPage);
  };

  onSearch = (str) => {
    this.setState({ currentPage: 1 });
    this.updateAllMovie(str, 1);
  };

  onRate = (value, id) => {
    const { cards } = this.state;
    const idx = cards.findIndex((el) => el.id === id);

    const newItem = { ...cards[idx], vote: value };

    const newCards = [...cards.slice(0, idx), newItem, ...cards.slice(idx + 1)];

    let ratedCards = [];
    if (newCards) {
      ratedCards = newCards.filter((card) => card.vote > 0 && !this.ratedList.includes(card.id));
    }

    let arrUniqRateId = [...new Set([...this.ratedList, ...ratedCards.map((item) => item.id)])];
    this.ratedList = [...new Set([...this.ratedList, ...arrUniqRateId])];
    this.ratedListCards = [...this.ratedListCards, ...ratedCards];

    return this.setState({ cards: newCards });
  };

  render() {
    const { cards, isLoading, hasError, moviePerPage, totalPages, currentPage } = this.state;

    const tabsWithPage = (
      <TabsList
        disabled={!this.ratedListCards.length}
        left={
          <>
            <SearchLine onSearch={this.onSearch} />
            <SearchPage
              cards={cards}
              hasError={hasError}
              isLoading={isLoading}
              currentPage={currentPage}
              moviePerPage={moviePerPage}
              totalPages={totalPages}
              countPagination={totalPages}
              onSwitchPage={this.onSwitchPage}
            />
          </>
        }
        right={<RatedPage cards={this.ratedListCards} isLoading={isLoading} moviePerPage={moviePerPage} />}
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
