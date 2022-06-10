import express from 'express';

const app = express();
const PORT = 5678;

app.all('/*', (req, res) => {
    console.log("API accessed on an unknown route");
    res.status(404).send("This is not the right route for a warlord");
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})