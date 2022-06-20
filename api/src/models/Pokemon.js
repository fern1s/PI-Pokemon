const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
      validate: {
        min: 3000, //intento de separar el id de la db de la api.
      }
    },

    hp: {
      type: DataTypes.INTEGER,
      validate: {
        max: 400,
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        max: 700,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        max: 700,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        max: 600,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 1000,
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 1000,
      } //y ahora como hago los tipos? un modelo aparte y una propiedad en los pokemon? una tabla de relacion?
    }
  });
};
