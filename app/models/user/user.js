const { DataTypes} = require('sequelize');
const { conect } = require('../conect.js');
const crypto = require('crypto');
const sequelizer = conect();
const {Comentarios} = require('../materias/comentarios.js')
const Users = sequelizer.define('Users',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique: true
    },
    senha:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique: true
    },
    isOnline:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},
{
    tableName: 'Usuarios'
}    
)
Users.sync();


async function create_user(data = {}){
    const hash1 = crypto.createHash('sha256')
    hash1.update(data.senha.toString())

    Users.create({
        nome: data.nome,
        senha: hash1.digest('hex'),
        email: data.email,
    })
}
    

Users.hasMany(Comentarios, { foreignKey: 'id' });



async function delete_user(data = {}) {
   usuario = await read_user(data);
   usuario.destroy()
}
module.exports={delete_user,create_user, Users}
