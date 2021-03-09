module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define(
        'Purchase',{
            pid:{
                type:DataTypes.STRING(50),
                primaryKey :true
            },
            revenue:{
                type:DataTypes.DECIMAL(14,4),
                defaultValue:0
            },
            sale:{
                type:DataTypes.STRING(250)
            },
            transportType:{
                type:DataTypes.STRING(50),
                defaultValue: 'self'
            },
            transportName:{
                type:DataTypes.STRING(250)
            },  
            transportLocation:{
                type:DataTypes.STRING(1000)
            },
            note:{
                type:DataTypes.STRING(250)
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
            updatedBy: {
                type: DataTypes.STRING(50),
                field: 'updated_by'
            }
        },{
            tableName : 'purchase',
            timestamp:false
        }
    );

    model.associate = models => {
        model.belongsTo(models.Customer, {
            foreignKey: 'cid',
            onDelete: 'CASCADE',
            as:'customerInfo'
        });

        model.hasMany(models.Invoice, {
            foreignKey: 'pid',
            onDelete: 'CASCADE',

        });
    }

    return model;
}