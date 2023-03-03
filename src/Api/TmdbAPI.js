export class TmdbAPI {
  constructor() {
    this.api_key = '38f985d9349e1cb4fd5e6b6bda98a3f3';
    this.host = 'https://api.themoviedb.org/3/';
  }

  getMovieCredits(id) {
    return fetch(
      this.host + 'movie/' + id + '/credits' + '?api_key=' + this.api_key,
      {
        method: 'GET',
      },
    );
  }

  searchMovie(keyword, success) {
    fetch(
      this.host +
        'search/movie' +
        '?api_key=' +
        this.api_key +
        '&query=' +
        keyword,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        response.json().then((data) => {
          success(data.results.slice(0, 18).filter((x) => !!x.poster_path));
        });
      })
      .catch((e) => console.error(e));
  }

  getTopRated(success) {
    fetch(this.host + 'trending/movie/week' + '?api_key=' + this.api_key, {
      method: 'GET',
    })
      .then((response) => {
        response.json().then((data) => {
          success(data.results.slice(0, 18).filter((x) => !!x.poster_path));
        });
      })
      .catch((e) => console.error(e));
  }

  getTvCredits(id) {
    return fetch(
      this.host + 'tv/' + id + '/credits' + '?api_key=' + this.api_key,
      {
        method: 'GET',
      },
    );
  }

  getTopRatedTvShow(success) {
    fetch(this.host + 'trending/tv/week' + '?api_key=' + this.api_key, {
      method: 'GET',
    })
      .then((response) => {
        response.json().then((data) => {
          success(data.results.slice(0, 18).filter((x) => !!x.poster_path));
        });
      })
      .catch((e) => console.error(e));
  }

  searchTV(keyword, success) {
    fetch(
      this.host +
        'search/tv' +
        '?api_key=' +
        this.api_key +
        '&query=' +
        keyword,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        response.json().then((data) => {
          success(data.results.slice(0, 20).filter((x) => !!x.poster_path));
        });
      })
      .catch((e) => console.error(e));
  }
}
