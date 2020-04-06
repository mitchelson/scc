const Militar = require('../models/Militar');

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
            const militarDelete = request.query.idMilitar;
            const response = await Militar.find({
                idMilitar: militarDelete
            });
            return response.json(response);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Pesquisar Militar"});
        }
    }
    async store(request, response){         //Cadastrar/Editar militar
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
    async destroy(request, response){       //Deletar registro específico, necessita de parametro id
        try{
            await Militar.deleteOne(request.query);
            const militar = await Militar.find();
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Militar"});
        }
    } 
}

module.exports = new MilitarController();