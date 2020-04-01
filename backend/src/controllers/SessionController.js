const Militar = require('../models/Militar');

module.exports = {
    async index(request, response) {         //Listar todos os militares sem nenhum parametro
        try{
            console.log(request.body.idMilitar+" - "+request.body.senha);
            const militar = await Militar.findOne({idMilitar:request.body.idMilitar, senha:request.body.senha});
            console.log(militar)
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Nenhum usuário encontrado"});
        }
    }
}