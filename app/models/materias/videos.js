const { DataTypes } = require('sequelize')
const {conect} = require('../conect.js')
const sequelizer = conect()

const Videos = sequelizer.define('Videos',{
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
    tableName:'Videos'
})

Videos.sync()

module.exports={Videos}