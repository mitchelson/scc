const mongoose = require('mongoose');

const MovimentoSchema = new mongoose.Schema({
    data: {                         //Indica Id único no sistema para cada militar
        type: Date,
        //require: true,
    },
    odometroo: {                    //Indica o nome do militar
        type: Number,
        required:true,
    },
    idMotorista: {                  //Indica o nome de guerra do militar
        type: Number,
        required:true,
    },
    chefeViatura: {                 //Indica se o militar é motorista
        type: Number,
        require: true,
    },
    idUsuario: {                    //Indica data de nascimento do militar
        type: Number,
        require: true
    },
    destino :{                      //Indica se o militar é administrador
        type: String,
        required: true,
    },
    qtdCombustivel: {               //Indica o curso que o militar possui pra poder dirigir
        type: String,
        require: true,
    },
    aberto:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Movimento', MovimentoSchema);