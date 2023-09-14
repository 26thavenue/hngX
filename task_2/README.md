# HNG STAGE 2

This is a simple TypeScript script that demonstrates how to create an Express.js server, perform CRUD operations and connect to a MongoDB database using Mongoose.

## Prerequisites

Before running this script, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)


## ENV

Environment variables

```
MONGO_URI = 'Your mongo db URI goes here'
```

## Installation

1.  Fork this repository to your machine
2.  Move into the task_2 folder (This is where the code for the api lives)
3.  Got to [MONGODB](https://cloud.mongodb.com/) and create a new database cluster. ** Free tier should do **
4.  Get the database URI and put in your `.env` file or a `.dotenv` file
5.  Run npm install in your terminal. (Make sure your current directory is in thetask_2 folder.)

## Run Locally

Start the server

```bash
  npm run dev
```

This will start running the server on the specified port

### `npm start`

Starts app in production by first building and then executing compiled javascript in `build/index.js`

### `npm run build`

Builds the app at `/dist` folder


## API DOCUMENTATION

To see guidance on how to use the API, request/response formats and sample usage, kindly check the postman documentation

<br>

[API DOCUMENTATION →] (./DOCUMENTATION.md)