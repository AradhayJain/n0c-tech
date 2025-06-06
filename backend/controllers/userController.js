import asyncHandler from 'express-async-handler';
import mysql from 'mysql2'
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'aradhay1234', 
    database: 'auth_demo' 
});



export const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    const query="INSERT INTO users SET ?";
    const user = { username, email, password };
 
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

   
    db.query(query, user, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ message: 'Error registering user' });
        } else {
            const token= generateToken(result.insertId);
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId, name: username, email:email, token:token });
        }
    });
})

export const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    const query="SELECT * FROM users WHERE email = ?";
    db.query(query, email, async (err, results) =>
        {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ message: 'Error logging in' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const user = results[0];
       
        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        
        res.status(200).json({
            message: 'Login successful',
            userId: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        });
    });
});