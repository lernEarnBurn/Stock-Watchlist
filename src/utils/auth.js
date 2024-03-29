import { compare } from 'bcrypt';
import dbConnect from './mongoose';
import User from './models/user';


export async function signIn(credentials) {
  try {
    await dbConnect();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user._id,
      username: user.username,
    };
  } catch (error) {
    throw new Error('Invalid credentials');
  }
}