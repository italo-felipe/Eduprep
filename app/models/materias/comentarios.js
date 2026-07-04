const { DataTypes} = require('sequelize');
const { conect } = require('../conect.js');
const sequelizer = conect();

const Comentarios = sequelizer.define('Comentarios',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    conteudo:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    tipo:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},


{
    tableName:'Comentarios'
})

Comentarios.sync()

module.exports={Comentarios}