import express,{Application, Request, Response} from 'express'
import cors from 'cors'
import router from './routes/router'
import bodyParser from 'body-parser'
import {connectDB} from './dbConn'

const app:Application = express()

app.use(cors({origin: '*'}))

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use(express.json())

const PORT = 3000

const uri = process.env.MONGODB_URI as string

// mongoose.connect(uri)
// .then(() => console.log('Connected to DB'))
// .catch(() => console.log('There is an error'))

app.use('/api', router)

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(PORT, async(): Promise<void> => {
    await connectDB();
    console.log('SERVER IS UP ON PORT:', PORT);
});