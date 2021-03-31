module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Images',{
        imd: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        type:{
            type:DataTypes.STRING(50)
        },
        ref:{
            type:DataTypes.STRING(50)
        },
        order:{
            type: DataTypes.INTEGER,
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            field: 'created_date'
        }
    },{
        tableName: 'images',
        timestamps: false
    });

    return model;
};
