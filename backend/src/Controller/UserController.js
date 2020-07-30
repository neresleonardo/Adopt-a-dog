const connection = require('../database/connection');

const crypto = require('crypto');

module.exports = {
    async index (req,res){
        const user = await connection('user').select('*');

        return res.json(user)
    },

    async create (req,res) {
        const{ name, email, whatsapp, city, uf} = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('user').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return res.json({ id });
    }
}