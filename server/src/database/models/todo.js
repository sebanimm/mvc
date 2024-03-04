module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      todoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      todo: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      modelName: "Todo",
      tableName: "todo",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  );

  return Todo;
};
