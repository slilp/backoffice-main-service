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
            location: {
                type: DataTypes.STRING(1000)
            },
            deliveryLocation: {
                type: DataTypes.STRING(1000),
                field: 'delivery_location'
            },
            zone: {
                type: DataTypes.STRING(50)
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
    }

    return model;
}