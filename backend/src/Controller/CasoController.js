const connection = require('../database/connection');
const connection = require('./UserController');

    module.exports = {
        async index(req,res) {
            const { page = 1 } = req.query

            const [count] = await connection('casos').count();

            const casos = await connection('casos')
            .join('user', 'user.id', '=', 'casos.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'user.name',
                'user.email',
                'user.whatsapp',
                'user.city',
                'user.uf'
            ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(casos);
        },

        async create(req, res) {
            const { title, description, raca } = req.body;
            const user_id = req.headers.authorization;
    
            const [id] = await connection('casos').insert({
                title,
                description,
                raca,
                ong_id,
            });
    
            return res.json({ id });
        },
    }