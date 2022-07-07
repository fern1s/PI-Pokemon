const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//const image = "https://cdn.vox-cdn.com/thumbor/IhuPwFLVg19jF8B6rSmpy5T1-tY=/0x0:1920x1080/1400x788/filters:focal(807x387:1113x693):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53254027/who_pokemon.0.jpg";
const image2 = "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
      // validate: {
      //   min: 3000, //intento de separar el id de la db de la api.
      // }
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
      } 
    },
    image: {
      type: DataTypes.STRING(),
      defaultValue: image2
    }
  }
  );
};
