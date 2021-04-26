module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Sale', {
        sid: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(30)
        },
        firstName: {
            type: DataTypes.STRING(500),
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(500),
            field: 'lastName'
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            field: 'created_date'
        }
    }, {
        tableName: 'sale',
        timestamps: false
    });

    model.associate = models => {

        model.hasMany(models.Purchase, {
            foreignKey: 'sid',
            onDelete: 'CASCADE',
        });

    }

    return model;
}