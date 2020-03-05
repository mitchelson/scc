const { Router } = require('express');
const axios = require('axios');
const Militar = require('./models/Militar');
const crypto = require('crypto');

const routes = Router();

routes.get('/listar', async (request, response) => {        // listar militar
    const militar = await Militar.find();
    return response.json(militar);
})

routes.post('/cadastrar', async (request, response) => {    // cadastrar militar
    const { _idMilitar, nome, senha} = request.body;

    let retornoMilitar = await Militar.findOne({ _idMilitar });

    if(!retornoMilitar) {
        retornoMilitar = await Militar.create({
            _idMilitar, nome, senha
        });
    }

    return response.json(retornoMilitar); 
});

routes.post('/autenticar', async (request, response) => {       // autenticar
    const { _idMilitar, senha } = request.body;

    const user = await Militar.findOne({ _idMilitar }).select('+password'); // busca _idMilitar no banco junto com a senha

    if(!user){
        return response.status(400).send({ error: 'Militar não encontrado'});
    }


});

module.exports = routes;