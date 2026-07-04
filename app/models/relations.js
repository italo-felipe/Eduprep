const {Users} = require('../models/user/user.js')
const {Comentarios} = require('./materias/comentarios.js')
const {conect} = require('./conect.js')
Users.hasMany(Comentarios,{
    foreignKey:'userId',
    onDelete:'CASCADE'
})

Comentarios.belongsTo(Users,{
    foreignKey:'userId'
})

const sequelizer = conect()

sequelizer.authenticate();
sequelizer.sync({force:false})