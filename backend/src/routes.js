const { Router } = require('express');
const axios = require('axios');
const Militar = require('./models/Militar');
const crypto = require('crypto');

const routes = Router();

routes.get('/listar', async (request, response) => {
    const militar = await Militar.find(); //pode aplicar filtro dentro da função ex: find({ "_idMilitar":"123", })

    return response.json(militar);
})

routes.post('/cadastrar', async (request, response) => {
    const { _idMilitar, nome, senha} = request.body;

    let retornoMilitar = await Militar.findOne({ _idMilitar });

    if(!retornoMilitar) {
        retornoMilitar = await Militar.create({
            _idMilitar, nome, senha
        });
    }

    return response.json(retornoMilitar); 
});

routes.post('/autenticar', async (request, response) => {
    const { _idMilitar, senha } = request.body;

    const user = await Militar.findOne({ _idMilitar }).select('+password');

    if(!user){
        return response.status(400).send({ error: 'Militar não encontrado'});
    }


});

module.exports = routes;