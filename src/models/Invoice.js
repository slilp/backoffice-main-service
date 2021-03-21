module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define(
        'Invoice',{
            inv:{
                type:DataTypes.STRING(50),
                primaryKey :true
            },
            invoiceDate:{
                type:DataTypes.DATE,
                defaultValue:new Date()
            },
            amount:{
                type:DataTypes.DECIMAL(14,4),
                defaultValue:0
            },
            channel:{
                type:DataTypes.STRING(25)
            },
            images:{
                type:DataTypes.STRING(3000)
            },
            status:{
                type:DataTypes.STRING(30),
                defaultValue:'waiting'
            },
            createdDate: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                field: 'created_date'
            },
            createdBy: {
                type: DataTypes.STRING(50),
                field: 'created_by'
            },
            updatedDate: {
                type: DataTypes.DATE,
                field: 'updated_date'
            },
            updated_by: {
                type: DataTypes.STRING(50),
                field: 'updated_by'
            },
            pid:{
                type:DataTypes.STRING(50)
            }
        },{
            tableName : 'invoice',
            timestamps: false
        }
    );

    model.associate = models => {
        model.belongsTo(models.Purchase, {
            foreignKey: 'pid',
            onDelete: 'CASCADE',
            as : 'purchaseInfo'
        });

        model.hasMany(models.Logistic, {
            foreignKey: 'inv',
            onDelete: 'CASCADE',
        });
        
    }

    return model;
}