module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        headImage: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        nickname: {
            type: DataTypes.STRING(32),
            defaultValue: '游客'
        },
        passwordHash: {
            type: DataTypes.TEXT
        }
    },{
        associate: (models) => {
            let {user, message} = models;
            user.hasMany(message)
        }
    })
};
