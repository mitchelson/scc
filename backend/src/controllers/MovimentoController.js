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
    async show(request, response){          //Pesquisar movimentação
        try{
            const militarDelete = request.query.idMovimento;
            const response = await Movimento.find({
                idMovimento: militarDelete
            });
            return response.json(response);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Pesquisar Movimento"});
        }
    }
    async store(request, response){         //Cadastrar/Editar movimentações
        try{
            await Movimento.findOneAndUpdate(
                {data: request.body.data},
                {$set:request.body}, 
                {upsert: true});
            const militar = await Movimento.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Movimento"});
        }
    }
    async destroy(request, response){       //Deletar movimentações específicas, necessita de parametro id
        try{
            await Movimento.deleteOne(request.query);
            const militar = await Movimento.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Movimento"});
        }
    } 
}

module.exports = new MovimentoController();