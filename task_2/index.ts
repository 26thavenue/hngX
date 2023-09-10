import express,{Application, Request, Response} from 'express'
import cors from 'cors'
import router from './routes/router'
const app:Application = express()

app.use(cors({origin: '*'}))

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

const PORT = 3001

app.use('/api', router)

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});