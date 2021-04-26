module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define(
        'User',{
            uid:{
                type:DataTypes.STRING(50),
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING(200),
                field: 'first_name'
            },
            lastName: {
                type: DataTypes.STRING(200),
                field: 'last_name'
            },
            password:{
                type:DataTypes.STRING(250)
            },
            role:{
                type:DataTypes.STRING(100)
            },
            createdDate: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                field: 'created_date'
            },
            updatedDate: {
                type: DataTypes.DATE,
                field: 'updated_date'
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },{
            tableName : 'user',
            timestamps: false
        }
    );

    return  model;
}