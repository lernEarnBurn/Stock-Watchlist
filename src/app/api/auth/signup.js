import bcrypt from 'bcrypt';
import dbConnect from 'lib/dbConnect';
import User from 'models/User';
import { withIronSession } from 'next-iron-session';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    await dbConnect();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    req.session.set('user', {
      id: newUser._id,
      username: newUser.username,
    });
    await req.session.save();

    res.status(201).json({ user: { id: newUser._id, username: newUser.username } });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default withIronSession(handler, {
  password: process.env.SESSION_SECRET,
  cookieName: 'auth-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});