const mongoose = require('mongoose');
const crypto = require('crypto');

const ViaturaSchema = new mongoose.Schema({
    _idViatura: {               //Indica Id único no sistema para cada viatura
        type: Number,
        //require: true,
    },
    nome: {                     //Indica o nome da viatura
        type: String,
        required:true,
    },
    tipo: {                     //Indica o tipo da viatura
        type: String,
        //required:true,
    },
    dataChegada: {              //Indica a data de chegada da viatura
        type: Date,
        //require: true
    },
    motoristaPrincipal :{       //Indica o motorista principal da viatura
        type: Number,
        //required: true,
    },
    motoristaAuxiliar :{        //Indica o motorista auxiliar da viatura
        type: Number,
        //required: true,
    },
    disponivel :{               //Indica se a viatura está disponível ou não
        type: Boolean,
        //required: true,
    },
    categoria :{                //Indica a categoria da viatura
        type: String,
        //required: true,
    }
});

module.exports = mongoose.model('Viatura', ViaturaSchema);