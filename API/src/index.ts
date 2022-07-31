require('dotenv').config();

import express from 'express';
import { json } from 'body-parser';

import { PlayersRouter } from './routes';

const app = express();
const PORT = 5678;

app.use(json());

PlayersRouter(app);

app.all('/*', (req, res) => {
    console.log("API accessed on an unknown route");
    res.status(404).send("This is not a valid Warlords API route");
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})