const mongoose = require('mongoose');

const MovimentoSchema = new mongoose.Schema({
    dataS: {                         //Indica a data de saida da Nova Movimentação
        type: Date,
        require: true,
    },
    dataC: {                         //Indica a data de chegada da Movimentação
        type: Date,
    },
    odometroS: {                    //Indica o odometro (kilometragem) do veiculo no momento da saida
        type: Number,
        required:true,
    },
    odometroC: {                    //Indica o odometro (kilometragem) do veiculo no momento da chegada
        type: Number,
    },
    distancia: {                    //Indica a distancia percorrida, subtraindo o odometro de saida com o odometro de chegada
        type: Number,
    },
    idChefeViatura: {               //Indica o chefe da viatura nessa movimentação
        type: Number,
        require: true,
    },
    idMotoristaP: {                 //Indica o id do motorista principal nessa movimentação
        type: Number,
        require: true
    },
    idMotoristaA: {                 //Indica o id do motorista auxiliar nessa movimentação
        type: Number,
        require: true
    },
    idUsuario: {                    //Indica o id do usuário responsavel por anotar essa movimentação
        type: Number,
        require: true
    },
    idViatura: {                    //Indica o id da Viatura que será movimentada
        type: String,
        //required:true
    },
    destino :{                      //Indica o destino dessa movimentação
        type: String,
        required: true,
    },
    qtdCombustivelS: {               //Indica a quantidade de combustível no momento da saida do veiculo
        type: String,
        require: true,
    },
    qtdCombustivelC: {               //Indica a quantidade de combustivel no momento da chegada do veiculo
        type: String,
    },
    obs:{                           //Campo para observações adicionais nessa movimentação
        type:String,    
    },
    aberto:{                        //Indica se a viatura está na rua(aberto=true) ou se a viatura está inloco (aberto=false)
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Movimento', MovimentoSchema);