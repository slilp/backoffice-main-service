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
            sid:{
                type: DataTypes.BIGINT
            },
            transportType:{
                type:DataTypes.STRING(50),
                defaultValue: 'self',
                field: 'transport_type'
            },
            transportName:{
                type:DataTypes.STRING(250),
                field: 'transport_name'
            },  
            transportLocationId:{
                type: DataTypes.BIGINT,
                field: 'transport_location_id'
            },
            transportLocation:{
                type:DataTypes.STRING(1000),
                field: 'transport_location'
            },
            note:{
                type:DataTypes.STRING(250)
            },
            status:{
                type:DataTypes.STRING(50),
                defaultValue: 'waiting'
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

        model.belongsTo(models.Sale, {
            foreignKey: 'sid',
            onDelete: 'CASCADE',
            as:'saleInfo'
        });

        model.belongsTo(models.Address, {
            as:'transportInfo',
            foreignKey: 'transport_location_id'
        });
        
    }

    return model;
}