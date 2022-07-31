import { Express } from "express";
import { Pool } from "../../utilities/DatabaseConnection";
import { JSONSchemaValidator } from "../../utilities/JSONValidation";

interface Player {
    username: string;
    password: string;
    salt: string;
}

const PlayerValidator = new JSONSchemaValidator()
    .add('username', 'string')
    .add('password', 'string')

export default function attach(app: Express) {
    app.post('/players/new', async (req, res) => {
        console.log(`Received request with request body ${req.body}`)
        const player: Player = req.body;
        console.log(`Received request with player ${player}`)
        if (!PlayerValidator.validate(player) || player.password.length != 44 || player.username.length >= 80) {
            res.status(400).json({});
            return;
        }

        try {
            const conn = await Pool.getConnection();
            await conn.query(`INSERT INTO Players ( username, rating, passwordHash, passwordSalt )
                VALUES (?,?,?,?);`, [
                    player.username, 0, player.password, 'a'.repeat(22)
                ]);
            conn.release();
            res.status(200).json({});
        } catch (e) {
            console.error(e);
            res.status(500).json({});
        }
    });
}