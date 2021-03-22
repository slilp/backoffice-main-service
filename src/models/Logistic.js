module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('Logistic',{
        lid:{
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        inv :{
            type:DataTypes.STRING(50)
        },
        tid :{
            type:DataTypes.BIGINT()
        },
        deliveryDate:{
            type: DataTypes.DATE,
        },
        status : {
            type : DataTypes.STRING(50),
            defaultValue : 'waiting'
        }
    },{
        tableName : 'logistic',
        timestamps: false
    });

    model.associate = models => {
        model.belongsTo(models.Transporter, {
            foreignKey: 'tid',
            onDelete: 'CASCADE',
            as:'transporterInfo'
        });

        model.belongsTo(models.Invoice, {
            foreignKey: 'inv',
            onDelete: 'CASCADE',
            as:'invoiceInfo'
        });

    }


    return model;
}