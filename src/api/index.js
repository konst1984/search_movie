import React from 'react';

export default class Index extends React.Component {
  getData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTNhYzU1Yzk1ODQ2YzFjZjQ1NGQ2ZDE1MzdhNzQ2NyIsInN1YiI6IjYyYmQ4ZGNiMDk3YzQ5MGJhNDhhN2I1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MUrmzeUnN8sUrLBszhX6hwcQEqMfWS2apcYE81kw6v8',
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      if (!response.ok) {
        throw new Error('Could not fetch: ' + url);
      }
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  _baseUrl = 'https://api.themoviedb.org/3';

  getAllMovie = async (query, page) => {
    return await this.getData(`${this._baseUrl}/search/movie?language=en-US&query=${query}&page=${page}`);
  };

  getAllGenre = async () => {
    return await this.getData(`${this._baseUrl}/genre/movie/list?language=en-US`);
  };

  _layoutCard = (item) => {
    return {
      id: item.id,
      vote: 0,
      title: item.original_title,
      date: item.release_date,
      genre: item.genre_ids,
      describe: item.overview,
      poster: item.poster_path,
    };
  };

  render() {
    console.log(this.getData);
    return <></>;
  }
}
