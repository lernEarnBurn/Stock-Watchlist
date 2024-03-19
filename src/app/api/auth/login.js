import passport from 'lib/auth';
import nextConnect from 'next-connect';
import { withIronSession } from 'next-iron-session';

const handler = nextConnect()
  .use(passport.initialize())
  .post(passport.authenticate('local'), (req, res) => {

    req.session.set('user', req.user);
    req.session.save();
    res.status(200).json({ user: req.user });
  });

export default withIronSession(handler, {
  password: process.env.SESSION_SECRET,
  cookieName: 'auth-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});