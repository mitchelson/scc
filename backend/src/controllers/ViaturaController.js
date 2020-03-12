const Viatura = require('../models/Viatura');
const axios = require('axios');

class ViaturaController {
    async index(request, response){         //Listar todos os viaturaes sem nenhum parametro
        try{
            const viatura = await Viatura.find();
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Listar Viaturaes"});
        }
    }
    async show(request, response){          //Pesquisar viatura especifico passando id do viatura como parametro
        try{
            const find = request.query.idViatura;
            const viatura = await Viatura.find({
                idViatura: find
            });
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Pesquisar Viatura"});
        }
    }
    async store(request, response){         //Cadastrar novo viatura
        try{
            const viatura = await Viatura.create(request.body);
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Viatura"});
        }
    }
    async update(request, response){        //Atualizar regristro de Viatura
        try{
            await Viatura.updateMany(request.query, request.body);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Atualizar Registro do Viatura"});
        }
    }
    async destroy(request, response){       //Deletar registro específico, necessita de parametro id
        try{
            //const viatura = await Viatura.find(request.query.idViatura);
            const resultado = await Viatura.deleteOne(request.query);
            return response.json(resultado);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Viatura"});
        }
    }
}

module.exports = new ViaturaController();