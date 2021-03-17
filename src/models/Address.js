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
            as:'billja',
            foreignKey: 'bill_to_location_id'
        });
    
        model.hasMany(models.Customer, {
            as:'deliveryja',
            foreignKey: 'delivery_location_id'
        });
    
        model.hasMany(models.Customer, {
            as:'shipja',
            foreignKey: 'ship_to_location_id'
        });
    

    }

   
    return model;
}