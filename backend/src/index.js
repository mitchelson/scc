const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

//Conexão com o banco de dados
mongoose.connect(
  "mongodb+srv://root:root@cluster0-v5kh6.mongodb.net/scc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3030);
