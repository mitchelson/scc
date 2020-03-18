const { Router } = require('express');
const Militar = require('./models/Militar');
const crypto = require('crypto');
const MilitarController = require('./controllers/MilitarController');
const ViaturaController = require('./controllers/ViaturaController');

const routes = Router();

routes.get('/listar-militar', MilitarController.index);
routes.get('/pesquisar-militar', MilitarController.show);
routes.post('/cadastrar-militar', MilitarController.store);
routes.put('/atualizar-militar', MilitarController.update);
routes.delete('/deletar-militar', MilitarController.destroy);

routes.get('/listar-viatura', ViaturaController.index);
routes.get('/pesquisar-viatura', ViaturaController.show);
routes.post('/cadastrar-viatura', ViaturaController.store);
routes.put('/atualizar-viatura', ViaturaController.update);
routes.delete('/deletar-viatura', ViaturaController.destroy);


routes.post('/autenticar', async (request, response) => {       // autenticar
    const { _idMilitar, senha } = request.body;

    try{
        const militar = await Militar.findOne({ _idMilitar }).select('+senha');
        return response.json(militar);
    } catch (err) {
        return response.status(400).json({error: "Erro ao Listar Militares"});
    }
});

module.exports = routes;