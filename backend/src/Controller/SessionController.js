const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const user = await connection('user')
            .where('id', id)
            .select('name')
            .first();
        if(!user) {
            return res.status(404).json({ error:'No ONG found with this ID' });
        }

        return res.json(user);
    }
}