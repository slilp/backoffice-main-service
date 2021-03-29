module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('Transporter',
    {
        tid : {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(30)
        },
        firstName: {
            type: DataTypes.STRING(150)
        },
        lastName:{
            type: DataTypes.STRING(150)
        },
        image:{
            type : DataTypes.STRING(1000)
        }
    },{
        tableName : 'transporter',
        timestamps: false
    });


    model.associate = models => {
        model.hasMany(models.Logistic, {
            foreignKey: 'tid',
            onDelete: 'CASCADE',
        });
    }


    return model;
}