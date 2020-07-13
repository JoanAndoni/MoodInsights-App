// services/facebook
'use strict'

import User from '../db/models/user';
import axios from 'axios';
import { beginningOfDay, endOfDay } from '../helpers/dates.helper';

/**
 * Link token from facebook
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
export const link = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const e = new Error('No se pudo conectar Facebook.');
      e.name = 'internal';
      return next(e);
    }

    const facebook = {
      token: req.body.fbToken,
      userID: req.body.userID,
    };

    user.connectedAccounts.facebook = facebook;
    await user.save();
    res.status(200).send({
      status: 200,
      name: 'OK',
      message: 'Facebook conectado',
    })
  } catch (err) {
    console.log(err);
    const e = new Error('No se pudo conectar Facebook.');
    e.name = 'internal';
    return next(e);
  }
};

/**
 * Unlink token from facebook
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
export const unlink = async (req, res, next) => {
  // console.log(req);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const e = new Error('No se pudo desconectar Facebook.');
      e.name = 'internal';
      return next(e);
    }
    user.connectedAccounts.facebook = null;
    await user.save();
    res.status(200).send({
      status: 200,
      name: 'OK',
      message: 'Facebook desconectado',
    })
  } catch (err) {
    console.log(err);
    const e = new Error('No se pudo desconectar Facebook.');
    e.name = 'internal';
    return next(e);
  }
};

/**
 * Get facebook posts in time interval
 * @param  {string} userId
 * @param  {unix time} since
 * @param  {unix time} until
 * @return posts array [{message, permalink_url}]
 */
export const getPosts = async (userId, since, until) => {
  const user = await User.findById(userId);
  const fields = 'message, permalink_url';
  try {
    const response = await axios.get(`${process.env.FACEBOOK_GRAPH}me/feed`, {
      params: {
        since,
        until,
        fields,
        access_token: user.connectedAccounts.facebook.token,
      }
    });
    const posts = response.data.data;
    const messages = posts.filter(p => p.message).map(p => p.message);

    return messages;
  } catch (err) {
    console.log(err);
    throw new Error('No se pudieron traer los posts de Facebook');
  }
};

export const getP = async (req, res, _next) => {
  res.json(await getPosts(req.params.id, beginningOfDay(), endOfDay()));
}
