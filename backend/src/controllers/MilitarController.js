const axios = require('axios');
const Militar = require('../models/Militar');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class MilitarController {
    async index(request, response){         //Listar todos os militares sem nenhum parametro
        try{
            const militar = await Militar.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Listar Militares"});
        }
    }
    async show(request, response){          //Pesquisar militar especifico passando id do militar como parametro
        try{
            const find = request.query.idMilitar;
            const militar = await Militar.find({
                idMilitar: find
            });
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Pesquisar Militar"});
        }
    }
    async store(request, response){         //Cadastrar novo militars
        try{
            await Militar.findOneAndUpdate(
                {idMilitar: request.body.idMilitar}, 
                {$set:request.body}, 
                {upsert: true});
            const militar = await Militar.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Militar"});
        }
    }
    async update(request, response){        //Atualizar regristro de Militar
        try{
            await Militar.updateMany(request.query, request.body);
            const militar = await Militar.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Atualizar Registro do Militar"});
        }
    }
    async destroy(request, response){       //Deletar registro específico, necessita de parametro id
        try{
            const resultado = await Militar.deleteOne(request.query);
            const militar = await Militar.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Militar"});
        }
    } 
}

module.exports = new MilitarController();