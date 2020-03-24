const Viatura = require('../models/Viatura');

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
    async store(request, response){   
        console.log(request.body.idViatura
            )     //Cadastrar/Editar nova viatura
        try{
            await Viatura.findOneAndUpdate(
                {idViatura: request.body.idViatura}, 
                {$set:request.body}, 
                {upsert: true});
            const viatura = await Viatura.find();
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Cadastrar Viatura"});
        }
    }
    async destroy(request, response){       //Deletar registro específico, necessita de parametro id
        try{
            const resultado = await Viatura.deleteOne(request.query);
            const viatura = await Viatura.find();
            return response.json(viatura);
        } catch (err) {
            return response.status(400).json({error: "Erro ao Deletar Registro do Viatura"});
        }
    }
}

module.exports = new ViaturaController();