module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        content  : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
    }, {
        charset : 'utf8',
        collate : "utf8_general_ci"
    });
    Review.associate = (db) => {
        db.Review.belongsTo(db.User);
        db.Review.belongsTo(db.Post);
    };
    return Review;
}