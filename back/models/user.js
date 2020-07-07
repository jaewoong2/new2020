module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        password : {
            type : DataTypes.STRING(140),
            allowNull : false,
        },
        nickname : {
            type : DataTypes.STRING(30),
            allowNull : false,
        }
    }, {
        charset : 'utf8',
        collate : "utf8_general_ci"
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Review);
        db.User.belongsToMany(db.Post, { through : 'Cart', as: 'Carts' });
    };
    return User;
}