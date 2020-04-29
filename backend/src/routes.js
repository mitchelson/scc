const { Router } = require('express');
const MilitarController = require('./controllers/MilitarController');
const ViaturaController = require('./controllers/ViaturaController');
const SessionController = require('./controllers/SessionController');
const MovimentoController = require('./controllers/MovimentoController');

const routes = Router();

routes.get('/listar-militar', MilitarController.index);
routes.get('/pesquisar-militar', MilitarController.show);
routes.post('/cadastrar-militar', MilitarController.store);
routes.delete('/deletar-militar', MilitarController.destroy);

routes.get('/listar-viatura', ViaturaController.index);
routes.get('/pesquisar-viatura', ViaturaController.show);
routes.post('/cadastrar-viatura', ViaturaController.store);
routes.delete('/deletar-viatura', ViaturaController.destroy);

routes.get('/listar-movimento', MovimentoController.index);
routes.get('/pesquisar-movimento', MovimentoController.show);
routes.post('/cadastrar-movimento', MovimentoController.store);
routes.delete('/deletar-movimento', MovimentoController.destroy);

routes.get('/login', SessionController.index);

module.exports = routes;