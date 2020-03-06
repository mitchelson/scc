const Viatura = require('../models/Viatura');
const axios = require('axios');

class ViaturaController {
    async index(request, responde){         //Listar todos as viatura sem nenhum parametro
        try{
            const viatura = await Viatura.findAll();
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Listar Viaturas"});
        }
    }
    async show(request, responde){          //Pesquisar viatura especifica passando id como parametro
        try{
            const viatura = await Viatura.findByPk(request.params._idViatura);
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Pesquisar Viatura"});
        }
    }
    async store(request, responde){         //Cadastrar nova viatura
        try{
            const viatura = await Viatura.create(request.body);
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Viatura"});
        }
    }
    async update(request, responde){        //Atualizar regristro da viatura
        try{
            const viatura = await Viatura.findByPk(request.params._idViatura);
            await militar.update(request.body);
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Atualizar Registro da Viatura"});
        }
    }
    async destroy(request, responde){       //Deletar registro específico, necessita de parametro id
        try{
            const viatura = await Viatura.findByPk(rqeuest.params._idViatura);
            await viatura.destroy();
            return response.json();
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro da Viatura"});
        }
    }
}

module.exports = new ViaturaController();