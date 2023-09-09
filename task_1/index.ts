import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import router from './route'
const app: Application = express();

const PORT: number = 3001;

app.use(cors({origin: '*'}))

app.use(express.json())

app.use('/', router);

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});