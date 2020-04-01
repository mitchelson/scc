const Militar = require('../models/Militar');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {     
        const {idMilitar, senha} = request.query;
        try{
            const militar = await Militar.findOne({idMilitar: idMilitar, senha: senha});
            console.log(militar);
            //console.log(reques.body);
            //console.log(request.body.idMilitar+" - "+request.body.senha);
            //const militar = await Militar.findOne({idMilitar:request.body.idMilitar, senha:request.body.senha});
            //console.log(militar)

            if(!militar){
                return response.status(400).json({error: "Nenhum usuário encontrado"});
            }
            return response.json(militar);
        } catch (err) {
            return response.status(400).json({error: "Nenhum usuário encontrado"});
        }
    }
}