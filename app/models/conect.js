

function conect() {
    const {Sequelize, DataTypes} = require('sequelize');
    const sequelize = new Sequelize("Eduprep", "italo", "031074",
    {   
        host: "localhost",
        dialect: "postgres",
        logging: false
    }
    );
    try{
     sequelize.authenticate()
    }
    catch(e){
        console.log(e)
    }
    return sequelize
}

module.exports= {
    conect:conect
}