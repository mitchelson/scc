const Militar = require('../models/Militar');
const axios = require('axios');

class MilitarController {
    async index(request, responde){         //Listar todos os militares sem nenhum parametro
        try{
            const militar = await Militar.findAll();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Listar Militares"});
        }
    }
    async show(request, responde){          //Pesquisar miltiar especifico passando id como parametro
        try{
            const militar = await Militar.findByPk(request.params._idMilitar);
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Pesquisar Militar"});
        }
    }
    async store(request, responde){         //Cadastrar novo militar
        try{
            const militar = await Militar.create(request.body);
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Militar"});
        }
    }
    async update(request, responde){        //Atualizar regristro de Militar
        try{
            const militar = await Militar.findByPk(request.params._idMilitar);
            await militar.update(request.body);
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Atualizar Registro do Militar"});
        }
    }
    async destroy(request, responde){       //Deletar registro específico, necessita de parametro id
        try{
            const militar = await Militar.findByPk(rqeuest.params._idMilitar);
            await militar.destroy();
            return response.json();
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Militar"});
        }
    }
}

module.exports = new MilitarController();