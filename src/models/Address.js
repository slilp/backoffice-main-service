module.exports = (sequelize , DataTypes) => {
    const model = sequelize.define(
        'Address',{
            aid:{
                type: DataTypes.BIGINT,
                primaryKey: true
            },
            province:{
                type: DataTypes.STRING(100)
            },
            district:{
                type: DataTypes.STRING(100)
            },
            subDistrict : {
                type: DataTypes.STRING(100)
            },
            zipCode:{
                type: DataTypes.STRING(25)
            }

        },{
            tableName: 'address',
            timestamps: false
        }
    );

    model.associate = models => {
        model.hasMany(models.Customer, {
            as:'billTo',
            foreignKey: 'bill_to_location_id'
        });

        model.hasMany(models.Customer, {
            as:'deliveryTo',
            foreignKey: 'delivery_location_id'
        });

        model.hasMany(models.Customer, {
            as:'shipTo',
            foreignKey: 'ship_to_location_id'
        });

        model.hasMany(models.Purchase, {
            as:'transportInfo',
            foreignKey: 'transport_location_id'
        });

    }

   
    return model;
}