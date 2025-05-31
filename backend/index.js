import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route.js';


const app = express();
dotenv.config({});
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: '*', 
    methods: ['GET,PUT,POST,DELETE'],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (_, res) => {
    res.send('Welcome to the backend server!');
}
);

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
