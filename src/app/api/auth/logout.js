import { withIronSession } from 'next-iron-session';

const handler = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully' });
};

export default withIronSession(handler, {
  password: process.env.SESSION_SECRET,
  cookieName: 'auth-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});