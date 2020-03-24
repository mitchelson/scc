const { Router } = require('express');
const MilitarController = require('./controllers/MilitarController');
const ViaturaController = require('./controllers/ViaturaController');

const routes = Router();

routes.get('/listar-militar', MilitarController.index);
routes.get('/pesquisar-militar', MilitarController.show);
routes.post('/cadastrar-militar', MilitarController.store);
routes.delete('/deletar-militar', MilitarController.destroy);

routes.get('/listar-viatura', ViaturaController.index);
routes.get('/pesquisar-viatura', ViaturaController.show);
routes.post('/cadastrar-viatura', ViaturaController.store);
routes.delete('/deletar-viatura', ViaturaController.destroy);

module.exports = routes;