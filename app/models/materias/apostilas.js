const { DataTypes } = require('sequelize')
const {conect} = require('../conect.js')
const sequelizer = conect()

const Apostilas = sequelizer.define('Apostilas',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    materia:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    link:{
        type:DataTypes.STRING(255),
        allowNull:false
    }
},
{
    tableName:'Apostilas'
})

Apostilas.sync()

module.exports={Apostilas}