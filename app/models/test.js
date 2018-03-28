module.exports = function(sequelize, DataTypes){
    var test = sequelize.define("test",{
        test1: DataTypes.INTEGER
    });
    return test
}