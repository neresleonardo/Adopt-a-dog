const connection = require('../database/connection');

    module.exports = {
        async index(req,res) {
            const { page = 1 } = req.query

            const [count] = await connection('casos').count();

            const casos = await connection('casos')
            .join('user', 'user.id', '=', 'casos.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'casos.*',
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
    
            const [ id ] = await connection('casos').insert({
                title,
                description,
                raca,
                user_id,
            });
    
            return res.json({ id });
        },
        async delete(req, res) {
            const { id } = req.params;
            const user_id = req.headers.authorization;
    
            const caso = await connection('casos')
                .where('id', id)
                .select('user_id')
                .first();
    
            if(caso.user_id !== user_id) {
                return res.status(401).json({ error: 'Operation not permitted.'});
            }
    
            await connection('casos').where('id', id).delete();
    
            return res.status(204).send();
        }
    }