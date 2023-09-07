import express, { Application }  from 'express';
import router from './route'

const app: Application = express();
const port = 3000;

app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
