
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title  : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        description  : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        price  : {
            type : DataTypes.STRING(10),
            allowNull : false,
        },
        
    }, {
        charset : 'utf8',
        collate : "utf8_general_ci"
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User)
        db.Post.hasMany(db.Image);
        db.Post.hasMany(db.Review);
        db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag', as : "PostHashTags" });
        db.Post.belongsToMany(db.User, {through : 'Cart', as: 'Carts' });
    };
    return Post;
}
