import express from "express"
import { connectMongoDB, writeData } from './src/database/mongoConnection.js';
import bodyParser from "body-parser"
import dotenv from "dotenv"
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

dotenv.config()
connectMongoDB();

const app = express()
const PORT = process.env.PORT || 5000
const currentTime = moment().tz('Asia/Manila').format('YYYY-MM-DD-HH:mm:ss');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.post('/api/v1/users/register', async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;
  const currentTime = moment().tz('Asia/Manila').format('YYYY-MM-DD-HH:mm:ss');

  if (!userName || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userData = {
      userId: uuidv4(),
      data: {
        userName,
        firstName,
        lastName,
        email,
        password,
      },
      created_at: currentTime,
    };
    await writeData('users', userData);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/api/v1/users/:username', async (req, res) => {
  return res.status(200).json({ message: `User route hit for ${req.params.username}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})