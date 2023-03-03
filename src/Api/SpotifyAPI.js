export class SpotifyAPI {
  constructor() {
    this.host = 'https://api.spotify.com/v1/';
    this.playlist_id = '6jOqPwEnXZpnTeZDeEOCnE';
  }

  searchMusic(keyword, token, success) {
    const query = encodeURIComponent(keyword);
    fetch(this.host + 'search' + '?q=' + query + '&type=track', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          success(data.tracks.items.filter((x) => x.album.images.length > 0));
        });
      })
      .catch((e) => console.error(e));
  }

  recommendedPlaylist(token, success) {
    fetch(this.host + 'playlists/' + this.playlist_id + '/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          const tracks = data.items.map((i) => i.track);
          success(tracks.filter((x) => x.album.images.length > 0));
        });
      })
      .catch((e) => console.error(e));
  }
}
