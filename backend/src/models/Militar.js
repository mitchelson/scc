const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    _idMilitar: {               //Indica Id único no sistema para cada militar
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
        type: Date,
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
    },
    senha: {                    //Senha de acesso do militar para o sistema
        type: String,
        select: false,
        require: true,
        set: value => 
            crypto                      //Criptografia de senha
                .createHash('md5')
                .update(value)
                .digest('hex'),
    }
});

module.exports = mongoose.model('User', UserSchema);