import User from "@/utils/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/mongoose";
import { getIronSession } from 'iron-session';
import { cookies } from "next/headers";

export async function POST(req, res) {
  try {
    await dbConnect();

    const { username, password } = await req.json();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
   
    //session management
    const session = await getIronSession(cookies(), { password: process.env.COOKIE_PASSWORD, cookieName: 'user' });
    session.username = username;
    await session.save();
    
    return new Response(JSON.stringify({ success: true, user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}