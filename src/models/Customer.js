module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
        'Customer', {
            cid: {
                type: DataTypes.STRING(50),
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(200),
            },
            type: {
                type: DataTypes.STRING(10),
            },
            tel: {
                type: DataTypes.STRING(15)
            },
            email: {
                type: DataTypes.STRING(100)
            },
            billToLocationId: {
                type: DataTypes.BIGINT,
                field: 'bill_to_location_id'
            },
            billToLocation: {
                type: DataTypes.STRING(1000),
                field: 'bill_to_location'
            },
            shipToLocationId: {
                type: DataTypes.BIGINT,
                field: 'ship_to_location_id'
            },
            shipToLocation: {
                type: DataTypes.STRING(1000),
                field: 'ship_to_location'
            },
            deliveryLocationId: {
                type: DataTypes.BIGINT,
                field: 'delivery_location_id'
            },
            deliveryLocation: {
                type: DataTypes.STRING(1000),
                field: 'delivery_location'
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
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            tableName: 'customer',
            timestamps: false
        }
    );

    model.associate = models => {
        model.hasMany(models.Purchase, {
            foreignKey: 'cid',
            onDelete: 'CASCADE',
        });

        model.belongsTo(models.Address, {
            as:'billTo',
            foreignKey: 'bill_to_location_id'
        });

        model.belongsTo(models.Address, {
            as:'deliveryTo',
            foreignKey: 'delivery_location_id'
        });

        model.belongsTo(models.Address, {
            as:'shipTo',
            foreignKey: 'ship_to_location_id'
        });

    }

    return model;
}