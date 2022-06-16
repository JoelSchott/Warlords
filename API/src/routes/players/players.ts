import { Express } from "express";

interface Player {
    username: string;
    password: string;
}

export default function attach(app: Express) {
    app.post('/players/new', async (req, res) => {
        const player: Player = req.body;
        
    });
}