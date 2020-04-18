const mongoose = require('mongoose');

const MovimentoSchema = new mongoose.Schema({
    data: {                         //Indica Id único no sistema para cada militar
        type: Date,
        require: true,
    },
    odometroS: {                    //Indica o nome do militar
        type: Number,
        required:true,
    },
    odometroC: {                    //Indica o nome do militar
        type: Number,
    },
    distancia: {                    //Indica o nome do militar
        type: Number,
    },
    idChefeViatura: {                 //Indica se o militar é motorista
        type: Number,
        require: true,
    },
    idMotoristaP: {                    //Indica data de nascimento do militar
        type: Number,
        require: true
    },
    idMotoristaA: {                    //Indica data de nascimento do militar
        type: Number,
        require: true
    },
    idUsuario: {                    //Indica data de nascimento do militar
        type: Number,
        require: true
    },
    destino :{                      //Indica se o militar é administrador
        type: String,
        required: true,
    },
    qtdCombustivelS: {               //Indica o curso que o militar possui pra poder dirigir
        type: String,
        require: true,
    },
    qtdCombustivelC: {               //Indica o curso que o militar possui pra poder dirigir
        type: String,
    },
    obs:{
        type:String,
    },
    aberto:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Movimento', MovimentoSchema);