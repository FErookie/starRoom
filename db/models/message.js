module.exports = (sequelize, DataTypes) => {
    return sequelize.define('message', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        asImage: {
            type: DataTypes.TEXT,
            defaultValue: ''
        }
    })
};
