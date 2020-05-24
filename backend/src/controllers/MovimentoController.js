const Movimento = require("../models/Movimento");

class MovimentoController {
  //Listar movimentação com filtro quem vem do front-end
  async index(request, response) {
    try {
      const movimento = await Movimento.find(request.body);
      return response.json(movimento);
    } catch (err) {
      return response
        .status(400)
        .json({ error: "Erro ao Listar Movimentações" });
    }
  }
  //Listar movimentação
  async show(request, response) {
    try {
      const movimento = await Movimento.findOne(request.query);
      return response.json(movimento);
    } catch (err) {
      return response
        .status(400)
        .json({ error: "Erro ao Listar Movimentações" });
    }
  }
  //Cadastrar/Editar movimentações
  async store(request, response) {
    try {
      const mov = await Movimento.findOneAndUpdate(
        { dataS: request.body.dataS },
        { $set: request.body },
        { upsert: true }
      );
      return response.json(mov);
    } catch (err) {
      return response
        .status(400)
        .json({ error: "Erro ao Cadastrar Movimento" });
    }
  }
  //Deletar movimentações específicas, necessita de parametro id
  async destroy(request, response) {
    try {
      await Movimento.deleteOne(request.query);
      const mov = await Movimento.find();
      return response.json(mov);
    } catch (err) {
      return response
        .status(400)
        .json({ error: "Erro ao Deletar Registro do Movimento" });
    }
  }
}

module.exports = new MovimentoController();
