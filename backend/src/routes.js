const { Router } = require('express');
const MilitarController = require('./controllers/MilitarController');
const ViaturaController = require('./controllers/ViaturaController');
const SessionController = require('./controllers/SessionController');
const Militar = require('./models/Militar');
const crypto = require('crypto');

const routes = Router();

routes.get('/listar-militar', MilitarController.index);
routes.get('/pesquisar-militar', MilitarController.show);
routes.post('/cadastrar-militar', MilitarController.store);
routes.delete('/deletar-militar', MilitarController.destroy);

routes.get('/listar-viatura', ViaturaController.index);
routes.get('/pesquisar-viatura', ViaturaController.show);
routes.post('/cadastrar-viatura', ViaturaController.store);
routes.delete('/deletar-viatura', ViaturaController.destroy);

routes.get('/login', SessionController.index);

routes.get('/connect', async (request, response) =>{         //Listar todos os militares sem nenhum parametro
    try{
        const militar = await Militar.find();
        return response.json(militar);
    } catch (err) {
        return response.status(400).json({error: "Erro ao Listar Militares"});
    }
});


module.exports = routes;