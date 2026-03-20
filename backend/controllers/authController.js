import { supabase } from '../config/db.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id || user._id, 
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id || user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { data: userExists } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: user, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role: 'User' }])
      .select()
      .single();

    if (error) throw error;

    if (user) {
      res.status(201).json({
        _id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id || user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
