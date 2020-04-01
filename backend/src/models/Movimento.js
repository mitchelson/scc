const mongoose = require('mongoose');
const crypto = require('crypto');

const MovimentoSchema = new mongoose.Schema({
    idMilitar: {               //Indica Id único no sistema para cada militar
        type: Number,
        //require: true,
    },
    nome: {                     //Indica o nome do militar
        type: String,
        required:true,
    },
    nomeGuerra: {               //Indica o nome de guerra do militar
        type: String,
        //required:true,
    },
    eMotorista: {               //Indica se o militar é motorista
        type: Boolean,
        //require: true,
    },
    dataNascimento: {           //Indica data de nascimento do militar
        type: String,
        //require: true
    },
    admin :{                    //Indica se o militar é administrador
        type: Boolean,
        //required: true,
    },
    cursoMotorista: {           //Indica o curso que o militar possui pra poder dirigir
        type: String,
        //require: true,
    },
    pelotao : {                 //Indica o pelotao que o militar pertence
        type: String,
        //require: true
    }
});

module.exports = mongoose.model('Movimento', MovimentoSchema);