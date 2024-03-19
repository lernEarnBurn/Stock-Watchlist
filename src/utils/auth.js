import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import dbConnect from './mongoose';

import User from './models/user'

const authenticateUser = async (username, password) => {
  await dbConnect();

  const user = await User.findOne({ username });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return user;
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await authenticateUser(username, password);
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findOne({ id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;