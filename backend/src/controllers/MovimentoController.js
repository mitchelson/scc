const Movimento = require('../models/Movimento');

class MovimentoController {
    async index(request, response){         //Listar movimentação com filtro de aberta(true) ou fechada(false)
        try{
            const movimento = await Movimento.find(request.query);
            return response.json(movimento);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Listar Movimentações"});
        }
    }
    async show(request, response){         //Listar movimentação com filtro de aberta(true) ou fechada(false)
        try{
            const movimento = await Movimento.findOne(request.query);
            return response.json(movimento);    
        } catch (err) {
            return response.status(400).json({error: "Erro ao Listar Movimentações"});
        }
    }
    async store(request, response){         //Cadastrar/Editar movimentações
        try{
            const mov = await Movimento.findOneAndUpdate(
                {dataS: request.body.dataS},
                {$set:request.body}, 
                {upsert: true});
            return response.json(mov);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Movimento"});
        }
    }
    async destroy(request, response){       //Deletar movimentações específicas, necessita de parametro id
        try{
            await Movimento.deleteOne(request.query);
            const mov = await Movimento.find();
            return response.json(mov);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Movimento"});
        }
    } 
}

module.exports = new MovimentoController();