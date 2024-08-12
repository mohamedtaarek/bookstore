import express, {json, urlencoded} from 'express';
import dotenv from 'dotenv';
import authorController from './controllers/author.js';
import bookController from './controllers/book.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.use(urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/author',authorController);
app.use('/book',bookController);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});