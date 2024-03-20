import bcrypt from 'bcrypt';
import dbConnect from '../../../../utils/mongoose';
import User from '../../../../utils/models/user';
import { withIronSessionApiRoute } from 'iron-session';
import { NextResponse } from 'next/server';

//iron session is not really working rn but this is the proper routing need to make route.js for login and logout too

export const POST = withIronSessionApiRoute(
  async function handler(req) {
    const { username, password } = await req.json();

    try {
      await dbConnect();

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();

      req.session.user = {
        id: newUser._id,
        username: newUser.username,
      };
      await req.session.save();

      return NextResponse.json({ user: { id: newUser._id, username: newUser.username } }, { status: 201 });
    } catch (error) {
      console.error('Error during signup:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  },
  {
    password: process.env.SESSION_SECRET,
    cookieName: 'auth-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
);