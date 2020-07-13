// services/spotify
'use strict'
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment';
import User from '../db/models/user';
import genius from 'genius-lyrics';
import qs from 'querystring';

// Get access token
export const getAccessToken = (req, _res, next) => {

  const spotify = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  };

  const { code, state } = req.query;

  if (code) {
    const url = 'https://accounts.spotify.com/api/token';

    const data = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: spotify.redirect_uri,
      client_id: spotify.client_id,
      client_secret: spotify.client_secret,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const searchParams = new URLSearchParams();

    Object.keys(data).forEach(prop => {
      searchParams.set(prop, data[prop]);
    });

    fetch(url, {
      method: 'POST',
      headers,
      body: searchParams,
    })
      .then(res => res.json())
      .then(credentials => {
        req.credentials = credentials;
        req.state = state;
        next();
      })
      .catch(next);
  }
};

// Callback from the resistration of user
export const callback = async (req, res, next) => {
  console.log(req.state);
  try {
    const user = await User.findById(req.state);
    if (!user) {
      const e = new Error('No se pudo conectar Spotify.');
      e.name = 'internal';
      return next(e);
    }

    const spotify = {
      token: {
        value: req.credentials.access_token,
        expires: moment().unix() + req.credentials.expires_in,
      },
      refreshToken: req.credentials.refresh_token,
    };

    user.connectedAccounts.spotify = spotify;
    await user.save();
    res.status(200).send({
      status: 200,
      name: 'OK',
      message: 'Spotify conectado',
    })
  } catch (err) {
    console.log(err);
    const e = new Error('No se pudo conectar Spotify.');
    e.name = 'internal';
    return next(e);
  }
};

// Connect spotify account
export const connect = async (req, res, next) => {
  const spotify = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  };

  const scopes = 'user-read-recently-played';

  const url = `https://accounts.spotify.com/authorize?&client_id=${
    spotify.client_id
    }&redirect_uri=${encodeURI(
      spotify.redirect_uri
    )}&response_type=code&scope=${scopes}`;

  res.redirect(url);
};


// Unlink token from spotify
export const disconnect = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const e = new Error('No se pudo desconectar Spotify.');
      e.name = 'internal';
      return next(e);
    }
    user.connectedAccounts.spotify = null;
    await user.save();
    res.status(200).send({
      status: 200,
      name: 'OK',
      message: 'Spotify desconectado',
    })
  } catch (err) {
    console.log(err);
    const e = new Error('No se pudo desconectar Spotify.');
    e.name = 'internal';
    return next(e);
  }
};

/**
 * Format song from a bigger song object
 * @param  {object} song
 * @return song {artistName, trackName}
 */
const formatSong = (song) => {
  const {
    track,
  } = song;

  const {
    name: trackName,
    artists,
  } = track;

  const {
    name: artistName,
  } = artists[0];

  return {
    artistName,
    trackName,
  }
}

/**
 * Get songs played in time inteval
 * @param  {string} userId
 * @return songs array [{artistName, trackName, lyrics}]
 */
export const getSongs = async (userId) => {
  const user = await User.findById(userId);
  if (!user.connectedAccounts.spotify || !user.connectedAccounts.spotify.token) {
    console.log('Usuario no tiene conectado Spotify');
    return [];
  }
  if (user.connectedAccounts.spotify.token.expires < moment().unix()) {
    try {
      const authorization = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
      const requestBody = {
        grant_type: 'refresh_token',
        refresh_token: `${user.connectedAccounts.spotify.refreshToken}`,
      };
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(requestBody),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authorization}`,
          }
        }
      );
      let rt = user.connectedAccounts.spotify.refreshToken;
      if (response.data.refresh_token) {
        rt = response.data.refresh_token;
      }
      const spotify = {
        token: {
          value: response.data.access_token,
          expires: moment().unix() + response.data.expires_in,
        },
        refreshToken: rt,
      };
      user.connectedAccounts.spotify = spotify;
      await user.save();
    } catch (err) {
      console.log(err);
      throw new Error('No se pudo actuaizar el token de Spotify');
    }
  }
  try {
    const response = await axios.get(`${process.env.SPOTIFY_RECENTLY_PLAYED}`, {
      headers: {
        Authorization: `Bearer ${user.connectedAccounts.spotify.token.value}`,
      }
    });
    let songs = response.data.items || [];
    songs = songs.map(s => formatSong(s));

    // Get the lyrics for the song
    const Genius = new genius.Client(`${process.env.GENIUS_TOKEN}`);

    const lyrics = async (trackName) => {
      try {
        const songsA = await Genius.tracks.search(trackName, { limit: 1 });
        const song = songsA[0]; //even tho limit is 1, it will be inside an array
        const lyrics = await song.lyrics();
        return lyrics;
      } catch (e) {
        console.log(e);
        return '';
      }
    }

    const fetchingLyrics = [];

    for (let index = 0; index < songs.length; index++) {
      const trackLyrics = lyrics(songs[index].trackName);
      fetchingLyrics.push(trackLyrics);
    };

    const fetchedLyrics = await Promise.all(fetchingLyrics);

    songs = songs.map((song, index) => ({
      ...song,
      lyrics: fetchedLyrics[index],
    }));

    return songs;
  } catch (err) {
    console.log(err);
    throw new Error('No se pudieron traer los tracks de Spotify');
  }
};

export const getS = async (req, res, _next) => {
  res.json(await getSongs(req.params.id));
}