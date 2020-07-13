import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../db/models/user';

export default function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = process.env.SECRET;

    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.userId, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}