const { Router } = require('express');
const Militar = require('./models/Militar');
const crypto = require('crypto');
const MilitarController = require('./controllers/MilitarController');
const ViaturaController = require('./controllers/ViaturaController');

const routes = Router();

routes.get('/militar', MilitarController.index);

routes.get('/militar/:id', MilitarController.show);

routes.post('/militar', MilitarController.store);

routes.put('/militar/:id', MilitarController.update);

routes.delete('/militar/:id', MilitarController.destroy);



routes.get('/viatura', ViaturaController.index);

routes.get('/viatura/:id', ViaturaController.show);

routes.post('/viatura', ViaturaController.store);

routes.put('/viatura/:id', ViaturaController.update);

routes.delete('/viatura/:id', ViaturaController.destroy);


routes.post('/autenticar', async (request, response) => {       // autenticar
    const { _idMilitar, senha } = request.body;

    try{
        const militar = await Militar.findOne({ _idMilitar }).select('+password');
        return response.json(militar);
    } catch (err) {
        return response.status(400).json({error: "Erro ao Listar Militares"});
    }
});

module.exports = routes;