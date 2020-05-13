const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        const usuario_id = request.headers.authorization;

        const [count] = await connection('receitas_usuarios').where('usuario_id', usuario_id).count();
        response.header('X-total-count', count['count(*)']);

        const receitas = await connection('receitas')
            .join('receitas_usuarios', 'receitas.id', '=', 'receitas_usuarios.receita_id')
            .select([
                'receitas.*',
                'receitas_usuarios.id',
                'receitas_usuarios.usuario_id',
                'receitas_usuarios.receita_id' 
            ] );

        return response.json(receitas);
    },

    async create(request, response){
        const { receita_id } = request.body;
        const usuario_id = request.headers.authorization;

        const [id] = await connection('receitas_usuarios').insert({
            usuario_id,
            receita_id
        })

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params;
        const usuario_id = request.headers.authorization;

        const receita_usuario = await connection('receitas_usuarios').where('id', id).select('usuario_id').first();

        if(receita_usuario.usuario_id != usuario_id){
            return response.status(401).json({ error: 'operation not permitted' });
        }

        await connection('receitas_usuarios').where('id', id).delete();
        return response.status(204).send();
    }
}